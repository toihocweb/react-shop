import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class Item extends Component {
    render() {
        return (
            <div className="item">
                <Link to=''><img src="/assets/img/netflix.png" alt=""/></Link>
                <div className="info-account">
                    <h1 className="ttl"><Link to=''>Netflix</Link></h1>
                    <span className="date">Hạn: 1/1/2020</span>
                    <div className="acc-bot">
                        <button className="buy">Mua</button>
                        <span className="stock">Còn lại: 5</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item
