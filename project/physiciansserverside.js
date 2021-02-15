module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res, next){
        res.render('physicians');
        });

    // POST route to insert new entry into table.
    router.post('/', function(req,res,next){
        var context = {};
        var mysql = req.app.get('mysql');
        console.log(req.query);
        mysql.pool.query("INSERT INTO Physicians (`lastName`, `firstName`, `specialty`) VALUES (?, ?, ?)", 
        [req.query.lastName, req.query.firstName, req.query.specialty], function(err, result) {
        if(err){
            next(err);
            return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('physicians', context);
        })
    });

    return router;
}();
