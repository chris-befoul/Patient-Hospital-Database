module.exports = function(){
    var express = require('express');
    var router = express.Router();


    // GET route retrieving physicians page.
    router.get('/', function(req, res, next) {

      res.render('physicians', context);
    });

    // GET route retrieving physicians from the table using search.
    router.get('/search', function(req, res, next) {
      var context = {};
      var mysql = req.app.get('mysql');
      console.log(req.query);
      // Query to return everything from the table and format the date as month-day-year.
      mysql.pool.query('SELECT physicianID, lastName, firstName, specialty FROM Physicians', function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.results = rows;
        console.log(context);
        res.render('physicians', context);
        });
    });

    // POST route to insert new entry into table.
    router.post('/', function(req,res,next){
      var context = {};
      var mysql = req.app.get('mysql');

      mysql.pool.query("INSERT INTO Physicians (`lastName`, `firstName`, `specialty`) VALUES (?, ?, ?)", 
      [req.query.lastName, req.query.firstName, req.query.specialty], function(err, result) {
        if(err){
          next(err);
          return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('physicians', context);
        });
    });

    return router;
}();
