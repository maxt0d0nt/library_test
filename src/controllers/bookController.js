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

    const data = req.body;

    req.getConnection((err, conn) => {
    conn.query('INSERT INTO Books set ?', [data], (err, books) => {
        res.redirect('/book');

    });
});
    
};

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
    console.log(data)
    console.log(id)
    console.log(re_id)

    //res.send("hola ary")
        
    req.getConnection((err, conn) => {
    conn.query('INSERT INTO Borrows (reader_id, book_id) VALUE (?,?)', [re_id, id], (err, borrow) => {
        console.log(borrow)
        res.send("hola ary")
        });
    });
}









module.exports = controller;