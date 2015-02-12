
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/leaderboard', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send([
    {name: 'Lukas', points: 900},
    {name: 'John', points: 1000},
    {name: 'Mike', points: 200}
  ]);
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');
