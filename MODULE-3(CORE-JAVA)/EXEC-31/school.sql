CREATE DATABASE school;

USE school;

CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    age INT,
    email VARCHAR(50)
);

INSERT INTO students (name, age, email) VALUES
('Alice', 20, 'alice@example.com'),
('Bob', 22, 'bob@example.com'),
('Charlie', 21, 'charlie@example.com');
