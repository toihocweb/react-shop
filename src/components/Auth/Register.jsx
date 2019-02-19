import React, { Component } from 'react'
import { Grid, Header, Message, Segment, Icon, Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        repassword: '',
        code : '',
        errors: [],
        isSuccess: false,
        usersRefs : firebase.database().ref("/users"),
        isLoading: false
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
                    displayName: this.state.displayName
                }).then(() => { this.saveUser(createdUser) }).then(() => console.log(createdUser))
                this.setState({
                    username: '',
                    email: '',
                    password: '',
                    repassword: '',
                    code : '',
                    errors: [],
                    isSuccess: true,
                    isLoading: false
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
            id: createdUser.user.uid,
            email: createdUser.user.email,
        })
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
        }  if (this.isCodeInvalid(this.state.code)) {
            err = { message: 'code sai!' }
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

    isCodeInvalid = (code) => {
        if ( code !== "CODE" ){
            return true
        }
    }


    isFormEmpty = ({ username, email, password, repassword, code }) => {
        return !username.length || !email.length || !password.length || !repassword.length || !code.length
    }
    render() {
        const { username, email, password, repassword, code } = this.state
        const color = "blue"

        return (
            <div className='container'>
                <Grid verticalAlign='middle' textAlign='center' className='register' >
                    <Grid.Column style={{ maxWidth: 600 }}>
                        <Header icon color={color} as='h2'>
                            <Icon name='shield alternate' size='tiny' />Register With FindUrAcc
                    </Header>
                        {this.state.isSuccess && (
                            <Message color='green' content="Successsfully!" />
                        )}
                        <Segment>
                            <Form onSubmit={this.handleSunmit}>
                                <Form.Input iconPosition='left' placeholder="Usernane" icon='user' name='username' onChange={this.handleChange} value={username} type='text' />
                                <Form.Input iconPosition='left' placeholder="Email" icon='mail' name='email' onChange={this.handleChange} value={email} type='email' />
                                <Form.Input iconPosition='left' placeholder="Password" icon='lock' name='password' onChange={this.handleChange} value={password} type='password' />
                                <Form.Input iconPosition='left' placeholder="Re-Password" icon='undo' name='repassword' onChange={this.handleChange} value={repassword} type='password' />
                                <Form.Input iconPosition='left' placeholder="Code" icon='code' name='code' onChange={this.handleChange} value={code} type='text' />
                                {this.state.errors.length > 0 && this.state.errors.map((err, index) => (<Message key={index} color='red' content={err.message} />))}
                                <Button fluid color={color} loading={this.state.isLoading} disabled={this.state.isLoading}> Đăng kí </Button>
                            </Form>
                            <Message warning>
                                <Icon name='help' />
                                Bạn đăng kí rồi hã?<Link to='login'> Đăng Nhập Ngay</Link> nè.
                         </Message>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Register
