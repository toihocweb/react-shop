import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { GridLoader } from 'react-spinners'

class Item extends Component {

    _isMounted = false

    state = {
        isItemLoading: true
    }

    componentDidMount() {
        this._isMounted = true
            setTimeout(() => {
                if(this._isMounted){
                    this.setState({
                        isItemLoading: false
                    })
                }
            }, 1000)
        }

    componentWillUnmount() {
       this._isMounted = false
    }


    renderProducts = () => {
        return _.map(this.props.list, (product, key) => {
            const newList = product.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()) ? product : null
            if (newList !== null) {
                return (
                    <div className="item" key={key}>
                        <Link to={`/${key}`}><img src={newList.photoUrl} alt="" /></Link>
                        <div className="info-account">
                            <h1 className="ttl"><Link to={`/${key}`}>{newList.name}</Link></h1>
                            <span className="date">Hạn: lifetime</span>
                            <div className="acc-bot">
                                <Link className="buy" to={`/${key}`} >Get it !</Link>
                                <span className="price">Giá: {`${newList.price}$`}</span>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return false
            }
        })
    }

    render() {
        return this.state.isItemLoading ? <GridLoader className='loader' color='#4CAF50' size={25} margin="3px" /> : (
            <React.Fragment>
                {this.renderProducts()}
            </React.Fragment>
        )
    }
}




export default Item
