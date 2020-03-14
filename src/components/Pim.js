import React from 'react';
import Service from '../Service';

class Pim extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <main id='pim-page'>
            	<label>Output Power Level (dBm): <input type="number" id="outputPowerLevel" onInput={this.savePower} /></label>
	            <label>Test Duration (sec): <input type="number" id="testDuration" onInput={this.saveDuration} /></label>
	            <br />
                <button onClick={_ => this.sendCommand('*ABC?')}>*ABC?</button>
                <button onClick={_ => this.sendCommand('*DEF?')}>*DEF?</button>
                <button onClick={_ => this.sendCommand('*XYZ?')}>*XYZ?</button>
                <span className="spacer" />
                <textarea id="textarea" rows="10" cols="60"></textarea>
            </main>
        )
    }

    sendCommand(cmd) {
        document.getElementById('textarea').value = 'Loading...';
        var service = new Service();
        service.sendCommand(cmd).then(_ => {
            this.setResponse(_);
        });
    }

    setResponse(resp) {
        document.getElementById('textarea').value = String(resp);
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

export default Pim;
