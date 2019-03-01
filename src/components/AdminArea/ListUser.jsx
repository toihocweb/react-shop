import React, { Component } from 'react'
import { Grid, List, Icon, Segment } from 'semantic-ui-react';
import firebase from '../../firebase'
class ListUser extends Component {

    state = {
        users: [],
        userRef : firebase.database().ref('users')
    }
    
    componentDidMount() {
        this.addListeners()
    }

    addListeners = () => {
        let users = []
        this.state.userRef.on('child_added', snap => {
            users.push(snap.val())
            this.setState({
                users
            })
        })
    }

    handleDelete = id => () => {
        let users = []        
        this.state.userRef.child(id).remove();
        this.state.userRef.on('child_removed', snap => {
            users.push(snap.val())
            this.setState({
                users
            })
            console.log(snap.val())
        })
    }

    render() {
        const { users } = this.state
        console.log(this.state.users)
        return (
            <Grid.Column width={6} >
                <Segment>
                    <List selection>
                        <List.Header content='List User' as='h2' />
                        {users && users.map(user => (
                            <List.Item key={user.id}>
                                <List.Content>
                                    <List.Header className='item-user'>
                                        <h5>{user.name}</h5>
                                        <Icon className='edit' name='edit' />
                                        <Icon onClick={this.handleDelete(user.id)} name='delete' />
                                    </List.Header>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </Segment>
            </Grid.Column>
        )
    }
}

export default ListUser
