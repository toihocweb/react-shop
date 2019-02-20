import React, { Component } from 'react'
import './Detail.css'
import { Input, Icon, Button } from 'semantic-ui-react';
import Navbar from '../Header/Navbar';
import firebase from '../../firebase'
class Detail extends Component {

    state = {
        productRef: firebase.database().ref('products'),
        name: '',
        photoUrl: '',
        users: [],
        user : '',
        pass : ''
    }


    componentDidMount() {
        const idProduct = this.props.match.params.id
        this.getProductInfo(idProduct)

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
        this.setState({
            user : this.state.users[0].user,
            pass : this.state.users[0].pass
        })
    }

    render() {
        const { name, photoUrl, description, users,user,pass } = this.state
        return (
            <React.Fragment>
                <div className="container">
                    <Navbar />
                    <div className="detail-area">
                        <div className="detail-top">
                            <p><img src={photoUrl} alt="img" /></p>
                            <div className="detail-info">
                                <h1>{name}</h1>
                                <Input icon='user' iconPosition='left' placeholder='Username' className='detail-user' value={user} />
                                <Input icon='lock' iconPosition='left' placeholder='Password' value={pass} />
                                <Button className='random' content='Random' onClick={this.handleRandom}/>
                            </div>
                        </div>
                        <div className="description">
                            <h2>Mô tả</h2>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>

            </React.Fragment>

        )
    }
}

export default Detail
