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
            <label>Output Power Level (dBm): <input type="number" defaultValue="43" min="20" max="46" id="outputPowerLevel" onInput={evt => this.savePower(evt.target.value)} /></label>
            <label>Test Duration (sec): <input type="number" defaultValue="30" min="1" max="600" id="testDuration" onInput={evt => this.saveDuration(evt.target.value)} /></label>
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
            }, 200);
        }
    }

    sendCommandToDevice() {
        var elem = document.getElementById('scanner');
        elem.disabled = true;
        elem.removeAttribute("class", "backgroundAnimated");
        var qrcode = elem.value;

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

    savePower(val) {
        localStorage.setItem('power', val);
    }

    saveDuration(val) {
        localStorage.setItem('duration', val);
    }

    componentDidMount() {
        var power = localStorage.getItem('power');
        if (power) document.getElementById('outputPowerLevel').value = power;

        var duration = localStorage.getItem('duration');
        if (duration) document.getElementById('testDuration').value = duration;
    }

}

export default Autotest;
