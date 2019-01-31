import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import firebase from '../../firebase'
import './Navbar.css'
class Navbar extends Component {

    handleLogout = () => {
        firebase.auth().signOut()
    }
    render() {

        return (
            <header class="f-between">
                <div class="logo">
                    <h1><Link to='/'>FindUr<span>Account</span></Link></h1>
                </div>
                <div class="nav">
                    <ul class="f-between">
                        <li><NavLink to='/login'>Login</NavLink></li>
                        <li><NavLink to='/register'>Register</NavLink></li>
                        <Dropdown text='Welcome, nhatdaica055'>
                            <Dropdown.Menu>
                                <Dropdown.Item text='Tài khoản' as={Link} to='/register'/>
                                <Dropdown.Item text='Đăng xuất' onClick={this.handleLogout} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </ul>
                </div>
            </header >
        )
    }
}

export default Navbar
