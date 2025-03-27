-- create database -- 

Create database homework27;

-- use database --

\c homework27;


-- create table --


Create table users (
    user_id serial primary key,
    first_name varchar(20),
    email varchar(30),
    password varchar(20),
    phone_number varchar(20),
    address varchar(30)
);



-- create table --

Create table posts (
    post_id serial primary key,
    title varchar(20),
    content text,
    slug varchar(20),
    author_id int not null,
    foreign key (author_id) references users (user_id)
);



-- create table --

Create table comments (
    comment_id serial primary key,
    content text,
    post_id int not null, 
    author_id int not null,
    foreign key (post_id) references posts (post_id),
    foreign key (author_id) references users (user_id),
    created_at timestamp
);





-- insert users data --

insert into users (first_name, email, password, phone_number, address) values('Bahodir', 'bahodir@gmail.com', 'uzb123', '+9981234567', 'Namangan');
insert into users (first_name, email, password, phone_number, address) values('Ali', 'ali@gmail.com', 'ali123', '+9987894561', 'Tashkent');
insert into users (first_name, email, password, phone_number, address) values('Jasur', 'jasi@gmail.com', 'Jasur123', '+9983564897', 'Buxoro');
insert into users (first_name, email, password, phone_number, address) values('Bobur', 'Bo1@gmail.com', 'bo123', '+9986543890', 'Samarqand');




-- insert posts data --

insert into posts (title, content, slug, author_id) values('Hello', 'Hello world', 'hello', 1);
insert into posts (title, content, slug, author_id) values('Hi', 'Hi world', 'hi', 2);
insert into posts (title, content, slug, author_id) values('How are you', 'How are you world', 'how', 3);
insert into posts (title, content, slug, author_id) values('I am fine', 'I am fine world', 'fine', 4);




-- insert comments data --

insert into comments (content, post_id, author_id, created_at) values('Hello', 9, 1, '2021-10-10 10:10:10');
insert into comments (content, post_id, author_id, created_at) values('Hi', 10, 2, '2021-10-10 10:10:10');
insert into comments (content, post_id, author_id, created_at) values('how are you', 11, 3, '2021-10-10 10:10:10');
insert into comments (content, post_id, author_id, created_at) values('I am fine', 12, 4, '2021-10-10 10:10:10');



SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM comments;