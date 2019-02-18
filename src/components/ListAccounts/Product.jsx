import React, { Component } from 'react'
import Item from './Item';
import { Input} from 'semantic-ui-react'
import Strapi from 'strapi-sdk-javascript/build/main'
import { GridLoader } from 'react-spinners'  

const apiURL = process.env.API_URL || "http://localhost:1337"
const strapi = new Strapi(apiURL)

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

    async componentDidMount() {
        try{
            const response = await strapi.request('POST', '/graphql', {
                data: {
                    query: `
                    query {
                        dichvus {
                          _id
                          name
                          description
                          expired
                          stock
                          image {
                            _id
                            mime
                            url
                          }
                        }
                      }
                     `
                }
            })
            this.setState({
                dichvus: response.data.dichvus,
                isItemLoading : false
            })
        }catch(err){
            // console.error(err)
            this.setState({isItemLoading : true})
        }
    }

    render() {
        return (
            <div className="content">
                <div className="title f-between">
                    <h1>Danh Sách Tài Khoản ...</h1>
                    <Input size='tiny' icon='search' loading={this.state.isLoading} placeholder='Search...' value={this.state.searchTerm} onChange={this.handleChange}/>
                </div>
                <div className="list-accounts">
                    {!this.state.isItemLoading ? <Item dichvus={this.filterBrands(this.state)} apiURL={apiURL}/> : <GridLoader className='loader' color='#4CAF50' size={25} margin="3px" />}
                </div>
            </div>
        )
    }
}

export default Product