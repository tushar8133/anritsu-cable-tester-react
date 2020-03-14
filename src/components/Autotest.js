import React from 'react';
import AutotestTable from './AutotestTable';
import Service from '../Service'

class Autotest extends React.Component {
    debounceRunning = true;

    constructor(props) {
        super(props);
        this.state = {
            newData: {}
        };
    }

    render() {
        return (<main id="autotest">
            <label>Output Power Level (dBm): <input type="number" id="outputPowerLevel" onInput={this.savePower} disabled={true}/></label>
            <label>Test Duration (sec): <input type="number" id="testDuration" onInput={this.saveDuration} /></label>
            <br />
            <input type="text" id="scanner" placeholder="Place scanner here" onInput={this.detectQR.bind(this)} className="backgroundAnimated" autoComplete="off" />
            <AutotestTable addon={this.state.newData} />
            <br />
        </main>);
    }

    detectQR() {
        if (this.debounceRunning) {
            this.debounceRunning = false;
            setTimeout(_ => {
                this.debounceRunning = true;
                this.sendCommandToDevice();
            }, 50);
        }
    }

    sendCommandToDevice() {
        var elem = document.getElementById('scanner');
        var qrcode = elem.value;
        if(!qrcode) return;
        elem.disabled = true;
        elem.removeAttribute("class", "backgroundAnimated");

        var power = document.getElementById('outputPowerLevel').value;
        var duration = document.getElementById('testDuration').value;
        var service = new Service();
        service.autoTest(power, duration).then(peakDataResp => {
            this.formatFinalData(qrcode, peakDataResp, power, duration);
            elem.disabled = false;
            elem.setAttribute("class", "backgroundAnimated");
            elem.value = '';
            elem.focus();
        });
    }

    formatFinalData(qrcode, peakData, power, duration) {
        var [dBm, dBc] = this.formatPeakData(peakData);
        var timestamp = this.formatDate();

        var currentData = { qrcode, power, duration, dBm, dBc, timestamp };

        this.setState(prevState => ({
            newData: currentData
        }));
    }

    formatPeakData(data) {
        var arr = data.split(",");
        arr[0] = ' ' + arr[0] + ' dBc';
        arr[1] = arr[1] + ' dBm';
        arr.reverse();
        var final = arr.join();
        return final;
    }

    formatDate() {
        var dt = new Date();
        return (`${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`);
    }

    savePower(evt) {
        if(evt) {
            if(evt.target.value < 20) evt.target.value = 20;
            if(evt.target.value > 46) evt.target.value = 46;
            localStorage.setItem('power', evt.target.value);
        } else {
            var power = 43;
            try {
                var local = JSON.parse(localStorage.getItem('power'));
                if(local) power = local;
            } catch (e) {
                console.log(e);
            } finally {
                document.getElementById('outputPowerLevel').value = power;
                localStorage.setItem('power', power);
            }
        }
    }

    saveDuration(evt) {
        if(evt) {
            if(evt.target.value < 1) evt.target.value = 1;
            if(evt.target.value > 600) evt.target.value = 600;
            localStorage.setItem('duration', evt.target.value);
        } else {
            var duration = 30;
            try {
                var local = JSON.parse(localStorage.getItem('duration'));
                if(local) duration = local;
            } catch (e) {
                console.log(e);
            } finally {
                document.getElementById('testDuration').value = duration;
                localStorage.setItem('duration', duration);
            }
        }
    }

    componentDidMount() {
        this.savePower();
        this.saveDuration();
    }

}

export default Autotest;
