var net = require('net');

var port = 5554;
var host = '192.168.0.5';

var connection = net.connect(port,host, function() {
    console.log("Sending data");
    connection.write("geo fix 45 9\r\n")

    connection.on("data", function (data) {
        console.log("received data");
        console.log( data.toString() );
        connection.end();
    })
});

connection.on("error", function(err) {
    console.log("Error");
    console.log(err);
});