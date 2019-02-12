import React, { Component } from 'react'
import Strapi from 'strapi-sdk-javascript/build/main'
import './Detail.css'
import { Header } from '../../../node_modules/semantic-ui-react';
const apiURL = process.env.API_URL || "http://localhost:1337"
const strapi = new Strapi(apiURL)

class Detail extends Component {

    state = {
        dichvu: '',
        details: []
    }


    async componentDidMount() {
        try {
            const response = await strapi.request('POST', 'graphql', {
                data: {
                    query: `
                    query {
                        dichvu(id:"${this.props.match.params.id}"){
                        _id
                        name
                        stock
                        expired
                        details {
                          _id
                          name
                          image{
                            url
                          }
                          price
                          description
                        }
                      }
                    }
                    `
                }
            })
            // console.log(response)
            this.setState({
                dichvu: response.data.dichvu,
                details: response.data.dichvu.details
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {



        return (
            <React.Fragment>
                {this.state.details.map(detail => (
                    <div className="detail-area">
                        <div className="container">
                            <div className="top-detail flex">
                                <div className="main-image">
                                    <p><img src={`${apiURL}${detail.image.url}`} alt="" /></p>
                                </div>
                                <div className="main-info">
                                    <Header as='h1' color='green' content={this.state.dichvu.name} />
                                    <h4>Còn lại: {this.state.dichvu.stock}</h4>
                                    <h4>Thời hạn: {this.state.dichvu.expired}</h4>
                                    <h2>Giá : {detail.price} VNĐ</h2>
                                </div>
                            </div>
                            <div className="description">
                                <Header as='h3' color='green' icon='idea' content='Giới thiệu' />
                                <p>{detail.description}</p>
                            </div>
                        </div>
                    </div>
                ))}


            </React.Fragment>
        )
    }
}

export default Detail
