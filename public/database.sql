-- ADMIN

CREATE DATABASE msbAdminsDb;
USE msbAdminsDb;
CREATE TABLE msbAdmins
 (
    id INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
	name VARCHAR(50) NOT NULL,
    phone  VARCHAR(50),
    password VARCHAR(80),
    role VARCHAR(50)
);
INSERT msbAdmins(email, name, phone, password, role) 
VALUES ('kirillpovasin@gmail.com', 'Povasin Kirill', 789108148822, '$2b$07$/U26r95.07IRdRggN4MFdu9izLcrsWDWKrHvndRBCyKAofnQs4vUq', 'Администратор');

CREATE TABLE cards
(	
	img BLOB,
	idCard INT AUTO_INCREMENT PRIMARY KEY ,
	name VARCHAR(50),
	discount INT,
	price INT,
	star VARCHAR(50),
	size VARCHAR(100),
	content  INT,
	finishing VARCHAR(100) NOT NULL,
	states VARCHAR(100) NOT NULL,
	text VARCHAR(2000) NOT NULL,
    role VARCHAR(100)
);

INSERT cards(img, name, discount, price, star, size, content, finishing, states, text, role ) 
VALUES ('/cubinsForDress.webp', "Бытовка раздевалка", 9000, 8000, "★★★★☆", "6х2,4х2,50м", 8,  'ДВП, вагонка ПВХ', 'б/у', 'Выездные мероприятия и строительные работы сопровождаются массовым скоплением людей, организовать их переодевание в увеселительную или рабочую одежду без специальных сооружений не получиться. Аренда бытовки раздевалки – выход. С ними можно обустроить условия для переодевания и хранения вещей посетителей и персонала в любом месте.', 'all');

CREATE TABLE cardsImg
(
    img BLOB,
	idCard INT
);

-- CLIENT

CREATE DATABASE msbClientDb;
USE msbClientDb;
CREATE TABLE msbClient
 (
    id INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
	name VARCHAR(20) NOT NULL,
    phone  VARCHAR(15),
    password VARCHAR(80)
);

CREATE TABLE msbClientOrder
(
	id INT,
	email VARCHAR(50) NOT NULL,
	name VARCHAR(20) NOT NULL,
	phone  VARCHAR(15),
	number INT AUTO_INCREMENT PRIMARY KEY,
	delivery VARCHAR(15),
	orderAccepted VARCHAR(15),
	orderCollect VARCHAR(15), 
	orderGo  VARCHAR(15), 
    orderReceived VARCHAR(15),
	date VARCHAR(15),
	img BLOB
);

CREATE TABLE msbClientOrderCard
(
    id INT,
	number INT,
	idCard INT,
    count INT,
    month INT
);









