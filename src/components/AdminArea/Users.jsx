import React, { Component } from 'react'
import { Grid, List, Icon, Form, Segment, Button, Message } from 'semantic-ui-react';
import firebase from '../../firebase'
import { connect } from 'react-redux'
class Users extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        repassword: '',
        errors: [],
        isSuccess: false,
        usersRefs: firebase.database().ref("users"),
        isLoading: false,
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
                    displayName: this.state.username,
                }).then(() => { this.saveUser(createdUser) }).then(() => console.log(createdUser))
                this.setState({
                    username: '',
                    email: '',
                    password: '',
                    repassword: '',
                    errors: [],
                    isSuccess: true,
                })
            }).catch(err => {
                this.setState({
                    errors: this.state.errors.concat(err),
                    isLoading: false
                })
            })
        }
    }

    saveUser = (createdUser) => {
        return this.state.usersRefs.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
        })
    }

    isFormValid = () => {
        let errors = []
        let err

        if (this.isFormEmpty(this.state)) {
            err = { message: 'Fill in all fields!' }
            this.setState({
                errors: errors.concat(err)
            })
            return false
        } else if (this.isPasswordInvalid(this.state.password, this.state.repassword)) {
            err = { message: 'PAssword dont match!' }
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

    render() {
        const { username, email, password, repassword } = this.state
        const { users } = this.props
        return (
            <Grid  className='ad-register' >
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
                <Grid.Column width={6} >
                    <Segment>
                    <List selection>
                        <List.Header content='List User' as='h2' />
                        {users && users.map(user => (
                        <List.Item key={user.key}>
                        <List.Content>
                            <List.Header className='item-user'>
                                <h3>{user.email}</h3>
                                <Icon className='edit' name='edit' />
                                <Icon  name='delete' />
                            </List.Header>
                        </List.Content>
                    </List.Item>
                        )) }


                    </List>
                    </Segment>
                   
                </Grid.Column>
            </Grid>
        )
    }
}

export default Users
