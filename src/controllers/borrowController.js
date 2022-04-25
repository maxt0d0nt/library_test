const controller = {};

controller.list = (req, res) => {

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM books INNER JOIN borrows ON books.id_book = borrows.book_id INNER JOIN readers ON readers.id_reader = borrows.reader_id; ', (err, prestamo) => {
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

controller.comment = (req, res) => {
    const id = req.params.id;
    
  
  req.getConnection((err, conn) => {
      conn.query('SELECT * FROM borrows where id_borrow = ?', [id], (err, books) => {
            res.render('return' , {
                data: books
            } )
        })
    })

    }

    controller.return = (req, res) => {
        const id = req.params.id;
       const data = req.body;
       const comments = data.comment;
       
    
         req.getConnection((err, conn) => {
            conn.query('UPDATE borrows set returnDate = CURRENT_DATE(),  comment = ? WHERE id_borrow = ?', [comments, id], (err, books) => {
                res.render("index")
            })
        })
    
    }

controller.delete = (req, res) => {
    const id = req.params.id;
  
  req.getConnection((err, conn) => {
        conn.query('DELETE FROM Borrows WHERE id_borrow = ?', [id], (err, books) => {
            
            res.render("index")
        })
    })

    }




module.exports = controller;