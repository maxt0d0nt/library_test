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


CREATE TABLE prestamos

SELECT books.title, 
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


CREATE TABLE Borrows (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    reader_id INT NOT NULL,
    FOREIGN KEY(reader_id) REFERENCES Readers(id),
    book_id INT NOT NULL,
    FOREIGN KEY(book_id) REFERENCES Books(id), 
    borrowDate DATETIME NOT NULL,
    returnDate DATETIME
);

SELECT * FROM books
CROSS JOIN readers
WHERE books.id = 1 AND readers.id = 1

SHOW TABLES;

describe Readers;