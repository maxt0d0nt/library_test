const controller = {};

controller.list = (req, res) => {

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM Borrows', (err, borrow) => {
            if (err) {
                res.json(err);
            }
            
            res.render('borrow', {
                data: borrow
               
            });
                     
        })
     })
};

module.exports = controller;