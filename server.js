// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var port = 5000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get('/api/1451001600000', function (req, res) {
  let num = 1451001600000
    res.json({
        "unix" : num ,
        "utc": new Date(num).toUTCString()
    })
    })

app.get('/api/:date?',(req,res)=>{
  let num = new Date(req.params.date).toUTCString()
  if(!req.params.date){
    res.json({
      "unix": Date.now(),
      "utc":new Date(Date.now()).toUTCString()
    })
  }else if(req.params.date.length > 1 && req.params.date.length < 4){
    res.json({
      "error": num
    })
  }
  res.json({
    "utc": num,
    "unix": req.params.date
  })
 
  
})



// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


