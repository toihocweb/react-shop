import React, { Component } from 'react'
import { Grid, Icon, Segment, Form, Message, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './auth.css'
import firebase from '../../firebase'
class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: [],
        isloading: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSunmit = (e) => {
        e.preventDefault()
        this.setState({
            isloading: true
        })
        if (this.isFormValid()) {
            let error = []
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                this.setState({
                    isloading: false,
                    errors: []
                })
            }).catch(err => {
                let errs = { message: "Sai thông tin tài khoản!" }
                this.setState({
                    errors: error.concat(errs),
                    isloading: false
                })
            })
        }
    }

    isFormValid = () => {
        return !this.isFormEmpty(this.state) ? true : false
    }



    isFormEmpty = ({ email, password }) => {
        return !email.length || !password.length
    }

    render() {
        const { email, password } = this.props
        const color = "green"
        return (
            <div className='container'>
                <Grid verticalAlign='middle' textAlign='center' className='login' >
                    <Grid.Column style={{ maxWidth: 600 }}>
                        <Header icon color={color} as='h2'>
                            <Icon name='unlock' size='tiny' />Login to FindUrAcc
                        </Header>
                        <Segment>
                            <Form onSubmit={this.handleSunmit}>
                                <Form.Input iconPosition='left' placeholder="Email" icon='mail' name='email' onChange={this.handleChange} value={email} type='email' />
                                <Form.Input iconPosition='left' placeholder="Password" icon='lock' name='password' onChange={this.handleChange} value={password} type='password' />
                                {this.state.errors.length > 0 && this.state.errors.map((err, index) => (<Message key={index} color='red' content={err.message} />))}
                                <Button fluid color={color} loading={this.state.isloading} disabled={this.state.isloading}> Đăng Nhập </Button>
                            </Form>
                            <Message warning>
                                <Icon name='help' />
                                Bạn chưa đăng kí? <Link to='register'> Đăng kí ngay</Link>.
                            </Message>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Login
