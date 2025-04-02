-- create database --

CREATE DATABASE Telefon;



-- \c database --
\c Telefon;


-- create table --
CREATE TABLE phones(
    phone_id serial primary key,
    model varchar(20),  
    price float not null,
    manufacture varchar(20),
    memory int not null
);



-- create table --
CREATE TABLE client(  
    client_id serial primary key,
    first_name varchar(20),
    last_name varchar(20),
    phone varchar(20) unique not null
);



-- create table --
CREATE TABLE employees( 
    employee_id serial primary key,  
    first_name varchar(20),
    last_name varchar(20),
    position varchar(20)
);



-- create table --
CREATE TABLE orders(
    order_id serial primary key,
    phone_id int not null,
    client_id int not null,
    employee_id int not null,  
    order_date timestamp default current_timestamp,
    quantity int not null,
    total_price float not null,
    foreign key (phone_id) references phones(phone_id),
    foreign key (client_id) references client(client_id),
    foreign key (employee_id) references employees(employee_id)
);



-- insert into phones --
INSERT INTO phones (model, price, manufacture, memory) VALUES
('iPhone 14', 999.99, 'Apple', 128),
('Galaxy S23', 849.99, 'Samsung', 256),
('Pixel 7', 599.99, 'Google', 128),
('Xiaomi 13', 699.99, 'Xiaomi', 256),
('OnePlus 11', 729.99, 'OnePlus', 128),
('Huawei P50', 799.99, 'Huawei', 256),
('Sony Xperia 5', 899.99, 'Sony', 128),
('Realme GT3', 499.99, 'Realme', 256),
('Asus ROG Phone 6', 1099.99, 'Asus', 512),
('Nokia X30', 549.99, 'Nokia', 128);



-- insert into client --
INSERT INTO client (first_name, last_name, phone) VALUES
('Ali', 'Karimov', '+998901234567'),
('Aziza', 'Nazarova', '+998931112233'),
('Javohir', 'Tursunov', '+998977654321'),
('Madina', 'Qodirova', '+998991223344'),
('Rustam', 'Sharipov', '+998935556677'),
('Dilnoza', 'Hamidova', '+998998877665'),
('Bekzod', 'Usmonov', '+998907778899'),
('Olim', 'Torayev', '+998941122334'),
('Shahnoza', 'Mamatova', '+998909090909'),
('Sarvar', 'Raximov', '+998950505050');



-- insert into employees --
INSERT INTO employees (first_name, last_name, position) VALUES
('Otabek', 'Xudoyberdiyev', 'Director'),
('Muhammad', 'Aliyev', 'Project Manager'),
('Laylo', 'Sodiqova', 'HR Manager'),
('Jasur', 'Ergashev', 'Software Engineer'),
('Nigina', 'Rasulova', 'Data Analyst'),
('Shoxrux', 'Turgunov', 'System Administrator'),
('Durdona', 'Toshpulatova', 'Marketing Specialist'),
('Kamol', 'Nazarov', 'UX/UI Designer'),
('Saida', 'Yuldasheva', 'Customer Support'),
('Baxtiyor', 'Qosimov', 'Finance Manager');



-- insert into orders --
INSERT INTO orders (phone_id, client_id, employee_id, quantity, total_price) VALUES
(1, 3, 5, 2, 1999.98),
(2, 7, 2, 1, 849.99),
(3, 1, 8, 3, 1799.97),
(4, 5, 3, 1, 699.99),
(5, 9, 6, 2, 1459.98),
(6, 2, 4, 1, 799.99),
(7, 4, 7, 1, 899.99),
(8, 6, 10, 2, 999.98),
(9, 8, 1, 1, 1099.99),
(10, 10, 9, 1, 549.99);



-- 1. phone --> (Group by, AVG) --

SELECT manufacture, AVG(price) from phones GROUP BY manufacture;


-- 2. ((GROUP BY, COUNT)) --

SELECT c.first_name, c.last_name, 
COUNT(o.order_id) as total_phone_bought, 
SUM(o.quantity) as total_quantity
FROM client c 
JOIN orders o 
ON c.client_id = o.client_id
GROUP BY c.client_id, c.first_name, c.last_name
ORDER BY c.client_id;


-- 3. (GROUP BY, ORDER BY, LIMIT) --

SELECT 
    e.employee_id,
    e.first_name,
    e.last_name,
    e.position,
    COUNT(o.order_id) as total_sales,
    SUM(o.quantity) as total_items_sold,
    SUM(o.all_price) as total_revenue
FROM employees e
JOIN orders o ON e.employee_id = o.employee_id
GROUP BY e.employee_id, e.first_name, e.last_name, e.position
ORDER BY total_sales DESC, total_items_sold DESC
LIMIT 1;


-- 4 (OFFSET, LIMIT) --

SELECT 
    phone_id,
    model,
    manufacture,
    memory,
    price
FROM phones
ORDER BY price DESC
OFFSET 4 LIMIT 6;



-- 5.  (GROUP BY, MIN, MAX, AVG) --

SELECT 
    manufacture,
    AVG(price) as average_price,
    MIN(price) as min_price,
    MAX(price) as max_price,
    (SELECT model FROM phones p2 WHERE p2.manufacture = p1.manufacture ORDER BY price ASC LIMIT 1) as cheapest_model,
    (SELECT model FROM phones p3 WHERE p3.manufacture = p1.manufacture ORDER BY price DESC LIMIT 1) as most_expensive_model
FROM phones p1
GROUP BY manufacture
ORDER BY average_price DESC;


-- 6. (GROUP BY, MAX) --

SELECT 
    p1.manufacture,
    p1.model,
    p1.memory
FROM phones p1
JOIN (
    SELECT manufacture, MAX(memory) as max_memory
    FROM phones
    GROUP BY manufacture
) p2 ON p1.manufacture = p2.manufacture AND p1.memory = p2.max_memory
ORDER BY p1.memory DESC;


-- 7. (GROUP BY, ORDER BY, JOIN) --

SELECT 
    p.model,
    p.manufacture,
    p.price,
    COUNT(o.order_id) as total_sales,
    SUM(o.quantity) as total_quantity,
    AVG(p.price) as average_price
FROM phones p
JOIN orders o ON p.phone_id = o.phone_id
GROUP BY p.phone_id, p.model, p.manufacture, p.price
ORDER BY total_quantity DESC, total_sales DESC;