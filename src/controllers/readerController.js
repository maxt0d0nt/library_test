const { validationResult } = require('express-validator');

const controller = {};

controller.list = (req, res) => {

     req.getConnection((err, conn) => {
        conn.query('SELECT * FROM Readers', (err, Readers) => {
            if (err) {
                res.json(err);
            }
            
            res.render('reader', {
                data: Readers
               
            });
                     
        })
     })
};

controller.add = (req, res) => {

let errors = validationResult(req);
    if (errors.isEmpty()){
       const data = req.body;

        req.getConnection((err, conn) => {
        conn.query('INSERT INTO Readers set ?', [data], (err, readers) => {
        res.redirect('/reader');

    });
});
} else {

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM Readers', (err, reader) => {
            if (err) {
                res.json(err);
            }
            
            res.render('reader', {
                data: reader,
                errors: errors.array(),
                old: req.body
            });
                     
        })
     })
   
}};

controller.edit = (req, res) => {
    const id = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM readers WHERE id_reader = ?', [id], (err, Readers) => {
            res.render('readerEdit', {
                data: Readers
            })
        })
   })
}

controller.update = (req, res) => {
    const id = req.params.id;
    const updateReader= req.body;

req.getConnection((err, conn) => {
    conn.query('UPDATE readers set ? WHERE id_reader = ?', [updateReader, id], (err, Reader) => {
        res.redirect('/reader');
    })
})

}

controller.delete = (req, res) => {
    const id = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM Readers WHERE id_reader = ?', [id], (err, Reader) => {
            res.redirect('/reader');
        })
    })
}



module.exports = controller;