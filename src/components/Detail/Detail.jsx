import React, { Component } from 'react'
import './Detail.css'
import { Header } from '../../../node_modules/semantic-ui-react';

class Detail extends Component {

    state = {
        dichvu: '',
        details: []
    }


    componentDidMount() {
    }

    render() {



        return (
            <React.Fragment>
                {this.state.details.map(detail => (
                    <div className="detail-area">
                        <div className="container">
                            <div className="top-detail flex">
                                <div className="main-image">
                                    <p><img src="" alt="" /></p>
                                </div>
                                <div className="main-info">
                                    <Header as='h1' color='green' content={this.state.dichvu.name} />
                                    <h4>Còn lại: {this.state.dichvu.stock}</h4>
                                    <h4>Thời hạn: {this.state.dichvu.expired}</h4>
                                    <h2>Giá : {detail.price} VNĐ</h2>
                                </div>
                            </div>
                            <div className="description">
                                <Header as='h3' color='green' icon='idea' content='Giới thiệu' />
                                <p>{detail.description}</p>
                            </div>
                        </div>
                    </div>
                ))}


            </React.Fragment>
        )
    }
}

export default Detail
