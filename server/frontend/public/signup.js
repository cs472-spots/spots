// Fetching HTML Elements in Variables by ID.
var x = document.getElementById("form_sample");
var createform = document.createElement('form'); // Create New Element Form
createform.setAttribute("action", ""); // Setting Action Attribute on Form
createform.setAttribute("method", "post"); // Setting Method Attribute on Form
x.appendChild(createform);

var heading = document.createElement('h2'); // Heading of Form
heading.innerHTML = "Contact Form ";
createform.appendChild(heading);

var line = document.createElement('hr'); // Giving Horizontal Row After Heading
createform.appendChild(line);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

//first name 
var fname = document.createElement('label'); // Create Label for Name Field
fname.innerHTML = "First Name : "; // Set Field Labels
createform.appendChild(fname);

var fninput = document.createElement('input'); // Create Input Field for Name
fninput.setAttribute("type", "text");
/*fninput.setAttribute("name", "dname");*/
createform.appendChild(fninput);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

//last name
var lname = document.createElement('label'); //create label
lname.innerHTML = "Last Name : ";
createform.appendChild(lname);


var linput= document.createElement('input'); // Create Input Field for Name
linput.setAttribute("type", "text");
createform.appendChild(linput);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

//email
var email = document.createElement('label'); //create label
email.innerHTML = "Email : ";
createform.appendChild(email);


var emailelement = document.createElement('input'); // Create Input Field for Name
emailelement.setAttribute("type", "text");
createform.appendChild(emailelement);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

//select permit type
var permit = document.createElement('label'); //create lable
permit.innerHTML = "Permit : ";
createform.appendChild(permit);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);


//phone number
var p_num = document.createElement('label'); //create label
p_num.innerHTML = "Phone Number : ";
createform.appendChild(p_num);


var p_num_input = document.createElement('input'); // Create Input Field for Name
p_num_input.setAttribute("type", "text");
createform.appendChild(p_num_input);


var linebreak = document.createElement('br');
createform.appendChild(linebreak);

//vehicle color
var vcolor = document.createElement('label'); //create label
vcolor.innerHTML = "Vehicle Color (i.e. blue,gray..) : ";
createform.appendChild(vcolor);


var vcolorinput = document.createElement('input'); // Create Input Field for Name
vcolorinput.setAttribute("type", "text");
createform.appendChild(vcolorinput);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);


//vehicle licensePlate
var vlic = document.createElement('label'); //create label
vlic.innerHTML = "Vehical License Plate : ";
createform.appendChild(vlic);


var vlicinput = document.createElement('input'); // Create Input Field for Name
vlicinput.setAttribute("type", "text");
createform.appendChild(vlicinput);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

//model
var model_make = document.createElement('label'); //create label
model_make.innerHTML = "Model (i.e. Toyota, Ford,..): ";
createform.appendChild(model_make);


var modelinput = document.createElement('input'); // Create Input Field for Name
modelinput.setAttribute("type", "text");
createform.appendChild(modelinput);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

//firebase section
var admin = require("firebase-admin");
var serviceAccount = require("./fb_credentials.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://spots-cba38.firebaseio.com/"
});



/*SAMPLE CODE by https://www.formget.com/javascript-contact-form/
var emaillabel = document.createElement('label'); // Create Label for E-mail Field
emaillabel.innerHTML = "Your Email : ";
createform.appendChild(emaillabel);

var emailelement = document.createElement('input'); // Create Input Field for E-mail
emailelement.setAttribute("type", "text");
emailelement.setAttribute("name", "demail");
createform.appendChild(emailelement);

var emailbreak = document.createElement('br');
createform.appendChild(emailbreak);

var messagelabel = document.createElement('label'); // Append Textarea
messagelabel.innerHTML = "Your Message : ";
createform.appendChild(messagelabel);

var texareaelement = document.createElement('textarea');
texareaelement.setAttribute("name", "dmessage");
createform.appendChild(texareaelement);

var messagebreak = document.createElement('br');
createform.appendChild(messagebreak);
*/

var submitelement = document.createElement('input'); // Append Submit Button
submitelement.setAttribute("type", "submit");
submitelement.setAttribute("name", "dsubmit");
submitelement.setAttribute("value", "Submit");
createform.appendChild(submitelement);
