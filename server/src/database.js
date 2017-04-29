var ServiceAccount = require("../firebase-private-key.js");
var admin = require("firebase-admin");

function getFbURL() {
  return "https://" + process.env.FIREBASE_PROJECT_ID + ".firebaseio.com";
}

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
  databaseURL: getFbURL()
});

module.exports = admin.database()
