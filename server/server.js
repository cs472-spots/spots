var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

//var database = require("./src/database");

//var userAccountsRef = database.ref("UserAccounts");

app.set('port', (process.env.PORT || 5000));
app.use(express.static('frontend/build'));

app.get('/', function(request, response) {
  response.send(fs.readFileSync('index.html', {encoding: 'utf8'}));
  console.log("responded to client")
});

io.on('connection', (socket) => {
  //Reply to application after receiving hello message
  socket.on('hello', (msg)=> {
      console.log("Message received: " + msg);
      socket.emit('reply', "hello from the server side");
  });
  console.log("Client connected");
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
