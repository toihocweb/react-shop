import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Item extends Component {

    render() {
        const { dichvus, apiURL } = this.props
        return (
            <React.Fragment>
                {dichvus.map(item => (
                    <div className="item" key={item._id}>
                        <Link to={`/${item._id}`}><img src={`${apiURL}${item.image.url}`} alt="" /></Link>
                        <div className="info-account">
                            <h1 className="ttl"><Link to={`/${item._id}`}>{item.name}</Link></h1>
                            <span className="date">Hạn: {item.expired}</span>
                            <div className="acc-bot">
                                <button className="buy">Mua</button>
                                <span className="stock">Còn lại: {item.stock}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </React.Fragment>
        )
    }
}

export default Item;
