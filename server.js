var express = require('express')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/build'));
app.use('static', express.static(__dirname + '/build/static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/build/index.html');
});

io.on('connection', function(socket) {
  console.log('>>> Socket Connected');

  socket.on('comm', function(data) {
    var address = data.address;
    var command = data.command;

    if(command === 'GET_DEVICE_LIST') {
      getDeviceList().then( resp => {
        console.log('Response >>> ', resp);
        io.emit('comm', JSON.stringify(resp));
      });
    } else {
      sendSCPI(address, command).then( resp => {
        console.log('Response >>> ', resp);
        io.emit('comm', JSON.stringify(resp));
      });
    }

  });

  socket.on('disconnect', function() {
    console.log('>>> Socket Disconnected');
  });

});

http.listen(3000, function(){
  console.log('>>> Server listening on *:3000');
});


/*================================================================*/

let status;
let sesn;

function getDeviceList(){
    return new Promise((resolve, reject) => {
      setTimeout( _ => {
        resolve(['abc', 'mno', 'xyz']);
      }, 1000);
    });
    /*return new Promise((resolve, reject) => {
        let mainAddress = [];
        [status, sesn] = visa.viOpenDefaultRM();
        visa.vhListResources(sesn).forEach(address => {
            try {
                mainAddress.push(address);
            } catch (err) {
                console.log('>>> ', err);
            } finally {
                return resolve(mainAddress);
            }
        });
      });*/
}

function sendSCPI(address, query){
    return new Promise((resolve, reject) => {
      setTimeout( _ => {
        resolve("Server: " + query);
      }, 1000);
    });
    /*return new Promise((resolve, reject) => {
        try {
            [status, vi] = visa.viOpen(sesn, address);
            resp = visa.vhQuery(vi, query);
            console.log('>>> ', resp.trim());
            return resolve(resp);
            visa.viClose(vi);
        } catch (err) {
            console.log('>>> ', err);
        } finally {
        }
      });*/
}
