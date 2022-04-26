const express = require('express');
const { join } = require('path');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();
const readerRouter = require('./routes/readerRouter');
const booksRouters = require('./routes/bookController');
const indexRouters = require('./routes/indexRoutes');
const borrowRouter = require('./routes/borrowRouter');
const { urlencoded } = require('body-parser');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'infosys_test',

}, 'single'));
app.use(express.urlencoded({extended: true}));


//routes
app.use('/', indexRouters);
app.use('/book', booksRouters);
app.use('/reader', readerRouter);
app.use('/borrow', borrowRouter);

//statics file
app.use(express.static(path.join(__dirname, 'public')));



//start server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})