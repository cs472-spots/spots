// Login Screen JS code

import React, { Component } from 'react';
import { 
    AppRegistry, 
    StyleSheet, 
    View, 
    Image, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    TouchableWithoutFeedback, 
    Keyboard, 
    KeyboardAvoidingView } from 'react-native';
import Main from './Main';
window.navigator.userAgent = 'ReactNative';

const io = require('socket.io-client/dist/socket.io');
const socket = io('https://cs472-spots.herokuapp.com/', {
  transports: ['websocket']
});

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showError: false,
        }
    }

    Login(state) {
        if(state.username==''||state.password=='') {
            this.setState({showError: true});
        } else {
            this.setState({showError: false});
            this.props.navigator.push({
                page: 'Main',
                firstname: state.username,
            })
            Keyboard.dismiss();
        }
    }

    navRegister() {
        this.props.navigator.push({
            page: 'Register'
        });
    }

    render() {
        let msg = this.state.showError ? "Error: Username or password missing" : '';
        return (
            <View style={styles.container}>
                <View style={{flex: 0.2, marginTop: 0}}></View>
                <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('./images/logo.png')}
                />
                </View>
                <KeyboardAvoidingView behavior="padding" style={styles.loginForm}>
                    <Text style={styles.error}>{msg}</Text>
                    <TextInput 
                        onChange={(event) => this.setState({username: event.nativeEvent.text})}
                        placeholder="username or email"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                    />
                    <TextInput 
                        onChange={(event) => this.setState({password: event.nativeEvent.text})}
                        placeholder="password"
                        secureTextEntry
                        style={styles.input}
                        ref={(input) => this.passwordInput = input}
                    />
                    <TouchableOpacity onPress={() => {this.Login(this.state)}}>
                        <View style={styles.loginButton}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{paddingTop: 50, flexDirection: 'row'}}>
                        <Text>No account yet? </Text>
                        <TouchableOpacity onPress={this.navRegister.bind(this)}>
                            <Text style={styles.register}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8cc63f'
    },
    logoContainer: {
        alignItems: 'center'
    },
    logo: {
        width: 250, 
        height: 110
    },
    loginForm: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 250,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginBottom: 10
    },
    loginButton: {
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
    register: {
        color: '#0000ee'
    }
});

AppRegistry.registerComponent('Login', () => Login);