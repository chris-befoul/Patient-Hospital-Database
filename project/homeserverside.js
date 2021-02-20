// Snippets of code used from course modules, W3 Schools and GeeksforGeeks.
// Import express and handlebars.
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var mysql = require('./Dbase');

var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');

// Tell node to choose parser depending on whether it see URL or JSON.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('port', 9919);

app.get('/', function(req, res, next){
  res.render('home');
});

app.get('/patients', function(req, res, next) {
    var context = {};
    mysql.pool.query("SELECT company FROM Payors", function (err, result) {
        if (err) {
            next(err);
            return;
        }
        context.results = result;
        res.render('patients', context);
    });
});

app.post('/patients',function(req,res,next) {
  var context = {};
  if (req.body['AddPat']) {
    var a = req.body.AddFirst
    var b = req.body.AddLast
    var c = req.body.AddDob
    var d = req.body.AddStreet
    var e = req.body.AddCity
    var f = req.body.AddState
    var g = req.body.AddZip
    var h = req.body.AddGender
    var i = req.body.AddDiagnosis
    var j = req.body.AddPhysID
    mysql.pool.query("INSERT INTO Patients (`firstName`, `lastName`, `dob`, `address`, `city`, `state`, `zip`, `gender`, `primDiagnosis`, `physicianID`, `payorID`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT payorId FROM Payors WHERE company = ?))", [a, b, c, d, e, f, g, h, i, j, req.body.PayName], function (err, result) {
      if (err) {
        next(err);
        return;
      }
      context.results = result;
      res.render('patients');
    })
  }

  if (req.body.submit === 'all'){
    mysql.pool.query('SELECT * FROM Patients', function (err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      context.results = rows;
      var num = context.results.length
      for (var i = 0; i < num; i++) {
        var d = context.results[i].dob
        var month = d.getMonth() + 1
        var day = d.getDate()
        var year = d.getFullYear()
        d = [month, day, year].join('-');
        context.results[i].dob = d
      }
      res.send(context)
    })
  }

  if (req.body.submit === 'searchPat'){
    mysql.pool.query('SELECT * FROM Patients WHERE firstName = ? AND lastName = ? AND dob = ?', [req.body.firstName, req.body.lastName, req.body.searchDOB],  function (err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      context.results = rows;
      var num = context.results.length
      for (var i = 0; i < num; i++) {
        var d = context.results[i].dob
        var month = d.getMonth() + 1
        var day = d.getDate()
        var year = d.getFullYear()
        d = [month, day, year].join('-');
        context.results[i].dob = d
      }
      res.send(context)
    })
  }
});

app.get('/payors', function(req, res, next){
  res.render('payors');
});

app.post('/payors',function(req,res,next) {
  var context = {};
  if (req.body['AddPay']) {
    var a = req.body.company
    var b = req.body.PayCity
    var c = req.body.PayState
    var d = req.body.PayZip
    mysql.pool.query("INSERT INTO Payors (`company`, `city`, `state`, `zip`) VALUES (?, ?, ?, ?)", [a, b, c, d], function (err, result) {
      if (err) {
        next(err);
        return;
      }
      context.results = result;
      res.render('payors');
    })
  }

  if (req.body.submit === 'all'){
    mysql.pool.query('SELECT * FROM Payors', function (err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      context.results = rows;
      res.send(context)
    })
  }

  if (req.body.submit === 'searchPay'){
    mysql.pool.query('SELECT * FROM Payors WHERE company = ?', [req.body.company],  function (err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      context.results = rows;
      res.send(context)
    })
  }
});


app.get('/physicians', function(req, res, next){
  res.render('physicians');
});

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
