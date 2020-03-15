import connectMachine from './main';

class Service {

    address;
    constructor() {
        this.address = localStorage.getItem('address');
        document.getElementById('spinner').style.display = 'block';
        // if(this.address === "" || this.address === null) {
        //     alert("Please connect device!");
        //     return false;
        // }
    }

    getDeviceLists() {
        return new Promise((resolve, reject) => {

            connectMachine('this is data generated from client and send to server').then((data) => {
                var final = JSON.parse(data);
                console.log(final);
                resolve(final);
            });

            // socket.emit('command', 'test data...');

            // socket.on('device-list', function(data){
            //     var select = document.getElementById("allDevices");
            //     select.innerHTML = "";
            //     for(var i = 0; i < data.length; i++) {
            //         var option = document.createElement('option');
            //         option.text = option.value = data[i];
            //         select.add(option, 0);
            //     }
            // });

            // setTimeout(_ => {
            //     document.getElementById('spinner').style.display = 'none';
            //     resolve(['aaa', 'bbb', 'ccc']);
            // }, 2000);
        });
    }

    sendCommand(cmd) {
        return new Promise((resolve, reject) => {
            setTimeout(_ => {
                document.getElementById('spinner').style.display = 'none';
                resolve(cmd + ' with success response from machine...');
            }, 500);
        });
    }

    autoTest(power, duration) {
        return new Promise((resolve, reject) => {
            setTimeout(_ => {
                document.getElementById('spinner').style.display = 'none';
                resolve('auto response from machine...');
            }, 1000);
        });
    }

}

export default Service;