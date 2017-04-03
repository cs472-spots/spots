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
    var userProfile = data;
    switch(data.client){
      case 'Admin':
        //Receive JSON Object
        console.log("Received the following data from admin: \n");
        console.log(data);

        registerUser(userProfile);
        break;
      case 'Mobile':
        //Receive JSON Object
        console.log("Received the following data from mobile: \n");
        console.log(data);

        registerUser(userProfile);
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
function registerUser(userProfile){
  var userIDRef = database.ref('UserAccounts/' + userProfile.userID);

  //console.log('Password passed to registerUser() is: ' + userProfile.password);
  //Hash password for security
  var passwd = hashFunction(userProfile.password);
  console.log('Hash successfully returned: ' + passwd);

  database.ref('UserAccounts/' + userProfile.userID + '/LoginCredentials').set({
    Username: userProfile.username,
    Password: passwd
  });
  //Create separate child in database for login credentials
  //Easier to search and authenticate matching passwords
  var login = database.ref('UserLogin/' + userProfile.userID);
  login.set({
    Password: passwd
  });

  userIDRef.set({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    userEmail: userProfile.email,
    phone: userProfile.phone,
    permit: userProfile.gotPermit
  });

  if(userProfile.gotPermit===true){
    database.ref('UserAccounts/' + userProfile.userID + '/permit').set({
      purchaseDate: userProfile.purchaseDate,
      expDate: userProfile.expDate,
      type: userProfile.permitType
    });

    console.log('Number of vehicles: ' + userProfile.vehicleInt);
    if(userProfile.vehicleInt<=2){
      database.ref('UserAccounts/' + userProfile.userID + '/vehicles/v1').set({
        make: userProfile.v1_make,
        model: userProfile.v1_model,
        color: userProfile.v1_color,
        licensePlate: userProfile.v1_plate
      });
      if(userProfile.vehicleInt===2){
        database.ref('UserAccounts/' + userProfile.userID + '/vehicles/v2').set({
          make: userProfile.v2_make,
          model: userProfile.v2_model,
          color: userProfile.v2_color,
          licensePlate: userProfile.v2_plate
        });
      }
    }
  }
  else{
    database.ref('UserAccounts/' + userProfile.userID + '/permit').set({
      purchaseDate: null,
      expDate: null,
      type: None
    });

    database.ref('UserAccounts/' + userProfile.userID + '/Vehicle').set({
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
  }

  console.log('Returning hash now');
  return hash;
}
