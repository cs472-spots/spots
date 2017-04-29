var express = require('express');
var uuid = require('uuid');
var router = express.Router();
var database = require("../src/database");
var logger = require("../src/logger");

var SPOTS_API_KEY = process.env.SPOTS_API_KEY;
logger("Using SPOTS_API_KEY = " + SPOTS_API_KEY)

function handleApiKey(key, done) {
  var err;
  if(key != SPOTS_API_KEY) {
    logger("Invalid API key received.");
    err = new Error;
  }
  return done(err);
}

/*
  GET: retrieve users
*/
router.get('/getUsers/:key', (req, res, next) => {
  logger("getUsers called");
  handleApiKey(req.params.key, function(err) {
    if(err) {
      res.status(401).send({error:"invalid key"});
      return;
    }

    database.ref('/UserAccounts').once('value', function(data){
      var users = data.val();
      logger(users);
      res.send({Users: users});
    });
  })
});

router.get('/getVacancy/:key/:lotID/:spotID', (req, res, next) => {
  logger("getVacancy called");
  handleApiKey(req.params.key, function(err) {
    if(err) {
      res.status(401).send({error:"invalid key"});
      return;
    }

    database.ref('/Spots/' + req.params.lotID + '/' + req.params.spotID).once('value', function(data){
      var spotVacancy = data.val().vacancy;
      logger(req.params.spotID + ' vacancy is ' + spotVacancy);
      res.send({Vacancy: spotVacancy});
    });
  })
});


/*
  POST (update): used for updating database if spot is vacant or taken
*/
router.post('/update/:key/:lotID/:spotID/:vacant?', (req, res, next) => {
  logger(req.params);
  var spot = database.ref('/Spots/' + req.params.lotID + '/' + req.params.spotID);

  //Check if API key is valid
  key = req.params.key;
  if(key != SPOTS_API_KEY) {
    logger("Invalid API key received.");
    res.status(401).send({error:"invalid key"});
    return;
  }

  //Check if spot is vacant or occupied
  if(req.params.vacant == 'true'){
    //Update Firebase
    logger("Updating Firebase with a vacant spot.")
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
  POST (swipe): used for swiping in
*/
router.post('/swipe/:key/:lotID/:spotID/:cardID?', (req, res, next) => {
  logger(req.params);
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
      logger('User is:' + cardHolder);

      //Check if parking types match
      var parkType, upermitType;

      spot.once('value', function(psnapshot){
        logger('Parking Type: ' + psnapshot.val().type);

        var u = database.ref('/UserAccounts/' + cardHolder + '/permit');
        u.once('value', function(usnapshot){
          logger('User Permit type:' + usnapshot.val().type);

          if(psnapshot.val().type===usnapshot.val().type){
            //if same type
            logger('Types match.');
            spot.update({
              authorized: true,
              occupant: parseInt(cardHolder)
            });
            res.send({authorized: true});
          }
          else{
            //if types don't match
            logger('Types do not match.');
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
      logger(req.params.cardID + ' does not have a user');
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
    logger ('Synchronization failed.')
  }else{
    logger ('Synchronization success.')};
}

module.exports = router;
