var express = require('express');
var router = express.Router();

var SPOTS_API_KEY = '1234';

router.post('/update/:key/:lotID/:spotID/:vacancy/:cardID', (req, res, next) => {
  key = req.params.key;
  console.log('CALLED with key = ' + key);
  console.log(req.params);
  if(key != SPOTS_API_KEY) {
    res.status(401).send({error:"invalid key"});
    return;
  }

  res.send({authorized: true});
});

module.exports = router;
