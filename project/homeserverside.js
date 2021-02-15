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
app.set('port', process.argv[2]);

app.get('/', function(req, res, next){
  res.render('home');
});

app.get('/patients', function(req, res, next){
  res.render('patients');
});

app.get('/payors', function(req, res, next){
  res.render('payors');
});

// app.get('/physicians', function(req, res, next){
//   res.render('physicians');
// });

app.use('/physicians', require('./physiciansserverside.js'));

app.get('/hospitals', function(req, res, next){
  res.render('hospitals');
});

app.get('/hospitalsandpayors', function(req, res, next){
  res.render('hospitalsandpayors');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
