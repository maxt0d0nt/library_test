const { doesNotMatch } = require('assert');
const { validationResult } = require('express-validator');
const { networkInterfaces } = require('os');

const controller = {};


controller.list = async (req, res) => {

     await req.getConnection((err, conn) => {
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

controller.add = async (req, res) => {

    let errors = validationResult(req);
    if (errors.isEmpty()){
       const data = req.body;

       await req.getConnection((err, conn) => {
        conn.query('INSERT INTO Books set ?', [data], (err, books) => {
            if (err) {
                res.json(err);
            }
        res.redirect('/book');

    });
});
} else {

     await req.getConnection((err, conn) => {
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

controller.edit = async (req, res) => {
    const id = req.params.id;

    await req.getConnection((err, conn) => {
        conn.query('SELECT * FROM Books WHERE id_book = ?', [id], (err, books) => {
            if (err) {
                res.json(err);
            }
            res.render('bookEdit', {
                data: books
            })
        })
   })
}

controller.update = async (req, res) => {
    const id = req.params.id;
    const updateBook = req.body;

    await req.getConnection((err, conn) => {
        conn.query('UPDATE Books set ? WHERE id_book = ?', [updateBook, id], (err, books) => {
            if (err) {
                res.json(err);
            }
             res.redirect('/book');
    })
})

};

controller.delete = async (req, res) => {
    const id = req.params.id;

    await req.getConnection((err, conn) => {
        conn.query('DELETE FROM Books WHERE id_book = ?', [id], (err, books) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/book');
        })
    })
};


controller.borrow = async (req, res) => {
    const id = req.params.id;
    
   await req.getConnection ((err, conn) => {
        conn.query(('SELECT * FROM Borrows'), (err, borrow) => {
                                 console.log(borrow)
                                 
            for (i = 0; i < borrow.length; i++){
                
                if ( borrow[i].book_id == id && borrow[i].returnDate == null){
                                
                    res.render('index', {
                        data: borrow,
                        alert: true,
                        alertTitle: "Borrow",
                        alertIcon: 'failed',
                        alertMessage: 'Sorry, This Book ',
                        showConfirmButton: true,
                        timer:2000,
                    })
                }}
            })})

       await req.getConnection((err, conn) => {
        conn.query('SELECT * FROM Books WHERE id_book = ?', [id], (err, books) => {
            
            if (err) {
                res.json(err);
            }
            console.log(books)
            res.render('borrowAdd', {
                data: books,
                
            });
                     
        })
     });
    
}

controller.loan = async (req, res) => {

    const data = req.body;
    const id = data.id;
    const re_id = data.reader_id
    
    const errors = validationResult(req);

    
    if (errors.isEmpty()){
       const data = req.body;

       await req.getConnection((err, conn) => {
           
        conn.query('INSERT INTO Borrows (reader_id, book_id, borrowDate) VALUE (?,?, CURRENT_DATE())', [re_id, id], (err, borrow) => {
            if (err) {
             
               res.send("This reader ID is not available");
            }
            console.log(borrow)
            res.redirect('/book')
            
        });

    })

    } else {

    const ids = req.params.id;
        await req.getConnection((err, conn) => {
            conn.query('SELECT * FROM Books WHERE id_book = ?', [ids], (err, books) => {
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