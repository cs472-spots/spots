//link to file to use require

require(['requirejs'], function (requirejs){
});
/*var requirejs = require("requirejs");*/

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(['foo', 'bar'],
function (foo, bar) {
    //foo and bar are loaded according to requirejs
    //config, but if not found, then node's require
    //is used to load the module.
});

//log-in info for firebase
/*var admin = require("firebase-admin");*/
require(['firebase-admin'], function (firebase-admin){});


var serviceAccount = require("./spots-e1ba0ab9e7a4.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://spots-cba38.firebaseio.com"

});

var db = admin.database();
var ref=db.ref("UserAccounts"); //where to store info



//get input from html page

function test(evt)
{
    var nshe = $('#nshe_num').text();
    var usersRef = ref.child("Student");
    usersRef.set({ NSHE: nshe, Email: "sup1@yahoo.com"
    });
    evt.preventDefault();
    console.log(nshe); //check it
}
if(typeof window !== 'undefined')
{
var submit = Document.getElementsByTagName('submit')[0];
submit.onclick = test;
}


/*
var usersRef= ref.child("Student"); //command to save info
usersRef.set({
    1000122: {
	Email: "Sup@yahoo.com"
    }
});
*/

