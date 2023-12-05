require('dotenv').config()
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));


console.log("Hello World");


app.get("/now",function(req, res, next){
    req.time = new Date().toString();
    next(); 
    },
    function(req,res){
      res.json({"time": req.time});
    }
  );

  app.post("/name",function(req,res,next){
    res.json({"name": req.body.first + " " + req.body.last});
  });

app.get("/:word/echo",function(req,res,next){
    res.json({"echo": req.params.word});
  });

app.get("/name",function(req,res,next){
    res.json({"name": req.query.first + " " + req.query.last});
});  

































 module.exports = app;
