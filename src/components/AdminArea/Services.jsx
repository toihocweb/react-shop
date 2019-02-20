import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Message, List, Icon, Input } from 'semantic-ui-react';
import { connect } from 'react-redux'
import firebase from '../../firebase'
import { getProducts, saveProduct, deleteProduct } from '../../actions'
import _ from 'lodash'
class Services extends Component {

  state = {
    title: '',
    price: '',
    errors: [],
    file: null,
    description: '',
    isSuccess: false,
    isLoading: false,
    storageRef: firebase.storage().ref(),
    productRef: firebase.database().ref('products'),
    url: '',
    idSelected: '',
    users: [
      {
        name: '',
        pass: ''
      }
    ],
    user: '',
    pass: ''
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





  sendFile = (id) => {
    const { file } = this.state
    const storage = firebase.storage()

    if (file) {

      this.setState({ isLoading: true })

      const uploadTask = storage.ref(`images/${file.name}`).put(file)
      uploadTask.on('state_changed', (snapshot) => {
      }, (err) => {
        console.error(err)
      }, () => {
        storage.ref('images').child(file.name).getDownloadURL().then((url) => this.setState({ url })).then(() => {
          if (id !== '') {
            this.state.productRef.child(id).update({
              name: this.state.title,
              photoUrl: this.state.url,
              price: this.state.price,
              description: this.state.description,
            })
          } else {
            this.props.saveProduct({
              name: this.state.title,
              photoUrl: this.state.url,
              price: this.state.price,
              description: this.state.description,
              users: this.state.users
            })
          }
        }).then(() => {
          this.setState({
            isLoading: false,
            idSelected: '',
            title: '',
            price: '',
            description: '',
            file: null,
          })
        })
      })
    }
  }

  handleSunmit = (e) => {
    e.preventDefault()
    this.sendFile(this.state.idSelected)
  }

  componentDidMount() {
    this.props.getProducts()
  }


  setIdSelected = (id) => () => {
    this.state.productRef.child(id).on('value', snap => {
      const info = snap.val()
      this.setState({
        idSelected: id,
        title: info.name,
        price: info.price,
        description: info.description,
        users: info.users
      })
    })
  }

  addUserToProduct = (id) => () => {
    this.state.productRef.child(id).update({
      users: this.state.users.concat({
        user: this.state.user,
        pass: this.state.pass
      })
    })
    this.setState({
      user: '',
      pass: ''
    })
  }

  handleUserDelete = (id) => () => {
    const newList = this.state.users.filter((user, key) => key !== id)
    this.setState({
      users: newList
    })
    this.state.productRef.child(this.state.idSelected).update({
      users: newList
    })
  }


  renderProduct = () => {
    return _.map(this.props.product.productList, (product, key) => {
      return (
        <List.Item key={key}>
          <List.Content>
            <List.Header className='item-user'>
              <h5>{product.name}</h5>
              <Icon className='edit' name='edit' onClick={this.setIdSelected(key)} />
              <Icon onClick={() => this.props.deleteProduct(key)} name='delete' />
            </List.Header>
          </List.Content>
        </List.Item>
      )
    })
  }

  renderUser = () => {
    return _.map(this.state.users, (user, key) => {
      return (
        <List.Item key={key}>
          <List.Content>
            <List.Header className='item-product-user'>
              <h5>{user.user}</h5>
              <Icon onClick={this.handleUserDelete(key)} className='del' name='delete' />
            </List.Header>
          </List.Content>
        </List.Item>
      )
    })
  }

  handleClear = () => {
    this.setState({
      idSelected: '',
      title: '',
      price: '',
      description: '',
      file: null,
      users: []
    })
  }

  render() {
    const { title, price, isSuccess, isLoading, description, user, pass } = this.state

    return (
      <React.Fragment>
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
                <Form.TextArea rows={5} placeholder="Description" name='description' onChange={this.handleChange} value={description} />

                {this.state.errors.length > 0 && this.state.errors.map((err, index) => (<Message key={index} color='red' content={err.message} />))}

                <div className="f-between">
                  <Button color='green' loading={isLoading} disabled={isLoading}> Submit </Button>
                  <Button onClick={this.handleClear}> Clear </Button>
                </div>
              </Form>
            </Segment>

            <Segment>
              <Form>
                <Form.Input disabled={!this.state.idSelected} iconPosition='left' placeholder="User" icon='user' name='user' onChange={this.handleChange} value={user} type='text' />
                <Form.Input disabled={!this.state.idSelected} iconPosition='left' placeholder="Password" icon='lock' name='pass' onChange={this.handleChange} value={pass} type='text' />
                <Form.Button fluid content='Add User' color='blue' onClick={this.addUserToProduct(this.state.idSelected)} />
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8} >
            <Segment>
              <List selection>
                <List.Header content='List Products' as='h2' />
                {this.renderProduct()}
              </List>
            </Segment>

            <Segment>
              <List selection>
                <List.Header content='List Users' as='h2' />
                {this.renderUser()}
              </List>
            </Segment>
          </Grid.Column>
        </Grid>


      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product
})

export default connect(mapStateToProps, { getProducts, saveProduct, deleteProduct })(Services)
