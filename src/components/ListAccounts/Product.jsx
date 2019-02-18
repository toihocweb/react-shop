import React, { Component } from 'react'
import Item from './Item';
import { Input} from 'semantic-ui-react'
import { GridLoader } from 'react-spinners'  


class Product extends Component {
    state = {
        searchTerm: '',
        isLoading : false,
        dichvus: [],
        isItemLoading : false
    }

    handleChange = (e) => {
        this.setState({
            searchTerm : e.target.value,
            isLoading : true
        })
        setTimeout(() => {
            this.setState({
                isLoading : false
            })
        }, 500);
    }


    filterBrands = ({ searchTerm , dichvus}) => {
        return dichvus.filter(brand => {
            return brand.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }

    componentWillMount(){
        this.setState({isItemLoading : true})
    }

     componentDidMount() {
        
    }

    render() {
        return (
            <div className="content">
                <div className="title f-between">
                    <h1>Danh Sách Tài Khoản ...</h1>
                    <Input size='tiny' icon='search' loading={this.state.isLoading} placeholder='Search...' value={this.state.searchTerm} onChange={this.handleChange}/>
                </div>
                <div className="list-accounts">
                    {!this.state.isItemLoading ? <Item dichvus={this.filterBrands(this.state)}/> : <GridLoader className='loader' color='#4CAF50' size={25} margin="3px" />}
                </div>
            </div>
        )
    }
}

export default Product