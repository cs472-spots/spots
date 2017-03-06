var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var admin = require("firebase-admin");

var ServiceAccount = require("../firebase-private-key.js");

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
  databaseURL: "https://spots-cba38.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("UserAccounts/1013512824");
ref.set({
  name: "Martin",
  last: "Jaime",
  email: "jaimem5@unlv.nevada.edu",
  phone: "7026086362"
})

app.set('port', (process.env.PORT || 5000));
app.use(express.static('frontend/build'));

app.get('/', function(request, response) {
  response.send(fs.readFileSync('index.html', {encoding: 'utf8'}));
  console.log("responded to client")
});

io.on('connection', (socket) => {
  socket.emit("message", "hello world");
  console.log("Client connected");
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
