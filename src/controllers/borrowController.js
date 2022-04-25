const controller = {};

controller.list = (req, res) => {

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM books INNER JOIN borrows ON books.id = borrows.book_id INNER JOIN readers ON readers.id = borrows.reader_id; ', (err, prestamo) => {
            if (err) {
                res.json(err);
            }
            console.log(prestamo)
            res.render('borrow', {
                data: prestamo
               
            });
                     
        })
     })
};

controller.delete = (req, res) => {
    const id = req.params.id;
  
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM Borrows WHERE book_id = ?', [id], (err, books) => {
            
            res.render("index")
        })
    })

    }

controller.return = (req, res) => {
    const id = req.params.id;
  
    req.getConnection((err, conn) => {
        conn.query('UPDATE Borrows set returnDate = CURRENT_DATE() WHERE book_id = ?', [id], (err, books) => {
            conn.query('', [id], (err, prestamo) => {
            res.render("index")
        })
    })

    })
}


module.exports = controller;