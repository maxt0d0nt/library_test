const { validationResult } = require('express-validator');

const controller = {};

controller.list = async (req, res) => {

    await req.getConnection((err, conn) => {
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

controller.add = async (req, res) => {

    let errors = validationResult(req);

    if (errors.isEmpty()){

       const data = req.body;

    await req.getConnection((err, conn) => {
        conn.query('INSERT INTO Readers set ?', [data], (err, readers) => {
            if (err) {
                res.json(err);
            }

            res.redirect('/reader');

    });
});
} else {

    await req.getConnection((err, conn) => {
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

controller.edit = async (req, res) => {
    const id = req.params.id;

    await req.getConnection((err, conn) => {
        conn.query('SELECT * FROM readers WHERE id_reader = ?', [id], (err, Readers) => {
            if (err) {
                res.json(err);
            }
            res.render('readerEdit', {
                data: Readers
            })
        })
   })
}

controller.update = async (req, res) => {
    const id = req.params.id;
    const updateReader= req.body;

    await req.getConnection((err, conn) => {
        conn.query('UPDATE readers set ? WHERE id_reader = ?', [updateReader, id], (err, Reader) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/reader');
    })
})

}

controller.delete = async (req, res) => {
    const id = req.params.id;

    await req.getConnection((err, conn) => {
        conn.query('DELETE FROM Readers WHERE id_reader = ?', [id], (err, Reader) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/reader');
        })
    })
}



module.exports = controller;