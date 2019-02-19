import React, { Component } from 'react'
import { Grid, List, Icon, Form, Dropdown, Segment, Button, Message } from 'semantic-ui-react';
// import firebase from '../../firebase'
import { connect } from 'react-redux'
// import _ from 'lodash'
// import { getUsers, saveUser, deleteUser } from '../../actions'
import firebase from '../../firebase'
import { getProducts, saveProduct, deleteProduct } from '../../actions'

class Services extends Component {

  state = {
    title: '',
    price: '',
    errors: [],
    file: null,
    isSuccess: false,
    isLoading: false,
    storageRef: firebase.storage().ref(),
    url: '',
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addFile = (e) => {
    const filename = e.target.files[0]
    this.setState({
      file: filename
    })
  }

  

  sendFile = () => {
    const { file } = this.state

    const storage = firebase.storage()
    if (file) {
      const uploadTask = storage.ref(`images/${file.name}`).put(file)
      uploadTask.on('state_changed', (snapshot) => {
        
      }, (err) => {
        console.error(err)
      }, () => {
        storage.ref('images').child(file.name).getDownloadURL().then((url) => this.setState({ url })).then(() => {this.props.saveProduct({
          name : this.state.title,
          photoUrl : this.state.url,
          price : this.state.price
        })})
      })
    }
  }

  handleSunmit = (e) => {
    e.preventDefault()

    this.sendFile()
  }

  render() {
    const { title, price, isSuccess } = this.state


    return (
      <Grid className='ad-register' >
        <Grid.Column textAlign='center' width={8} >
          {isSuccess && (
            <Message color='green' content="Successsfully!" />
          )}
          <Segment>
            <Form onSubmit={this.handleSunmit}>
              <Form.Input iconPosition='left' placeholder="Title" icon='bug' name='title' onChange={this.handleChange} value={title} type='text' />
              <Form.Input fluid type='file' name='file' onChange={this.addFile} />
              <Form.Input iconPosition='left' placeholder="Price" icon='money' name='price' onChange={this.handleChange} value={price} type='number' />
              {this.state.errors.length > 0 && this.state.errors.map((err, index) => (<Message key={index} color='red' content={err.message} />))}
              <Button fluid color='green' loading={this.state.isLoading} disabled={this.state.isLoading}> Submit</Button>
            </Form>
          </Segment>
        </Grid.Column>

      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  productList : state.product
})

export default connect(mapStateToProps , { getProducts,saveProduct , deleteProduct })(Services)
