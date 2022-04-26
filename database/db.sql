CREATE DATABASE infosys_test;

use infosys_test;

CREATE TABLE Books (
    id_book INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(100) NOT NULL,
    isbn VARCHAR(50) NOT NULL
);


CREATE TABLE Readers (
    id_reader INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_ VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    Email VARCHAR(100),
    PhoneNumber VARCHAR(50) NOT NULL
);

CREATE TABLE Borrows (
    id_borrow INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    reader_id INT NOT NULL,
    FOREIGN KEY(reader_id) REFERENCES Readers(id),
    book_id INT NOT NULL,
    FOREIGN KEY(book_id) REFERENCES Books(id), 
    borrowDate DATETIME NOT NULL,
    returnDate DATETIME
);


CREATE TABLE prestamos

SELECT 
borrows.id as borrows_id,
books.title, 
books.author, 
books.isbn, 
readers.id, 
readers.name_, 
readers.surname, 
DATE_FORMAT(borrows.borrowDate, "%M %d %Y"),
DATE_FORMAT(borrows.returnDate, "%M %d %Y")
FROM books 
INNER JOIN borrows ON books.id = borrows.book_id 
INNER JOIN readers ON readers.id = borrows.reader_id;

SHOW TABLES;

describe Readers;