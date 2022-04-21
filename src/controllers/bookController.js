const controller = {};

controller.list = (req, res) => {

     req.getConnection((err, conn) => {
        conn.query('SELECT * FROM Books', (err, books) => {
            if (err) {
                res.json(err);
            }
            console.log(books);
            res.render('book'), {
                data: books
            };
        })
     })
}


module.exports = controller;