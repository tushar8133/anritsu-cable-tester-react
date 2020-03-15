var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// var io = require('socket.io').listen(server);

app.use('/', express.static(__dirname + '/build'));
app.use('static', express.static(__dirname + '/build/static'));
// app.use('scripts', express.static(__dirname + '/scripts'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('comm', function(data) {
    var command = data.command;
    var query = data.query;
    console.log('data received from client', command, query);
    io.emit('comm', JSON.stringify(['aaaa', 'bbbb', 'cccc']));
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

});

// io.on('connect', function(socket) {
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

// io.on('connection',function(_socket) {
// 	socket = _socket;
// });

// socket.on('command', function(dataObj) {
//     var deviceList = sendSCPI(dataObj.addr, dataObj.cmd);
//     deviceList.then(function(res){
//         console.log(res);
//         io.emit('command-success', res);
//     })
// });

http.listen(3000, function(){
  console.log('listening on *:3000');
});