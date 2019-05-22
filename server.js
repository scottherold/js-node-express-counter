// <---------- Server setup ---------->
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

// <---------- Dependencies ---------->
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'countersesh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// <---------- Routing ---------->
// Root
app.get('/', function(req, res) {
    if(req.session.count > 0) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.render('index', {title: "counter", counter: req.session.count});
})

// Add 2
app.post('/add/2', function (req, res) {
    req.session.count++;
    res.redirect('/');
})

// Reset
app.post('/reset', function (req, res) {
    req.session.count = 0;
    res.redirect('/');
})

// <---------- Port listening ---------->
app.listen(8000, function() {
    console.log('listening on port 8000...')
})