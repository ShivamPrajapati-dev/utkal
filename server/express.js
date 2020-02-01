const express = require('express');
var timeout = require('connect-timeout');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//cross origin resourse sharing
app.use(
  cors({
    origin: 'http://127.0.0.1:5500'
  })
);

app.use(timeout(120000));

const port = 5000;



app.post('/firsubmit', (req,res)=>{

    const { exec } = require('child_process');
  exec('casperjs core.js',(err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    res.send(err);
  }
    //res.send("uploaded")
});

});

app.listen(port,function(){
  console.log('listening on port '+port);
})
