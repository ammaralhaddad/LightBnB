INSERT INTO users (name, email, password)

VALUES('name1','name1@example.com',"$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u"),
('name2','name2@example.com',"$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u"),
('name3','name3@example.com',"$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u");



INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, owner_id)

VALUES ('Boxed Water', 'desciption', 'https://unsplash.com/photos/X5UrOwSCYYI', 'https://unsplash.com/photos/X5UrOwSCYYI', 300, 1, 2, 4, 'Canada', ' 256 Traf Rd', ' Hopewell', 'Nova Scotia', ' B0K 1C0', 1),
('Alta yorktown', 'description', 'https://unsplash.com/photos/uocSnWMhnAs', 'https://unsplash.com/photos/uocSnWMhnAs', 400, 4, 2, 3, 'Canada', '134 Land Street', 'Field', 'Ontario', 'P01 1M0', 2),
('AV Damero', 'description', 'https://unsplash.com/photos/-27u_GzlAFw', 'https://unsplash.com/photos/-27u_GzlAFw', 190, 2, 1, 2, 'Canada', '4686 Nelson Streete', ' Kingfisher Lake', 'Ontario', 'V34 RER', 3),

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 2, 1, 3, 'message'),
(7, 1, 2, 3, 'message'),
(4, 3, 2, 5, 'message'),

