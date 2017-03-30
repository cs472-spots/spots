var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var database = require("./src/database");
var spotsHW = require("./routes/spotsHW");
var Enum = require('enum');

var permitType = new Enum(['none', 'Student', 'Faculty']);
var None = permitType.get(1);
var Student = permitType.get(2);
var Faculty = permitType.get(3);

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

//--------------------------------------------------------------------------------------------
//Functions
//--------------------------------------------------------------------------------------------

//Registers User to database
//Paramters: (int, string, string, string, int, boolean, boolean, string?, permitType,
//  string?, string?, string?, string?)
function registerUser(userId, first, last, email, phone, gotPermit, expired, expDate,
  permittype, make, model, color, plate){
  var userIDRef = database.ref('UserAccounts/' + userId);
  userIDRef.set({
    First_Name: first,
    Last_Name: last,
    Email: email,
    Phone: phone,
    Permit: gotPermit
  });

  if(gotPermit){
    database.ref('UserAccounts/' + userId + '/Permit').set({
      isExpired: expired,
      ExpDate: expDate,
      Permit_Type: permittype
    });

    database.ref('UserAccounts/' + userId + '/Vehicle').set({
      Make: make,
      Model: model,
      Color: color,
      Plate_Number: plate
    });
  }
  else{
    database.ref('UserAccounts/' + userId + '/Permit').set({
      isExpired: null,
      ExpDate: null,
      Permit_Type: None
    });

    database.ref('UserAccounts/' + userId + '/Vehicle').set({
      Make: null,
      Model: null,
      Color: null,
      Plate_Number: null
    });
  }
}
