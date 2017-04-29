var ServiceAccount = require("../firebase-private-key.js");
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
  databaseURL: "https://spotsdn.firebaseio.com/"
});

module.exports = admin.database()
