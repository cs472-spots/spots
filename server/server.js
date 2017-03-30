var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var database = require("./src/database");
var spotsHW = require("./routes/spotsHW")

var userAccountsRef = database.ref("UserAccounts");

function register(userId, first, last, email, gotPermit){
  var userIDRef = database.ref('UserAccounts/' + userId);
  userIDRef.set({
    First_Name: first,
    Last_Name: last,
    Email: email,
    Permit: gotPermit
  });
  /*
  if(gotPermit){
    userIDRef.ref('Permit').set({
      isExpired: no,
      ExpDate: 3-29-2017,
      Permit_Type: Student
    });
  }
  else{
    userIDRef.ref('Permit').set({
      isExpired: null,
      ExpDate: null,
      Permit_Type: none,
    });
  }*/
}

register(1000584, "Alexies", "Fabian", "fabian@unlv.nevada.edu", true);
register(1234567, "Who", "Dis", "newphone_whodis@yahoo.com", false);
/*
userAccountsRef.child(key).set(userID);

//then you can write in that node in this way
function writeUserData(userId, name, email) {
  database.ref('UserAccount' + userID).set({
  nshe: userID,
  'nshe/name': name,
  'nshe/email': email
  });
}

writeUserData(userID, name, email);*/
app.set('port', (process.env.PORT || 5000));
app.use(express.static('frontend/build'));

// REST API connector
app.use('/spotsHW', spotsHW);

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
  console.log("Spots server is running on http://localhost:%s", app.get('port'));
});
