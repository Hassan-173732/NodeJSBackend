const bGround = require('fcc-express-bground');
const myApp = require('./myApp');
const express = require('express');
const app = express();

// Middleware for logging incoming requests
app.use(function(req,res,next){
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

if (!process.env.DISABLE_XORIGIN) {
  app.use((req, res, next) => {
    const allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    const origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }

    next();
  });

  app.use('/public', express.static(__dirname + '/public'));

  app.get("/", (req, res) => {
    res.sendFile( __dirname + '/views/index.html');
  });

  app.get("/now",function(req,res,next){
    currentTime = new Date();
    req.time = currentTime.toString();
    next();
  }, function(req,res){
    res.json({"time" : req.time});
  });

  app.get("/json" , (req, res) => {
    var response = "Hello json"
    if(process.env.MESSAGE_STYLE === "uppercase"){
      res.json({"message": response.toUpperCase()})
    }
    else{
      res.json({"message": response})
    }
  });

  
}

const port = process.env.PORT || 3000;
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, () => {
  bGround.log(`Node is listening on port ${port}...`);
});
