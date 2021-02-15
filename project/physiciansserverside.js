module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // POST route to insert new entry into table.
    app.post('/physicians', function(req,res,next){
        var context = {};
    
        pool.query("INSERT INTO Physicians (`lastName`, `firstName`, `specialty`) VALUES (?, ?, ?)", 
        [req.query.lastName, req.query.firstName, req.query.specialty], function(err, result) {
        if(err){
            next(err);
            return;
        }
        context.results = "Inserted id " + result.insertId;
        res.render('physicians', context);
        })
    })};
