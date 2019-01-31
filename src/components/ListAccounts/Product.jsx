import React, { Component } from 'react'
import Item from './Item';

class Product extends Component {
    render() {
        return (
            <div className="content">
                <div className="title">
                    <h1>Nhạc</h1>
                </div>
                <div className="list-accounts">
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </div>
            </div>
        )
    }
}

export default Product
