// Modules
const express = require('express');
const path = require('path');
const session = require('express-session');
// Routers
const indexRouter = require(path.join(__dirname, 'routes', 'index'));
const searchRouter = require(path.join(__dirname, 'routes', 'search'));
const booksRouter = require(path.join(__dirname, 'routes', 'books'));
const bookRouter = require(path.join(__dirname, 'routes', 'book'));
const registerRouter = require(path.join(__dirname, 'routes', 'register'));
const loginRouter = require(path.join(__dirname, 'routes', 'login'));
const logoutRouter = require(path.join(__dirname, 'routes', 'logout'));
const accountRouter = require(path.join(__dirname, 'routes', 'account'));
const manageRouter = require(path.join(__dirname, 'routes', 'manage'));
const delbookRouter = require(path.join(__dirname, 'routes', 'delbook'));
const publisherRouter = require(path.join(__dirname, 'routes', 'publisher'));

const app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        resave: false,
        secret: 'comp3005',
        saveUninitialized: false,
    })
);

// Routes
app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/books', booksRouter);
app.use('/book', bookRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/account', accountRouter);
app.use('/manage', manageRouter);
app.use('/delbook', delbookRouter);
app.use('/publisher', publisherRouter);

// Error handler
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(err.status).render(path.join('pages', 'error'), {
        status: err.status,
        message: err.message,
        session: req.session,
    });
});

// Catch all other routes as 404s
app.all('*', (req, res, next) => {
    res.status(404).render('pages/error', {
        status: '404',
        message: 'Resource Not Found',
        session: req.session,
    });
});

module.exports = app;
