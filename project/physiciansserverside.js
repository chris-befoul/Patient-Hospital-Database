module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // GET route retrieving physicians page.
    router.get('/', function(req, res, next) {
        var context = {};
        var mysql = req.app.get('mysql');

        // Query to return everything from the table and format the date as month-day-year.
        mysql.pool.query('SELECT physicianID, lastName, firstName, specialty FROM Physicians', function(err, rows, fields){
          if(err){
            next(err);
            return;
          }
          context.results = rows;
          context.search = [{physicianID:null, firstName:null, lastName:null, specialty:null}];
          res.render('physicians', context);
          });
    });

    // GET route retrieving physicians from the table using search.
    router.get('/search', function(req, res, next) {
      var context = {};
      var mysql = req.app.get('mysql');

      // Query to return everything from the table and format the date as month-day-year.
      mysql.pool.query('SELECT physicianID, lastName, firstName, specialty FROM Physicians WHERE lastName=? AND firstName=? AND specialty=?',
      [req.query.lastName, req.query.firstName, req.query.specialty], function(err, rows, fields){
        if(err){
          next(err);
          return;
        }
        context.search = rows;
        console.log(context.search);
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

    // DELETE route to delete a table row based on id.
    router.delete('/delete', function(req, res, next){
      var context = {};
      var mysql = req.app.get('mysql');

      mysql.pool.query("DELETE FROM Physicians WHERE physicianID=?", [req.query.id], function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Deleted" + result.changedRows;
        res.render('physicians', context);
      });
    });

    // POST route to update row based on id and to keep current values if no new ones are provided.
    router.post('/update', function(req,res,next){
      var context = {};
      var mysql = req.app.get('mysql');

      mysql.pool.query("SELECT * FROM Physicians WHERE physicianID=?", [req.query.id], function(err, result){
        if(err){
          next(err);
          return;
        }
        if(result.length == 1){
          var curVals = result[0];
          
          mysql.pool.query("UPDATE Physicians SET firstName=?, lastName=?, specialty=?, WHERE id=?",
            [req.query.firstName || curVals.firstName, req.query.lastName || curVals.lastName, req.query.specialty || curVals.specialty, req.query.id],
            function(err, result){
            if(err){
              next(err);
              return;
            }
            context.results = "Updated " + result.changedRows + " rows.";
            res.send("Entry has been updated");
          });
        }
      });
    });

    return router;
}();
