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
// import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import { clearUser, setUser } from './actions'
import firebase from 'firebase'
import Spinner from './components/Spinner/Spinner'
import Admin from './components/AdminArea/Admin'
import rootReducer from './reducers'
import Users from './components/AdminArea/Users';
import Services from './components/AdminArea/Services';
import Commit from './components/Commit/Commit';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-135446127-1');

ReactGA.pageview(window.location.pathname + window.location.search);
ReactGA.event({
    category: 'User',
    action: 'Sent message'
  });
class Root extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.setUser(user)
                this.props.history.push('/')
            } else {
                this.props.clearUser()
                this.props.history.push('/')
            }
        })
    }
    //   this.props.user.isLoading ? <Spinner /> : 
    render() {
        return this.props.user.isLoading ? <Spinner /> : (
            <React.Fragment>
                <Switch>
                    <Route exact component={App} path='/' />
                    <Route component={Register} path='/register' />
                    <Route component={Login} path='/login' />
                    <Route component={Admin} path='/admin' />)}/>
                    <Route component={Commit} path='/commit' />)}/>
                    <Route component={Detail} path='/:id' />)}/>
                    <Switch>
                        <Route component={Users} path='/admin/users' />
                        <Route component={Services} path='/admin/services' />
                    </Switch>
                </Switch>   
            </React.Fragment>
        )
    }
}

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

const mapStateFromProps = state => ({
    // isLoading: state.user.isLoading,
    user : state.user
})

const RootWithAuth = withRouter(connect(mapStateFromProps, { setUser, clearUser })(Root))

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
