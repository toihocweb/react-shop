import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class Item extends Component {

    renderProducts = () => {
        return _.map(this.props.list, (product, key) => {
            const newList =  product.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()) ? product : null
                if (newList !== null){
                    return (
                        <div className="item" key={key}>
                            <Link to={`/${key}`}><img src={newList.photoUrl} alt="" /></Link>
                            <div className="info-account">
                                <h1 className="ttl"><Link to={`/${key}`}>{newList.name}</Link></h1>
                                <span className="date">Hạn: lifetime</span>
                                <div className="acc-bot">
                                    <button className="buy">Get it !</button>
                                    <span className="price">Giá: {`${newList.price}$`}</span>
                                </div>
                            </div>
                        </div>
                    )
                }else{
                     return false
                }
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.renderProducts()}
            </React.Fragment>
        )
    }
}




export default Item
