// import { * as io } from './socket.io.dev';
import io from 'socket.io-client';

var socket = io();

function connectMachine(cmd, data = '') {
	document.getElementById('spinner').style.display = 'block';

    socket.emit('comm', {command: cmd, query: data});
	
    return new Promise((resolve, reject) => {
        socket.on('comm', function(resp) {
        	setTimeout( _ => {
	            resolve(JSON.parse(resp));
				document.getElementById('spinner').style.display = 'none';
        	}, 1000)
        });
    });
}

export default connectMachine;
