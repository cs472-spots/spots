var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
  console.log("responded to client")
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
