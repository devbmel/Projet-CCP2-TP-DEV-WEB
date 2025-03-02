DROP DATABASE IF EXISTS ccp2;
CREATE DATABASE IF NOT EXISTS ccp2;
USE ccp2;

CREATE TABLE users(
id int AUTO_INCREMENT PRIMARY KEY,
name varchar(50) NOT NULL,
email varchar(250) NOT NULL UNIQUE,
password varchar(260) NOT NULL,
user_role enum ('volunteer', 'association') NOT NULL
);

CREATE TABLE missions(
id int AUTO_INCREMENT PRIMARY KEY,
title varchar(150) NOT NULL,
description varchar(500) NOT NULL,
mission_date date NOT NULL, 
association_id int NOT NULL,
FOREIGN KEY (association_id) REFERENCES users(id) 
);

CREATE TABLE applications(
id int AUTO_INCREMENT PRIMARY KEY,
status enum ('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
mission_id int NOT NULL,
volunteer_id int NOT NULL,
FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE,
FOREIGN KEY (volunteer_id) REFERENCES users(id)
);



