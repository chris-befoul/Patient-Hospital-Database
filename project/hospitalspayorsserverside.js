module.exports = function(){
    var express = require('express');
    var router = express.Router();


    // GET route retrieving hospitals page.
    router.get('/', function(req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');

        // Query to return everything from the table.
        mysql.pool.query('SELECT rowID, hospitalID, payorID FROM Hospitals_Payors', function(err, rows, fields){
          if(err){
            next(err);
            return;
          }
          context.results = rows;
          context.search = [{hospitalID:null, payorID:null}];
          res.render('hospitalspayors', context);
          });
    });

    // GET route retrieving hospitals from the table using search.
    router.get('/search', function(req, res, next) {
      var context = {};
      var mysql = req.app.get('mysql');

      // Query to return everything from the table.
      mysql.pool.query('SELECT hospitalID, payorID FROM Hospitals_Payors WHERE hospitalID=? AND payorID=?',
      [req.query.hospitalID, req.query.payorID], function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.search = rows;
        console.log(context.search);
        res.render('hospitalspayors', context);
        });
    });

    // POST route to insert new entry into table.
    router.post('/', function(req,res,next){
      var context = {};
      var mysql = req.app.get('mysql');

      mysql.pool.query("INSERT INTO Hospitals_Payors (hospitalID, payorID) VALUES (?, ?)", 
      [req.query.hospitalID, req.query.payorID], function(err, result) {
        if(err){
          next(err);
          return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('hospitalspayors', context);
        });
    });

    // DELETE route to delete a table row based on id.
    router.delete('/delete', function(req, res, next){
      var context = {};
      var mysql = req.app.get('mysql');

      mysql.pool.query("DELETE FROM Hospitals_Payors WHERE rowID=?", [req.query.id], function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Deleted" + result.changedRows;
        console.log(context);
        res.render('hospitalspayors', context);
      });
    });

    return router;
}();
