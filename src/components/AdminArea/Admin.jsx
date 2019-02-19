import React, { Component } from 'react'
import './Admin.css'
import { Header, List } from 'semantic-ui-react';
import { Switch, Route, NavLink } from 'react-router-dom'
import Users from './Users';
import Services from './Services';
import { connect } from 'react-redux'
import { getUsers } from '../../actions'
import firebase from '../../firebase'
class Admin extends Component {


    render() {
        return (
            <React.Fragment>
                <div className="ad">
                    <div className="sidebar">
                        <Header size='large' className='sb-header' icon='adn' content='Admin' color='green' />
                        <List divided inverted animated>
                            <List.Item>
                                <List.Icon name='users' />
                                <List.Content>
                                    <List.Header as={NavLink} to='/admin/users'>Users</List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='servicestack' />
                                <List.Content>
                                    <List.Header as={NavLink} to='/admin/services'>Services</List.Header>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='log out' />
                                <List.Content>
                                    <List.Header as='a'>Logout</List.Header>
                                </List.Content>
                            </List.Item>
                        </List>

                    </div>
                    <div className="ad-content">
                        <Switch>
                            <Route component={Users} path='/admin/users'/>
                            <Route component={Services} path='/admin/services' />
                        </Switch>
                    </div>
                </div>

            </React.Fragment>

        )
    }
}


export default Admin