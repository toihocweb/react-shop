import React, { Component } from 'react'
import './Detail.css'
import { Input, Button } from 'semantic-ui-react';
import Navbar from '../Header/Navbar';
import firebase from '../../firebase'
import uniqueRandom from 'unique-random'

class Detail extends Component {
    _isMounted = false
    state = {
        productRef: firebase.database().ref('products'),
        name: '',
        photoUrl: '',
        users: [],
        user: '',
        pass: ''
    }

    componentDidMount() {
        this._isMounted = true
        if (this._isMounted) {
            const idProduct = this.props.match.params.id
            this.getProductInfo(idProduct)
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    getProductInfo = (id) => {
        this.state.productRef.child(id).on('value', snap => {
            let info = snap.val()
            this.setState({
                name: info.name,
                photoUrl: info.photoUrl,
                description: info.description,
                users: info.users,
            })
        })
    }

    handleRandom = () => {
        if (this.state.users) {
            let rd = uniqueRandom(0, this.state.users.length - 1)()
            this.setState({
                user: this.state.users[rd].user,
                pass: this.state.users[rd].pass
            })
        }
    }

    render() {
        const { name, photoUrl, description, users, user, pass } = this.state
        return (
            <React.Fragment>
                <div className="container">
                    <Navbar />
                    <div className="detail-area">
                        <div className="detail-top">
                            <p><img src={photoUrl} alt="img" /></p>
                            <div className="detail-info">
                                <h1>{name} <Button content={users ? `Số lượng: ${users.length}` : `Số lượng: 0`} color='teal' /></h1>
                                <Input icon='user' iconPosition='left' placeholder='Username' className='detail-user' value={user} />
                                <Input icon='lock' iconPosition='left' placeholder='Password' value={pass} />
                                <Button color='red' className='random' content='Random' onClick={this.handleRandom} />
                            </div>
                        </div>
                        <div className="description">
                            <h2>Mô tả</h2>
                            <div dangerouslySetInnerHTML={{ __html: description }}></div>
                        </div>
                    </div>
                </div>

            </React.Fragment>

        )
    }
}

export default Detail
