var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var database = require("./src/database");
var logger = require("./src/logger");
var spotsHW = require("./routes/spotsHW");
//var spotsMobile = require('./routes/spotsMobile');
//var parks = require("./park/parking");
var Enum = require('enum');

var permitType = new Enum(['none', 'Student', 'Faculty']);
var None = permitType.get(1);
var Student = permitType.get(2);
var Faculty = permitType.get(3);

app.set('port', (process.env.PORT || 5000));
app.use(express.static('frontend/build'));

// REST API connector
app.use('/spotsHW', spotsHW);

// Parking Page
//app.use('/parkingSpots', parks);
//app.use('/Mobile, spotsMobile');

//home

app.get('/', function(request, response) {
  response.send(fs.readFileSync('index.html', {encoding: 'utf8'}));
  logger("responded to client");
});


io.on('connection', (socket) => {
  logger("Client connected - " + socket.id);

  socket.on('client', (data, response) => {
    var userProfile = data;
    switch(data.client){
      case 'Admin':
        //Receive JSON Object
        logger("Received the following data from admin: \n");
        logger(data);

        switch(data.flag){
          case 'delete':
            deleteUser(userProfile.userID);
            break;
          case 'register':
            registerUser(userProfile);
            break;
          case 'viewUser':
            viewUser(userProfile.userID);
            break;
          case 'get-spots':
            console.log("LOOKING FOR THE SPOTS!!!");
            var spotsRef = database.ref('Spots/LB');
            spotsRef.once('value', (snapshot) => {
              const spots = snapshot.val();
              console.log(spots);
              response(spots);
            })
        }
        break;
      case 'Mobile':
        //Receive JSON Object
        logger("Received the following data from mobile: \n");
        logger(data);

        switch(data.flag){
          case 'delete':
            deleteUser(userProfile.userID);
            break;
          case 'register':
            registerUser(userProfile);
            break;
          case 'viewUser':
            viewUser(userProfile.userID);
            break;
        }

        break;
    }
  });

  //Reply to application after receiving hello message
  socket.on('hello', (msg)=> {
      logger("Message received: " + msg);
      socket.emit('reply', "hello from the server side");
  });
});

server.listen(app.get('port'), function() {
  logger("Spots server is running on port " + app.get('port'));
});

//--------------------------------------------------------------------------------------------
//Functions
//--------------------------------------------------------------------------------------------

//Registers User to database
//Paramters: (int, string, string, string, int, boolean, boolean, string?, permitType,
//  string?, string?, string?, string?)
function registerUser(userProfile){
  var userIDRef = database.ref('UserAccounts/' + userProfile.userID);

/*
  //logger('Password passed to registerUser() is: ' + userProfile.password);
  //Hash password for security
  var passwd = hashFunction(userProfile.password);
  logger('Hash successfully returned: ' + passwd);

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
*/
  userIDRef.set({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    userEmail: userProfile.email,
    phone: userProfile.phone,
    cardID: userProfile.cardID,
    permit: userProfile.gotPermit
  });

  if(userProfile.gotPermit===true){
    database.ref('UserAccounts/' + userProfile.userID + '/permit').set({
      purchaseDate: userProfile.purchaseDate,
      expDate: userProfile.expDate,
      type: userProfile.permitType
    });

    logger('Number of vehicles: ' + userProfile.vehicleInt);
    if(userProfile.vehicleInt<=2){
      database.ref('UserAccounts/' + userProfile.userID + '/vehicles/vehicle1').set({
        //year: userProfile.v1_year,
        make: userProfile.v1_make,
        model: userProfile.v1_model,
        color: userProfile.v1_color,
        year: userProfile.v1_year,
        licensePlate: userProfile.v1_plate
      });
      if(userProfile.vehicleInt===2){
        database.ref('UserAccounts/' + userProfile.userID + '/vehicles/vehicle2').set({
          //year: userProfile.v2_year,
          make: userProfile.v2_make,
          model: userProfile.v2_model,
          color: userProfile.v2_color,
          year: userProfile.v2_year,
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
  logger('password is: ' + password + '\n');
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

  logger('Returning hash now');
  return hash;
}

//Deletes a user
//Parameters(int)
function deleteUser(userID){
  logger('Deleting the following user: ' + userID);
  var user = database.ref('UserAccounts/' + userID);
  user.remove();

 var userCred = database.ref('UserLogin/' + userID);
  userCred.remove();
}

//Views a user's account
//Parameters(int)
function viewUser(userID){
  logger('Viewing the following user: ' + userID);

  database.ref('UserAccounts/' + userID).once('value', function(snapshot){
    logger(snapshot.val());
    if(snapshot.val()===null)
      io.emit('userInfo', 'Error. User does not exist.');
    else{
      var userInfo = {
        //username: snapshot.val().username,
        userID: userID,
        firstName: snapshot.val().firstName,
        lastName: snapshot.val().lastName,
        email: snapshot.val().userEmail,
        phone: snapshot.val().phone,
        cardid: snapshot.val().cardID
      };

      if(snapshot.val().permit != null){
        userInfo.permitType = snapshot.val().permit.type;
        userInfo.purchaseDate = snapshot.val().permit.purchaseDate;
        userInfo.expDate = snapshot.val().permit.expDate;

        if(snapshot.val().vehicles !=null){
          //userInfo.v1_year = snapshot.val().vehicles.v1.year;
          userInfo.v1_make = snapshot.val().vehicles.vehicle1.make;
          userInfo.v1_model = snapshot.val().vehicles.vehicle1.model;
          userInfo.v1_color = snapshot.val().vehicles.vehicle1.color;
          userInfo.v1_plate = snapshot.val().vehicles.vehicle1.licensePlate;

          if(snapshot.val().vehicles.vehicle2 !=null){
            //userInfo.v2_year = snapshot.val().vehicles.v2.year;
            userInfo.v2_make = snapshot.val().vehicles.vehicle2.make;
            userInfo.v2_model = snapshot.val().vehicles.vehicle2.model;
            userInfo.v2_color = snapshot.val().vehicles.vehicle2.color;
            userInfo.v2_plate = snapshot.val().vehicles.vehicle2.licensePlate;
          }
        }
      }
    }

    logger(userInfo);
    io.emit('userInfo', userInfo);
  });
}
