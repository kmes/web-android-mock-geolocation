var net = require('net');

var host = '192.168.0.5';
var port = 5554;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/socket.io.js', function(req, res){
  res.sendfile('socket.io.js');
});

io.on('connection', function(socket) {
  console.log('socket connected');

  socket.on('location', function( location ) {
    console.log('receive location', location);

    var connection = net.connect( port, host, function() {
      //console.log("Sending data");
      connection.write('geo fix '+location.lng+' '+location.lat+'\r\n');

      connection.on("data", function (data) {
        //console.log("received data");
        console.log( data.toString() );
        connection.end();
      })
    });
    connection.on("error", function(err) {
      console.log("Error");
      console.log(err);
    });

  });
  socket.on('addressPort', function( data ) {
    host = data.address;
    port = data.port;
  });
  socket.on('disconnect', function(){
    console.log('socket disconnected');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});






