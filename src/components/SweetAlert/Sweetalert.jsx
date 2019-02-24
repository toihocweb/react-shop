import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';


class Sweetalert extends Component {

    state = {
        show : true
    }

    componentDidMount() {
        window.addEventListener('popstate', this.hiddenAlert);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.hiddenAlert);
    }

    hiddenAlert = () => {
        this.setState({ show: false });
    };


    render() {
        const { show } = this.state
        return (
            <div>
                <SweetAlert
                    show={show}
                    title="Demo"
                    text="SweetAlert in React"
                    onConfirm={this.hiddenAlert}
                />
            </div>
        );
    }
}


export default Sweetalert;