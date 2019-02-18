import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App.jsx';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import 'semantic-ui-css/semantic.min.css'
import Detail from './components/Detail/Detail';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import { clearUser, setUser } from './actions'
import firebase from 'firebase'
class Root extends React.Component {

    componentDidMount () {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.props.setUser(user)
                this.props.history.push('/')
            }else{
                this.props.clearUser()
                this.props.history.push('/login')
            }
        })
    }

    render() {
        return (
            <React.Fragment>
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

const store = createStore(composeWithDevTools(applyMiddleware(thunk)))

const RootWithAuth = withRouter(connect(null, { setUser, clearUser })(Root))

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth />
        </Router>
    </Provider>

    , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

if (module.hot) {
    module.hot.accept()
}


serviceWorker.unregister();
