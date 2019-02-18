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
            <header className="f-between">
                <div className="logo">
                    <h1><Link to='/'>FindUr<span>Account</span></Link></h1>
                </div>
                <div className="nav">
                    <ul className="f-between">
                        <Dropdown text='Welcome!'>
                            <Dropdown.Menu>
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
