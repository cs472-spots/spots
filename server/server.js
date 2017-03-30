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
  console.log("Client connected - " + socket.id);

  socket.on('client', (data) => {
    //clientType = data.client;
    switch(data.client){
      case 'Admin':
        //Receive JSON Object
        console.log("Received the following data from admin: \n");
        console.log(data);

        registerUser(data.username, data.password, data.userID, data.firstName, data.lastName, data.email, data.phone, data.permit);
        break;
      case 'Mobile':
        //Receive JSON Object
        console.log("Received the following data from mobile: \n");
        console.log(data);

        registerUser(data.username, data.password, data.userID, data.firstName, data.lastName, data.email, data.phone, data.permit);
        break;
    }
  });

  //Reply to application after receiving hello message
  socket.on('hello', (msg)=> {
      console.log("Message received: " + msg);
      socket.emit('reply', "hello from the server side");
  });
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
function registerUser(username, password, userId, first, last, email, phone, gotPermit, expired, expDate,
  permittype, make, model, color, plate){
  var userIDRef = database.ref('UserAccounts/' + username);
  console.log('Password passed to registerUser() is: ' + password);
  //Hash password for security
  var passwd = hashFunction(password);

  database.ref('UserAccounts/' + userId + '/LoginCredentials').set({
    Username: username,
    Password: passwd
  });

  //Create separate child in database for login credentials
  //Easier to search and authenticate matching passwords
  var login = database.ref('UserLogin/' + userId);
  login.set({
    Password: passwd
  });

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

//Creates hash for user password
//Paramters: (string)
function hashFunction(password){
  console.log('password is: ' + password + '\n');
  var hash = "";
  var len = password.length;
  var shift = 3;
  var x;
/*
  //Caesar cipher for now
  for(var i=0; i<len; i++){
    x = password.charCodeAt(i);
		if (x >= 65 && x <=  90){
      hash += String.fromCharCode((x - 65 + shift) % 26 + 65);
    }
    else if (x >= 97 && x <= 122){
      hash += String.fromCharCode((x - 97 + shift) % 26 + 97);
    }
    else
      hash += text.charAt(i);
  }*/
  hash = "hashhhh";

  return hash;
}
