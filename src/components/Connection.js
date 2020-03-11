import React from 'react';
import Service from '../Service';

class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: []
        };
    }

    componentDidMount() {
        this.getDeviceList();
    }

    render() {

        if (this.state.addresses.length === 0) {
            return <h3>Loading...</h3>
        } else return (
            <main id='connection-page'>
                {
                    this.state.addresses.map((value, index) => (
                        <div key={value}><input type="radio" id={'rad' + (index + 1)} name='addrs' onInput={_ => this.radioHandler(value)} /><label htmlFor={'rad' + (index + 1)}>{value}</label></div>
                    ))
                }
            </main>
        )
    }

    getDeviceList() {
        var service = new Service();
        service.getDeviceLists().then(_ => {
            this.setState(state => ({ addresses: _ }));
            this.selectDefaultOption(_[0]);
        });
    }

    radioHandler(val) {
        console.log(val);
        localStorage.setItem("address", val);
    }

    selectDefaultOption(val) {
        document.getElementById('rad1').checked = true;
        this.radioHandler(val);
    }
}

export default Connection;
