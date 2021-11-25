const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});



/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
 const getUserWithEmail = function(email) {
  return pool.query(`
    SELECT * FROM users
    WHERE email = $1
    LIMIT 1;
    `, [email])
    .then(res => res.rows[0])
    .catch(e => {
      console.error(e);
      res.send(e);
    });
}

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
 const getUserWithId = function(id) {
  return pool.query(`
    SELECT * FROM users
    WHERE id = $1
    LIMIT 1;
    `, [id])
    .then(res => res.rows[0])
    .catch(e => {
      console.error(e);
      res.send(e);
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
 const addUser =  function(user) {
  const queryParams = [user.name, user.email, user.password];

  return pool.query(`
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3);
    `, queryParams)
    .then(res => res.rows[0])
    .catch(e => {
      console.error(e);
      res.send(e);
    });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
 const getAllReservations = function(guest_id, limit = 10) {
  // return getAllProperties(null, 2);

  return pool.query(`
    SELECT properties.*, reservations.*, AVG(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id 
    WHERE reservations.guest_id = $1
    AND reservations.end_date < Now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT 10;
    `, [guest_id])
    .then(res => res.rows)
    .catch(e => {
      console.error(e);
      res.send(e);
    });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = (options, limit = 10) => {
 const queryParams = [];
 let queryString = `
 SELECT properties.*, AVG(property_reviews.rating) AS average_rating
 FROM properties
 LEFT JOIN property_reviews ON property_id = properties.id
 `
 if (options.city) {
   queryParams.push(`%${options.city}%`);
   queryString += `WHERE city LIKE $${queryParams.length} `;
 }
 if (options.owner_id) {
   queryParams.length > 0 ? queryString += `AND ` : queryString += `WHERE `;
   queryParams.push(Number(options.owner_id));
   queryString += `owner_id = $${queryParams.length} `;
 }
 if (options.minimum_price_per_night) {
   queryParams.length > 0 ? queryString += `AND ` : queryString += `WHERE `;
   queryParams.push(`${options.minimum_price_per_night}`);
   queryString += `cost_per_night >= $${queryParams.length} `;
 }
 if (options.maximum_price_per_night) {
   queryParams.length > 0 ? queryString += `AND ` : queryString += `WHERE `;
   queryParams.push(`${options.maximum_price_per_night}`);
   queryString += `cost_per_night <= $${queryParams.length} `;
 }
 if (options.minimum_rating) {
   queryParams.length > 0 ? queryString += `AND ` : queryString += `WHERE `;
   queryParams.push(`${options.minimum_rating}`);
   queryString += `rating >= $${queryParams.length} ` 
 }
 queryParams.push(limit);
 queryString += `
 GROUP BY properties.id
 ORDER BY cost_per_night
 LIMIT $${queryParams.length};
 `

 return pool.query(queryString, queryParams)
 .then(res => res.rows)
 .catch((err) => {
   console.error('query error', err.stack);
 }); 

}
exports.getAllProperties = getAllProperties;

const addProperty = function(property) {
  //Query Params
  const insertProperty = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `
  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, Number(property.parking_spaces), Number(property.number_of_bathrooms), Number(property.number_of_bedrooms)];
  
  return pool.query(insertProperty, values)
  .then(res => res.rows)
  .catch((err) => {
    console.error('query error', err.stack);
  });
}
exports.addProperty = addProperty;




