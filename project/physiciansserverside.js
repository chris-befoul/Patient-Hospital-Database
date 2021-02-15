// Snippets of code used from course modules, W3 Schools and GeeksforGeeks.
// Import express and handlebars.
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var app = express();
var mysql = require('./dbcon.js');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');

// Tell node to choose parser depending on whether it see URL or JSON.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

router.get('/', function(req, res, next){
    res.render('physicians');
    });

// POST route to insert new entry into table.
router.post('/', function(req,res,next){
    var context = {};

    pool.query("INSERT INTO Physicians (`lastName`, `firstName`, `specialty`) VALUES (?, ?, ?)", 
    [req.query.lastName, req.query.firstName, req.query.specialty], function(err, result) {
    if(err){
        next(err);
        return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('physicians', context);
    })
});
