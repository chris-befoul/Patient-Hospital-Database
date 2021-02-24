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

    // DELETE route to delete a table row based on id.
    router.delete('/delete', function(req, res, next){
      var context = {};
      var mysql = req.app.get('mysql');

      mysql.pool.query("DELETE FROM Hospitals WHERE hospitalID=?", [req.query.id], function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Deleted" + result.changedRows;
        res.render('hospitals', context);
      });
    });

    // POST route to update row based on id and to keep current values if no new ones are provided.
    router.post('/update', function(req,res,next){
      var context = {};
      var mysql = req.app.get('mysql');

      mysql.pool.query("SELECT * FROM Hospitals WHERE hospitalID=?", [req.query.id], function(err, result){
        if(err){
          next(err);
          return;
        }
        if(result.length == 1){
          var curVals = result[0];
          
          mysql.pool.query("UPDATE Hospitals SET hospitalName=?, city=?, state=?, zip=? WHERE physicianID=?",
            [req.query.hospitalName || curVals.hospitalName, req.query.city || curVals.city, req.query.state || curVals.state, req.query.zip || curVals.zip, req.query.id],
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
