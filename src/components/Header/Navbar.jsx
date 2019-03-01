import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Dropdown ,Label} from 'semantic-ui-react'
import firebase from '../../firebase'
import './Navbar.css'
import { connect } from 'react-redux'

class Navbar extends Component {

    handleLogout = () => {
        firebase.auth().signOut()
    }

    render() {
        return (
            <header className="f-between">
                <div className="logo">
                    <h1><Link to='/'>Nick <span>Gía Rẻ</span></Link></h1>
                </div>
                {this.props.user.currentUser !== null ? (
                    <div className="nav">
                        <ul className="f-between">
                            <Dropdown text={`Welcome ${this.props.user.currentUser.displayName}`} >
                                <Dropdown.Menu>
                                    {this.props.user.isAdmin &&
                                        (<Dropdown.Item text='Admin' onClick={() => { this.props.history.push('/admin') }} />)
                                    }
                                    <Dropdown.Item text='Đăng xuất' onClick={this.handleLogout} />
                                </Dropdown.Menu>
                            </Dropdown>
                        </ul>
                    </div>
                ) : ( 
                        this.props.match.url === '/login' ? <Link to='/register'> Đăng kí </Link> : <Link to='/login'> Đăng nhập </Link>
                    )}

            </header >
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})


export default withRouter(connect(mapStateToProps, null)(Navbar))
