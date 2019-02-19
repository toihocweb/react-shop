import React, { Component } from 'react'
import { Grid, List, Icon, Form, Segment, Button, Message } from 'semantic-ui-react';
import firebase from '../../firebase'
import { connect } from 'react-redux'
import ListUser from './ListUser';
class Users extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        repassword: '',
        errors: [],
        isSuccess: false,
        isLoading: false,
        users : [],
        userRef : firebase.database().ref("/users")
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

   

    handleSunmit = (e) => {
        e.preventDefault()

        if (this.isFormValid()) {
            this.setState({ isLoading: true })
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(createdUser => {
                createdUser.user.updateProfile({
                    displayName: this.state.username
                }).then(() => { this.saveUserToDb(createdUser) })
                this.setState({
                    username: '',
                    email: '',
                    password: '',
                    repassword: '',
                    errors: [],
                    isSuccess: true,
                    isLoading: false,
                })
            }).catch(err => {
                this.setState({
                    errors: this.state.errors.concat(err),
                    isLoading: false
                })
            })
        }
    }

    saveUserToDb = (createdUser) => {
        const user = {
            name: createdUser.user.displayName,
            id: createdUser.user.uid,
            email: createdUser.user.email,
        }
      this.state.userRef.child(createdUser.user.uid).set(user)
    }



    isFormValid = () => {
        let errors = []
        let err

        if (this.isFormEmpty(this.state)) {
            err = { message: 'Vui Lòng Điền Đầy Đủ Thông Tin!' }
            this.setState({
                errors: errors.concat(err)
            })
            return false
        } else if (this.isPasswordInvalid(this.state.password, this.state.repassword)) {
            err = { message: 'Password không trùng!' }
            this.setState({
                errors: errors.concat(err)
            })
            return false
        } else {
            this.setState({
                errors: []
            })
            return true
        }
    }


    isPasswordInvalid = (password, repassword) => {
        if (password !== repassword) {
            return true
        }
    }

    isFormEmpty = ({ username, email, password, repassword }) => {
        return !username.length || !email.length || !password.length || !repassword.length
    }

    handleDelete = (id) => () => {
        this.state.userRef.child(id).remove()
    }

    render() {
        const { username, email, password, repassword, users } = this.state
        return (
            <Grid className='ad-register' >
                <Grid.Column textAlign='center' width={10} >
                    {this.state.isSuccess && (
                        <Message color='green' content="Successsfully!" />
                    )}
                    <Segment>
                        <Form onSubmit={this.handleSunmit}>
                            <Form.Input iconPosition='left' placeholder="Usernane" icon='user' name='username' onChange={this.handleChange} value={username} type='text' />
                            <Form.Input iconPosition='left' placeholder="Email" icon='mail' name='email' onChange={this.handleChange} value={email} type='email' />
                            <Form.Input iconPosition='left' placeholder="Password" icon='lock' name='password' onChange={this.handleChange} value={password} type='password' />
                            <Form.Input iconPosition='left' placeholder="Re-Password" icon='undo' name='repassword' onChange={this.handleChange} value={repassword} type='password' />
                            {this.state.errors.length > 0 && this.state.errors.map((err, index) => (<Message key={index} color='red' content={err.message} />))}
                            <Button fluid color='green' loading={this.state.isLoading} disabled={this.state.isLoading}> Submit</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
                {/* list user */}
                <ListUser />
            </Grid>
        )
    }
}

export default Users
