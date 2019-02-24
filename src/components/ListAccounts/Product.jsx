import React, { Component } from 'react'
import Item from './Item';
import { Input } from 'semantic-ui-react'
import { getProducts } from '../../actions'
import { connect } from 'react-redux'

class Product extends Component {

    state = {
        searchTerm: '',
        isLoading: false,
        dichvus: []
    }


    handleChange = (e) => {
        this.setState({
            searchTerm: e.target.value,
            isLoading: true
        })
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 500);
    }


    filterBrands = ( searchTerm, dichvus ) => {
        return dichvus.filter(brand => {
            return brand.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }

     componentDidMount() {

            this.props.getProducts()
        
    }

    componentWillUnmount(){
        this.setState({
            isLoading : false
        }) 
    }

    render() {
        return (
            <div className="content">
                <div className="title f-between">
                    <h2 className='dsss'>Danh Sách ...</h2>
                    <marquee>Tài khoản giá rẻ, xài thả ga, uy tín 100%, Thông tin liên hệ: <a className='contact' target='_blank' href="https://www.facebook.com/Cheatsomething">My Facebook</a> </marquee>
                    <Input size='tiny' icon='search' loading={this.state.isLoading} placeholder='Search...' value={this.state.searchTerm} onChange={this.handleChange} />
                </div>
                <div className="list-accounts">
                    <Item list={this.props.product.productList} searchTerm={this.state.searchTerm}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    product: state.product
})


export default (connect(mapStateToProps, { getProducts })(Product))