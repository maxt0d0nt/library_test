const controller = {};

controller.list = (req, res) => {

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM Prestamos', (err, prestamo) => {
            if (err) {
                res.json(err);
            }
            
            res.render('borrow', {
                data: prestamo
               
            });
                     
        })
     })
};


module.exports = controller;