DROP DATABASE IF EXISTS ccp2;
CREATE DATABASE IF NOT EXISTS ccp2;
USE ccp2;


CREATE TABLE users(
id int AUTO_INCREMENT PRIMARY KEY,
name varchar(50) NOT NULL,
email varchar(250) NOT NULL,
password varchar(260) NOT NULL,
user_role enum ('volunteer', 'association') NOT NULL
);

INSERT INTO users (name, email, password, user_role) VALUES
('Solidarity Aid', 'contact@solidarityaid.org', 'hashedpassword1', 'association'),
('Green Planet', 'info@greenplanet.org', 'hashedpassword2', 'association'),
('John Doe', 'john.doe@email.com', 'hashedpassword3', 'volunteer'),
('Jane Smith', 'jane.smith@email.com', 'hashedpassword4', 'volunteer'),
('Alice Brown', 'alice.brown@email.com', 'hashedpassword5', 'volunteer');

CREATE TABLE missions(
id int AUTO_INCREMENT PRIMARY KEY,
title varchar(150) NOT NULL,
description varchar(500) NOT NULL,
mission_date date NOT NULL, 
association_id int NOT NULL,
FOREIGN KEY (association_id) REFERENCES users(id)
);

INSERT INTO missions (title, description, mission_date, association_id) VALUES
('Food Distribution', 'Help distribute food to homeless people.', '2025-03-10', 1),
('Tree Planting', 'Plant trees to support reforestation efforts.', '2025-04-15', 2),
('Beach Cleanup', 'Join us to clean up waste on the beach.', '2025-05-20', 2);


CREATE TABLE applications(
id int AUTO_INCREMENT PRIMARY KEY,
status enum ('pending', 'accepted', 'rejected') DEFAULT 'pending',
mission_id int NOT NULL,
volunteer_id int NOT NULL,
FOREIGN KEY (mission_id) REFERENCES missions(id),
FOREIGN KEY (volunteer_id) REFERENCES users(id)
);

INSERT INTO applications (mission_id, volunteer_id, status) VALUES
(1, 3, 'pending'),  -- John Doe applied for Food Distribution
(1, 4, 'accepted'), -- Jane Smith was accepted for Food Distribution
(2, 3, 'pending'),  -- John Doe applied for Tree Planting
(3, 5, 'rejected'); -- Alice Brown was rejected for Beach Cleanup