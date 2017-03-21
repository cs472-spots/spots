var ServiceAccount = require("../firebase-private-key.js");
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
  databaseURL: "https://spots-cba38.firebaseio.com"
});

module.exports = admin.database()
