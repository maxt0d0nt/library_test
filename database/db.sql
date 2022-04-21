CREATE DATABASE infosys_test;

use infosys_test;

CREATE TABLE Books (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(50) NOT NULL
);

SHOW TABLES;

describe Books;