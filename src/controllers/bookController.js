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

}

controller.delete = (req, res) => {
    const id = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM Books WHERE id = ?', [id], (err, books) => {
            res.redirect('/book');
        })
    })
}




module.exports = controller;