module.exports = function(){
    var express = require('express');
    var router = express.Router();


    // GET route retrieving hospitals page.
    router.get('/', function(req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');

        // Query to return everything from the table.
        mysql.pool.query('SELECT hospitalID, hospitalName, city, state, zip FROM Hospitals', function(err, rows, fields){
          if(err){
            next(err);
            return;
          }
          context.results = rows;
          context.search = [{hospitalID:null, hospitalName:null, city:null, state:null, zip:null}];
          res.render('hospitals', context);
          });
    });

    // GET route retrieving hospitals from the table using search.
    router.get('/search', function(req, res, next) {
      var context = {};
      var mysql = req.app.get('mysql');

      // Query to return everything from the table.
      mysql.pool.query('SELECT hospitalID, hospitalName, city, state, zip FROM Hospitals WHERE hospitalName=? AND city=? AND state=? AND zip=?',
      [req.query.hospitalName, req.query.city, req.query.state, req.query.zip], function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.search = rows;
        console.log(context.search);
        res.render('hospitals', context);
        });
    });

    // POST route to insert new entry into table.
    router.post('/', function(req,res,next){
      var context = {};
      var mysql = req.app.get('mysql');

      mysql.pool.query("INSERT INTO Hospitals (`hospitalName`, `city`, `state`, zip) VALUES (?, ?, ?, ?)", 
      [req.query.hospitalName, req.query.city, req.query.state, req.query.zip], function(err, result) {
        if(err){
          next(err);
          return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('hospitals', context);
        });
    });

    return router;
}();
