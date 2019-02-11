import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App.jsx';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import 'semantic-ui-css/semantic.min.css'
import Navbar from './components/Header/Navbar';
import Detail from './components/Detail/Detail';
// import { connect } from 'react-redux'



class Root extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <Navbar />
                </div>
                <Switch>
                    <Route exact component={App} path='/' />
                    <Route component={Register} path='/register' />
                    <Route component={Login} path='/login' />
                    <Route component={Detail} path='/:id' />
                </Switch>
            </React.Fragment>
        )
    }
}



const RootWithAuth = withRouter(Root)

ReactDOM.render(
        <Router>
            <RootWithAuth />
        </Router>
    , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

if(module.hot){
    module.hot.accept()
}


serviceWorker.unregister();
