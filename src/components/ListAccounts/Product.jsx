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
                    <h2>Danh Sách Tài Khoản ...</h2>
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