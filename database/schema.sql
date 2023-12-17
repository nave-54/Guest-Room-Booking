-- booking table
CREATE TABLE booking (
    name VARCHAR(45),
    phone BIGINT,
    days INT,
    checkin DATETIME,
    checkout DATETIME,
    hotel VARCHAR(45)
);

-- ownerlog table
CREATE TABLE ownerlog (
    name VARCHAR(45),
    email VARCHAR(45),
    phone BIGINT PRIMARY KEY,
    password VARCHAR(45),
    address VARCHAR(45),
    residency VARCHAR(45),
    pincode VARCHAR(45),
    place VARCHAR(45)
);

-- pics table
CREATE TABLE pics (
    number BIGINT,
    name VARCHAR(45),
    rooms INT,
    minduration INT,
    maxduration INT,
    rent INT,
    amenities VARCHAR(275),
    image VARCHAR(275),
     imagea VARCHAR(275)
);

-- userlog table
CREATE TABLE userlog (
    name VARCHAR(45),
    email VARCHAR(45),
    phone BIGINT PRIMARY KEY,
    password VARCHAR(45),
    address VARCHAR(200),
    pincode INT,
    place VARCHAR(45)
);
