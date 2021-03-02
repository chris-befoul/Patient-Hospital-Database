// Snippets of code used from course modules, W3 Schools and GeeksforGeeks.
// Import express and handlebars.
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var app = express();
var mysql = require('./dbcon.js');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('mysql', mysql);

var bodyParser = require('body-parser');

// Tell node to choose parser depending on whether it see URL or JSON.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('port', process.argv[2]);
app.set('mysql', mysql);

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
        context.payors = result;
    });
    mysql.pool.query("SELECT physicianID FROM Physicians", function (err, result) {
        if (err) {
            next(err);
            return;
        }
        context.doctors = result;
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
      var num = context.results.length;
      for (var i = 0; i < num; i++) {
        var d = context.results[i].dob
        var month = d.getMonth() + 1
        if (month < 10) {
          month = ('0' + month).slice(-2)
        }
        var day = d.getDate()
        if (day < 10) {
          day = ('0' + day).slice(-2)
        }
        var year = d.getFullYear()
        d = [year, month, day].join('-');
        context.results[i].dob = d
      }
      /*
      var num = context.results.length
      for (var i = 0; i < num; i++) {
        var d = context.results[i].dob
        var month = d.getMonth() + 1
        var day = d.getDate()
        var year = d.getFullYear()
        d = [month, day, year].join('-');
        context.results[i].dob = d
      }

       */
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

  if (req.body.submit === 'Update') {
    var a = req.body.fname
    var b = req.body.lname
    var c = req.body.dob
    var d = req.body.address
    var e = req.body.city
    var f = req.body.state
    var g = req.body.zip
    var h = req.body.gender
    var i = req.body.diagnosis
    if (req.body.physID !== "NULL"){
      var j = Number(req.body.physID)
    } else {
      var j = null
    };
    if (req.body.payID !== "NULL"){
      var k = Number(req.body.payID)
    } else {
      var k = null
    };
    var l = Number(req.body.patID);
    mysql.pool.query("SELECT * FROM Patients WHERE patientID=?", [l], function (err, result) {
      if (err) {
        next(err);
        return;
      }
      if (result.length == 1) {
        var curVals = result[0];
        mysql.pool.query("UPDATE Patients SET firstName=?, lastName=?, dob=?, address=?, city=?, state=?, zip=?, gender=?, primDiagnosis=?, physicianID=?, payorID=? WHERE patientID=?",
            [a || curVals.firstName, b || curVals.lastName, c || curVals.dob, d || curVals.address, e || curVals.city, f || curVals.state, Number(g) || curVals.zip, h || curVals.gender, i || curVals.primDiagnosis, j, k, l],
            function (err, result) {
              if (err) {
                next(err);
                return;
              }
              res.send('Entry has been updated.');
            });
      }
    })
  }

  if (req.body.submit === 'payID'){
    mysql.pool.query('SELECT payorID FROM Payors', function (err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      context.results = rows;
      res.send(context)
    })
  }

  if (req.body.Delete === 'Delete'){
    mysql.pool.query("DELETE FROM Patients WHERE patientID = ?", [req.body.id], function (err, result){
      if(err){
        next(err);
        return;
      }
      res.send();
    });
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

  if (req.body.Delete === 'Delete'){
    mysql.pool.query("DELETE FROM Payors WHERE payorID = ?", [req.body.id], function (err, result){
      if(err){
        next(err);
        return;
      }
      res.send();
    });
  }

  if (req.body.submit === 'Update') {
    var a = req.body.company
    var b = req.body.city
    var c = req.body.state
    var d = Number(req.body.zip)
    var e = Number(req.body.payID);
    mysql.pool.query("SELECT * FROM Payors WHERE payorID=?", [e], function (err, result) {
      if (err) {
        next(err);
        return;
      }
      if (result.length == 1) {
        var curVals = result[0];
        mysql.pool.query("UPDATE Payors SET company=?, city=?, state=?, zip=? WHERE payorID =?",
            [a || curVals.company, b || curVals.city, c || curVals.state, d || curVals.zip, Number(e)],
            function (err, result) {
              if (err) {
                next(err);
                return;
              }
              res.send('Entry has been updated.');
            });
      }
    })
  }
});

app.use('/physicians', require('./physiciansserverside.js'));

app.use('/hospitals', require('./hospitalsserverside.js'));

app.use('/hospitalspayors', require('./hospitalspayorsserverside.js'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();      
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
