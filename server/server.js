var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var database = require("./src/database");
var spotsHW = require("./routes/spotsHW")

var userAccountsRef = database.ref("UserAccounts");

app.set('port', (process.env.PORT || 5000));
app.use(express.static('frontend/build'));

// REST API connector
app.use('/spotsHW', spotsHW);

app.get('/', function(request, response) {
  response.send(fs.readFileSync('index.html', {encoding: 'utf8'}));
  console.log("responded to client")
});

io.on('connection', (socket) => {
  socket.emit('message', 'hello from server');
  console.log("Client connected");
});

server.listen(app.get('port'), function() {
  console.log("Spots server is running on http://localhost:%s", app.get('port'));
});
