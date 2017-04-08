// Register Screen JS code

import React, { Component } from 'react';
import { 
    AppRegistry, 
    StyleSheet,
    Text, 
    TextInput, 
    Image, 
    View, 
    Navigator,
    Button, 
    TouchableOpacity,
    Keyboard, 
    KeyboardAvoidingView } from 'react-native';
import BottomNav from './BottomNav'; 
import Main from './Main';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            email: '',
            phonenumber: '',
            showError: false
        }
    }

    registerCheck(state) {
        if(
            state.firstname==''||
            state.lastname==''||
            state.username==''||
            state.password==''||
            state.email=='') {
            this.setState({showError: true});
        } else {
            this.setState({showError: false});
            this.Register(state);
            this.props.navigator.push({
                page: 'Main',
                firstname: state.firstname
            })
            Keyboard.dismiss();
        }
    }

    Register(state) {
        fetch('https://pocky-wocky.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: state.firstname,
                lastname: state.lastname,
                username: state.username,
                password: state.password,
                email: state.email,
                phonenumber: state.phonenumber
            })
        })
    }

    render() {
        let msg = this.state.showError ? "Error: Required information missing" : '';
        return (
            <View style={styles.container}>
                <View style={{flex: 0.05}}></View>
                <Image
                source={require('./images/register_bg.png')}
                style={styles.registerForm}>
                    <Text style={styles.error}>{msg}</Text>
                    <TextInput 
                        onChange={(event) => this.setState({firstname: event.nativeEvent.text})}
                        placeholder="first name *"
                        onSubmitEditing={() => this.lastnameInput.focus()}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                    />
                    <TextInput 
                        onChange={(event) => this.setState({lastname: event.nativeEvent.text})}
                        placeholder="last name *"
                        onSubmitEditing={() => this.usernameInput.focus()}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        ref={(input) => this.lastnameInput = input}
                    />
                    <TextInput 
                        onChange={(event) => this.setState({username: event.nativeEvent.text})}
                        placeholder="username *"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        ref={(input) => this.usernameInput = input}
                    />
                    <TextInput 
                        onChange={(event) => this.setState({password: event.nativeEvent.text})}
                        placeholder="password *"
                        onSubmitEditing={() => this.emailInput.focus()}
                        secureTextEntry
                        style={styles.input}
                        ref={(input) => this.passwordInput = input}
                    />
                    <TextInput 
                        onChange={(event) => this.setState({email: event.nativeEvent.text})}
                        placeholder="email address *"
                        onSubmitEditing={() => this.phoneInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        ref={(input) => this.emailInput = input}
                    />
                    <TextInput 
                        onChange={(event) => this.setState({phonenumber: event.nativeEvent.text})}
                        placeholder="phone numer"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        ref={(input) => this.phoneInput = input}
                    />
                    <TouchableOpacity onPress={() => {this.registerCheck(this.state)}}>
                        <View style={styles.registerButton}>
                            <Text style={styles.buttonText}>REGISTER</Text>
                        </View>
                    </TouchableOpacity>
                </Image>
                <View style={{flex: 0.05}}></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8cc63f'
    }, 
    registerForm: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },   
    input: {
        height: 40,
        width: 250,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginBottom: 10
    },
    registerButton: {
        backgroundColor: '#67922d',
        paddingVertical: 10
    },    
    buttonText: {
        width: 250,
        textAlign: 'center',
        fontWeight: '700'
    },    
    error: {
        color: 'red'
    },
});

AppRegistry.registerComponent('Register', () => Register);