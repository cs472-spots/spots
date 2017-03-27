var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.set('port', (process.env.PORT || 5000));
app.use(express.static('frontend/build'));

app.get('/', function(request, response) {
  response.send(fs.readFileSync('index.html', {encoding: 'utf8'}));
  console.log("responded to client")
});

io.on('connection',(socket)=>{
  console.log('Client connected -  ' + socket.id)
  //Receive messages from admin
  socket.on('Admin', (data)=> {
      //var content = fs.readFileSync(data,'utf8');
      console.log("Message received: " + data);
      socket.emit('reply', "hello from the server side");
  });
});


server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
