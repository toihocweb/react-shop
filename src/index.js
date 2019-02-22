import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App.jsx';
import { BrowserRouter as Router, Switch, Route, withRouter, Redirect } from 'react-router-dom'
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
import Spinner from './components/Spinner/Spinner'
import Admin from './components/AdminArea/Admin'
import rootReducer from './reducers'
import Users from './components/AdminArea/Users';
import Services from './components/AdminArea/Services';

class Root extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.setUser(user)
            } else {
                this.props.clearUser()
                this.props.history.push('/login')
            }
        })
    }

    render() {
        return this.props.user.isLoading ? <Spinner /> :  (
            <React.Fragment>
                <Switch>
                    <Route exact component={App} path='/' />
                    <Route component={Register} path='/register' />
                    <Route component={Login} path='/login' />
                    <Route component={Admin} path='/admin' />)}/>
                    <Route component={Detail} path='/:id' />)}/>
                    <Switch>
                        <Route component={Users} path='/admin/users' />
                        <Route component={Services} path='/admin/services' />
                    </Switch>
                    {/* <Route component={Admin} path='/admin' />)}/> */}
                    <Redirect from='/admin' to='/admin/users' exact />
                    {/* <Redirect from="*" to="/login" /> */}
                </Switch>
            </React.Fragment>
        )
    }
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

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
