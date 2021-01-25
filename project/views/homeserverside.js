// Snippets of code used from course modules, W3 Schools and GeeksforGeeks.
// Import express and handlebars.
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');

// Tell node to choose parser depending on whether it see URL or JSON.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(9199);