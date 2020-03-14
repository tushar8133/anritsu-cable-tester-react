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
            setTimeout(_ => {
                document.getElementById('spinner').style.display = 'none';
                resolve(['aaa', 'bbb', 'ccc']);
            }, 2000);
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