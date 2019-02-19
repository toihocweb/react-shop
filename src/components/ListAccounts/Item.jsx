import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class Item extends Component {





    renderProducts = () => {
        return _.map(this.props.list, (product, key) => {
            return (
                <div className="item" key={key}>
                    <Link to={`/${key}`}><img src={product.photoUrl} alt="" /></Link>
                    <div className="info-account">
                        <h1 className="ttl"><Link to={`/${key}`}>{product.name}</Link></h1>
                        <span className="date">Hạn: lifetime</span>
                        <div className="acc-bot">
                            <button className="buy">Lấy tk</button>
                            <span className="stock">Còn lại: 1</span>
                        </div>
                    </div>
                </div>
            )

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
