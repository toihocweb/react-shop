import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { GridLoader } from 'react-spinners'
import SweetAlert from 'sweetalert-react'; // eslint-disable-line import/no-extraneous-dependencies
import 'sweetalert/dist/sweetalert.css';

class Item extends Component {

    _isMounted = false

    state = {
        isItemLoading: true,
        show: false,
        name: '',
        price: '',
        exprire: ''
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(() => {
            if (this._isMounted) {
                this.setState({
                    isItemLoading: false
                })
            }
        }, 1000)
    }

    componentWillUnmount() {
        this._isMounted = false
    }



    hiddenAlert = () => {
        this.setState({
            show: false
        })
    }

    handleShow = (name, price) => () => {
        this.setState({
            show: true,
            name,
            price
        })
    }

    renderProducts = () => {
        return _.map(this.props.list, (product, key) => {
            const newList = product.name.toLowerCase().includes(this.props.searchTerm.toLowerCase()) ? product : null
            if (newList !== null) {
                return (
                    <div className={newList.price === '-1' ? "item updading" : "item"} key={key}>
                        <Link to={`/${key}`}><img src={newList.photoUrl} alt="" /></Link>
                        <div className="info-account">
                            <h1 className="ttl"><Link to={`/${key}`}>{newList.name}</Link></h1>
                            {Number.isInteger(newList.exprire) ? (
                                <span className="date">Hạn: {newList.exprire} tháng</span>
                            ) : (<span className="date">Hạn: {newList.exprire}</span>)}

                            <div className="acc-bot">
                                {newList.price !== '0' && (
                                    <a className="buy" onClick={this.handleShow(newList.name, newList.price)} >Mua !</a>
                                )}
                                <span className="price">Giá: {`${newList.price}k`}</span>
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
                <SweetAlert onEscapeKey={this.hiddenAlert} show={this.state.show} title="Thanh toán qua ví momo! tài khoản sẽ được gửi qua tin nhắn" text={`Sdt: 0356678519 || Nội dung: ${this.state.name.toLowerCase()} || Giá: ${this.state.price}k`} onConfirm={this.hiddenAlert} />
            </React.Fragment>
        )
    }
}




export default Item
