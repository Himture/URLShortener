CREATE TABLE user(name varchar(25) NOT NULL, email varchar(50) NOT NULL, uID int NOT NULL PRIMARY KEY);

CREATE TABLE links(id int NOT NULL AUTO_INCREMENT PRIMARY KEY,oLink varchar(100) NOT NULL,sLink varchar(10) NOT NULL,userID int);