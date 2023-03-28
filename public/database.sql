CREATE DATABASE msbClientDb;
USE msbClientDb;
CREATE TABLE msbClient
 (
    idUser INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
	name VARCHAR(20) NOT NULL,
    phone  VARCHAR(15),
    password VARCHAR(80)
);

CREATE TABLE msbClientOrder
(
	idUser VARCHAR(50) NOT NULL,
	number INT AUTO_INCREMENT PRIMARY KEY,
	delivery VARCHAR(15),
	orderAccepted VARCHAR(15),
	orderCollect VARCHAR(15), 
	orderGo  VARCHAR(15), 
    orderReceived VARCHAR(15),
	date VARCHAR(15),
	img VARCHAR(1000)
);

CREATE TABLE msbClientOrderCard
(
    idUser INT,
	number INT,
	idCard INT,
    count INT,
    month INT
);

CREATE TABLE msbAdmins
 (
    idUser INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
	name VARCHAR(50) NOT NULL,
    phone  VARCHAR(50),
    password VARCHAR(80),
    role VARCHAR(50)
);
INSERT msbAdmins(email, name, phone, password, role) 
VALUES ('kirillpovasin@gmail.com', 'Povasin Kirill', 89108148822, '$2b$07$/U26r95.07IRdRggN4MFdu9izLcrsWDWKrHvndRBCyKAofnQs4vUq', 'Администратор');

CREATE TABLE cards
(	
	idCard INT AUTO_INCREMENT PRIMARY KEY ,
	img VARCHAR(1000),
	name VARCHAR(50),
	discount INT,
	price INT,
	star VARCHAR(50),
	size VARCHAR(100),
	content  INT,
	finishing VARCHAR(100) NOT NULL,
	states VARCHAR(100) NOT NULL,
	text VARCHAR(1000) NOT NULL,
    role VARCHAR(100)
);

INSERT cards(img, name, discount, price, star, size, content, finishing, states, text, role ) 
VALUES ('/cubinsForDress.webp', "Бытовка раздевалка", 9000, 8000, "★★★★☆", "6х2,4х2,50м", 8,  'ДВП, вагонка ПВХ', 'б/у', 'Выездные мероприятия и строительные работы сопровождаются массовым скоплением людей, организовать их переодевание в увеселительную или рабочую одежду без специальных сооружений не получиться. Аренда бытовки раздевалки – выход. С ними можно обустроить условия для переодевания и хранения вещей посетителей и персонала в любом месте.', 'общая');
INSERT cards(img, name, discount, price, star, size, content, finishing, states, text, role ) 
VALUES ('/cubinsForLive.webp', "Бытовка для проживания", 9000, 7500, "★★★☆☆", "2,5х2,5х3,0м", 8,  'ДВП, вагонка ПВХ', 'б/у', 'Выездные мероприятия и строительные работы сопровождаются массовым скоплением людей, организовать их переодевание в увеселительную или рабочую одежду без специальных сооружений не получиться. Аренда бытовки раздевалки – выход. С ними можно обустроить условия для переодевания и хранения вещей посетителей и персонала в любом месте.', 'общая');
INSERT cards(img, name, discount, price, star, size, content, finishing, states, text, role ) 
VALUES ('/cubinsForBath.webp', "Бытовка c душем", 9000, 7500, "★★★★★", "2,5х2,5х3,0м", 8,  'ДВП, вагонка ПВХ', 'б/у', 'Выездные мероприятия и строительные работы сопровождаются массовым скоплением людей, организовать их переодевание в увеселительную или рабочую одежду без специальных сооружений не получиться. Аренда бытовки раздевалки – выход. С ними можно обустроить условия для переодевания и хранения вещей посетителей и персонала в любом месте.', 'общая');
INSERT cards(img, name, discount, price, star, size, content, finishing, states, text, role ) 
VALUES ('/cubinsForwareHouse.webp', "Бытовка под склад", 10000, 9000, "★★★★★", "6х2,4х2,4м", 8,  'ДВП, вагонка ПВХ', 'б/у', 'Выездные мероприятия и строительные работы сопровождаются массовым скоплением людей, организовать их переодевание в увеселительную или рабочую одежду без специальных сооружений не получиться. Аренда бытовки раздевалки – выход. С ними можно обустроить условия для переодевания и хранения вещей посетителей и персонала в любом месте.', 'общая');
INSERT cards(img, name, discount, price, star, size, content, finishing, states, text, role ) 
VALUES ('/cubinsForWork.webp', "Бытовки прорабские", 10000, 9000, "★★★★☆", "6х2,4х2,4м", 8,  'ДВП, вагонка ПВХ', 'б/у', 'Выездные мероприятия и строительные работы сопровождаются массовым скоплением людей, организовать их переодевание в увеселительную или рабочую одежду без специальных сооружений не получиться. Аренда бытовки раздевалки – выход. С ними можно обустроить условия для переодевания и хранения вещей посетителей и персонала в любом месте.', 'общая');
INSERT cards(img, name, discount, price, star, size, content, finishing, states, text, role ) 
VALUES ('/cubinsForDress.webp', "Бытовка пост охраны", 9000, 7500, "★★★☆☆", "2,5х2,5х3,0м", 8,  'ДВП, вагонка ПВХ', 'б/у', 'Выездные мероприятия и строительные работы сопровождаются массовым скоплением людей, организовать их переодевание в увеселительную или рабочую одежду без специальных сооружений не получиться. Аренда бытовки раздевалки – выход. С ними можно обустроить условия для переодевания и хранения вещей посетителей и персонала в любом месте.', 'общая');

CREATE TABLE cardsImg
(
    img VARCHAR(2000),
	idCard INT
);

INSERT cardsImg(img, idCard) 
values ('/cubinsForDress.webp', 1);
INSERT cardsImg(img, idCard) 
values ('/cubinsForLive.webp', 2);
INSERT cardsImg(img, idCard) 
values ('/cubinsForBath.webp', 3);
INSERT cardsImg(img, idCard) 
values ('/cubinsForwareHouse.webp', 4);
INSERT cardsImg(img, idCard) 
values ('/cubinsForWork.webp', 5);
INSERT cardsImg(img, idCard) 
values ('/cubinsForDress.webp', 6);
