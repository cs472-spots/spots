var express = require('express');
var uuid = require('uuid');
var router = express.Router();
var database = require("../src/database");

var SPOTS_API_KEY = process.env.SPOTS_API_KEY;
console.log("Using SPOTS_API_KEY = %s", SPOTS_API_KEY)

/*
  PUT: used for updating database if spot is vacant or taken
*/
router.post('/update/:key/:lotID/:spotID/:vacant?', (req, res, next) => {
  console.log(req.params);
  var spot = database.ref('/Spots/' + req.params.lotID + '/' + req.params.spotID);

  //Check if API key is valid
  key = req.params.key;
  if(key != SPOTS_API_KEY) {
    res.status(401).send({error:"invalid key"});
    return;
  }

  //Check if spot is vacant or occupied
  if(req.params.vacant == 'true'){
    //Update Firebase
    spot.update({
      occupant: null,
      authorized: null,
      vacancy: true
    }, syncStatus);

    res.send({authorized: null});
    //Notify all Mobile Users
    //no response expected from hardware -- hw just turns green
  }else{
    //if occupied, immediately update database of vacancy
    spot.update({
      occupant: "Unknown",
      vacancy: false,
      authorized: false
    });

    res.send({authorized: false});

    //Notfiy all Mobile Users
    //no response expected from hardware -- hw just turns red
  }
});

/*
  POST: used for swiping in
*/
router.post('/swipe/:key/:lotID/:spotID/:cardID?', (req, res, next) => {
  console.log(req.params);
  var spot = database.ref('/Spots/' + req.params.lotID + '/' + req.params.spotID);

  //Check if API key is valid
  key = req.params.key;
  if(key != SPOTS_API_KEY) {
    res.status(401).send({error:"invalid key"});
    return;
  }

  //notify mobile app of occupied spot

  //Check if authorized
  var ucardID = parseInt(req.params.cardID);

  //Check if occupant exists in the system
  var ref = database.ref('/UserAccounts');
  var user = ref.orderByChild('cardID')
                .equalTo(ucardID)
                .on('value', function(snapshot) {
    var cardHolder;
    for(var prop in snapshot.val()) {
      cardHolder = prop;
    }
    ref.off('value', user);

    //if occupant exists
    if(snapshot.val()!=null){
      console.log('User is:' + cardHolder);

      //Check if parking types match
      var parkType, upermitType;

      spot.once('value', function(psnapshot){
        console.log('Parking Type: ' + psnapshot.val().type);

        var u = database.ref('/UserAccounts/' + cardHolder + '/permit');
        u.once('value', function(usnapshot){
          console.log('User Permit type:' + usnapshot.val().type);

          if(psnapshot.val().type===usnapshot.val().type){
            //if same type
            console.log('Types match.');
            spot.update({
              authorized: true,
              occupant: parseInt(cardHolder)
            });
            res.send({authorized: true});
          }
          else{
            //if types don't match
            console.log('Types do not match.');
            spot.update({
              authorized: false,
              occupant: parseInt(cardHolder)
            });
            res.send({authorized: false});
          }
        });
      });
    }else if(snapshot.val()==null){
      //if card doesn't exist in database
      console.log(req.params.cardID + ' does not have a user');
      spot.update({
        authorized: false,
        cardID: ucardID,
        occupant: "Unknown"
      });
      res.send({authorized: false});
    }
  });
});

var syncStatus = function(error){
  if(error){
    console.log ('Synchronization failed.')
  }else{
    console.log ('Synchronization success.')};
}

module.exports = router;
