var express = require('express');
var uuid = require('uuid');
var router = express.Router();

var SPOTS_API_KEY = process.env.SPOTS_API_KEY;
console.log("Using SPOTS_API_KEY = %s", SPOTS_API_KEY)

router.post('/update/:key/:lotID/:spotID/:vacancy/:cardID?', (req, res, next) => {
  console.log(req.params);
  key = req.params.key;
  if(key != SPOTS_API_KEY) {
    res.status(401).send({error:"invalid key"});
    return;
  }

  if(req.params.cardID == '123456789') {
    res.send({authorized: true});
  } else {
    res.send({authorized: false});
  }
});

module.exports = router;
