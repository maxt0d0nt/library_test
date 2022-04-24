const { doesNotMatch } = require('assert');
const { validationResult } = require('express-validator');

const controller = {};


controller.list = (req, res) => {

     req.getConnection((err, conn) => {
        conn.query('SELECT * FROM Books', (err, books) => {
            if (err) {
                res.json(err);
            }
            
            res.render('book', {
                data: books
               
            });
                     
        })
     })

};

controller.add = (req, res) => {

    let errors = validationResult(req);
    if (errors.isEmpty()){
       const data = req.body;

        req.getConnection((err, conn) => {
        conn.query('INSERT INTO Books set ?', [data], (err, books) => {
        res.redirect('/book');

    });
});
} else {

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM Books', (err, books) => {
            if (err) {
                res.json(err);
            }
            
            res.render('book', {
                data: books,
                errors: errors.array(),
                old: req.body
            });
                     
        })
     })
   
}};

controller.edit = (req, res) => {
    const id = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM Books WHERE id = ?', [id], (err, books) => {
            res.render('bookEdit', {
                data: books
            })
        })
   })
}

controller.update = (req, res) => {
    const id = req.params.id;
    const updateBook = req.body;

req.getConnection((err, conn) => {
    conn.query('UPDATE Books set ? WHERE id = ?', [updateBook, id], (err, books) => {
        res.redirect('/book');
    })
})

};

controller.delete = (req, res) => {
    const id = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM Books WHERE id = ?', [id], (err, books) => {
            res.redirect('/book');
        })
    })
};

controller.borrow = (req, res) => {
    const id = req.params.id;

    req.getConnection((err, conn) => {
        conn.query(('SELECT * FROM Borrows'), (err, borrow) => {
            console.log(borrow)
            for (i = 0; i < borrow.length; i++){
                if ( borrow[i].book_id == id){
                    
                    res.render('index', {
                        data: borrow,
                        alert: true,
                        aletrTitle: "Borrow",
                        alertIcon: 'failed',
                        alertMessage: 'Sorry, This Book is not FOR YOU!!',
                        showConfirmButton: true,
                        timer:2000,
                        ruta:''
                    })
                }}
            })})

      req.getConnection((err, conn) => {
        conn.query('SELECT * FROM Books WHERE id = ?', [id], (err, books) => {
            
            if (err) {
                res.json(err);
            }
            console.log(books)
            res.render('borrowAdd', {
                data: books
               
            });
                     
        })
     });
    
}

controller.loan = (req, res) => {

    const data = req.body;
    const id = data.id;
    const re_id = data.reader_id
    const errors = validationResult(req);

    
    if (errors.isEmpty()){
       const data = req.body;

       req.getConnection((err, conn) => {
        conn.query('INSERT INTO Borrows (reader_id, book_id, borrowDate, returnDate) VALUE (?,?, CURRENT_DATE(), CURRENT_DATE() + 5 )', [re_id, id], (err, borrow) => {
            console.log(borrow)
            res.redirect('/book')
            
        });

    })

    } else {

    const ids = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM Books WHERE id = ?', [ids], (err, books) => {
            if (err) {
                res.json(err);
            }
             res.render('borrowAdd', {
                data: books,
                errors: errors.array(),
                old: req.body
            });
                     
        })
     })
   
    }

}







module.exports = controller;