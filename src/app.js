const express = require('express');
const { join } = require('path');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();

const booksRouters = require('./routes/book');

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


//routes
app.use('/', booksRouters);

//statics file
app.use(express.static(path.join(__dirname, 'public')));



//start server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})