import React, { Component } from 'react'
import './Detail.css'
import { Input, Icon } from 'semantic-ui-react';
import Navbar from '../Header/Navbar';
import firebase from '../../firebase'
class Detail extends Component {

    state = {
        productRef : firebase.database().ref('products'),
        name : '',
        photoUrl : ''
    }


    componentDidMount() {
        const idProduct = this.props.match.params.id
        this.getProductInfo(idProduct)
        

    }

    getProductInfo = (id) => {
         this.state.productRef.child(id).on('value' , snap => {
             let info = snap.val()
           this.setState({
            name : info.name,
            photoUrl : info.photoUrl,
            description : info.description
           })
        })
    }
    
    render() {
        const { name , photoUrl, description } = this.state
        return (
            <React.Fragment>
                <div className="container">
                    <Navbar />
                    <div className="detail-area">
                    <div className="detail-top">
                            <p><img src={photoUrl} alt="img" /></p>
                            <div className="detail-info">
                                <h1>{name}</h1>
                                <Input placeholder='Username'  className='detail-user' />
                                <Input placeholder='Password' />
                            </div>
                        </div>
                        <div className="description">
                            <h2>Mô tả</h2>
                            <p>this is mota</p>
                        </div>
                    </div>
                </div>
              
            </React.Fragment>

        )
    }
}

export default Detail
