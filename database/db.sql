CREATE DATABASE infosys_test;

use infosys_test;

CREATE TABLE Books (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(50) NOT NULL
);


describe Books;

use infosys_test;

CREATE TABLE Readers (
    id INT NOT NULL PRIMARY KEY,
    name_ VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    Email VARCHAR(100),
    PhoneNumber VARCHAR(50) NOT NULL
);


CREATE TABLE Borrows (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    reader_id INT NOT NULL,
    FOREIGN KEY(reader_id) REFERENCES Readers(id),
    book_id INT NOT NULL,
    FOREIGN KEY(book_id) REFERENCES Books(id), 
    borrowDate DATETIME NOT NULL
);

SHOW TABLES;

describe Readers;