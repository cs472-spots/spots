// Register Screen 2 JS code

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
import Register from './Register';
import Main from './Main';
import io from 'socket.io-client/dist/socket.io';

window.navigator.userAgent = 'ReactNative';

export default class RegSubmit extends Component {

    constructor(props) {
        super(props);
        this.socket = io('https://unlv-spots.herokuapp.com/', {jsonp: false});
        this.state = {
            //Account Information
            uname: this.props.uname,
            cid: '',
            //Student Information
            fname: this.props.fname,
            lname: this.props.lname,
            NSHE:'',
            email: this.props.email,
            pnum:this.props.pnum,
            vColor:'',
            vYear: '',
            vLic:'',
            vMake:'',
            vModel:'',
            permitType: 'student',
            //Date
            curDate: '', //(cDate.getMonth()+1).toString() + '-' + cDate.getDate().toString() + '-' + cDate.getFullYear().toString(),
            futDate: '', //(cDate.getMonth()+1).toString() + '-' + cDate.getDate().toString() + '-' + (cDate.getFullYear()+1).toString()
        };
        this.data = {
        client: "Admin",
        username: this.state.uname,
        userID: parseInt(this.state.NSHE),
        cardID: parseInt(this.state.cid),
        firstName: this.state.fname,
        lastName: this.state.lname,
        email: this.state.email,
        phone: parseInt(this.state.pnum),
        gotPermit: true,
        permitType: this.state.permitType,
        purchaseDate: this.state.curDate,
        expDate: this.state.futDate,
        type: this.state.permitType,
        vehicleInt: 10, //vInt,
        v1_year: parseInt(this.state.vYear),
        v1_make: this.state.vMake,
        v1_model: this.state.vModel,
        v1_color: this.state.vColor,
        v1_plate: this.state.vLic,
        v2_year: 2012,
        v2_make: "Honda",
        v2_model: "Civic",
        v2_color: "Red",
        v2_plate: "licensePlate2",
        flag: "register"
    };
    }

    registerCheck(state) {
        if(
            state.cid==''||
            state.NSHE==''||
            state.vColor==''||
            state.vYear==''||
            state.vLic=='' ||
            state.vMake=='' ||
            state.vModel =='') {
            this.setState({showError: true});
        } else {
            this.setState({showError: false});
            this.Register(state);
            this.props.navigator.push({
                page: 'Main',
                fname: state.fname
            })
            Keyboard.dismiss();
        }
    }

    Register(state) {
        this.socket.emit('client', this.data);
        this.socket.on('reply', (msg)=> {
        console.log('Message: ' + msg);
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
                    <Text>
                        Welcome, {this.state.fname}
                    </Text>
                    <Text style={styles.error}>{msg}</Text>
                    <TextInput 
                        onChange={(event) => this.setState({cid: event.nativeEvent.text})}
                        placeholder="card id *"
                        onSubmitEditing={() => this.NSHEInput.focus()}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                    />
                    <TextInput 
                        onChange={(event) => this.setState({NSHE: event.nativeEvent.text})}
                        placeholder="NSHE number *"
                        onSubmitEditing={() => this.vLicInput.focus()}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        ref={(input) => this.NSHEInput = input}
                    />
                    <TextInput 
                        onChange={(event) => this.setState({vLic: event.nativeEvent.text})}
                        placeholder="licence plate number *"
                        onSubmitEditing={() => this.vColInput.focus()}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        ref={(input) => this.vLicInput = input}
                    />
                    <TextInput 
                        onChange={(event) => this.setState({vColor: event.nativeEvent.text})}
                        placeholder="vehicle color *"
                        onSubmitEditing={() => this.vMakeInput.focus()}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        ref={(input) => this.vColInput = input}
                    />
                    <TextInput 
                        onChange={(event) => this.setState({vMake: event.nativeEvent.text})}
                        placeholder="vehicle make *"
                        onSubmitEditing={() => this.vModInput.focus()}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        ref={(input) => this.vMakeInput = input}
                    />
                    <TextInput 
                        onChange={(event) => this.setState({vModel: event.nativeEvent.text})}
                        placeholder="vehicle model *"
                        onSubmitEditing={() => this.vYearInput.focus()}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        ref={(input) => this.vModInput = input}
                    />
                    <TextInput 
                        onChange={(event) => this.setState({vYear: event.nativeEvent.text})}
                        placeholder="vehicle year *"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        ref={(input) => this.vYearInput = input}
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

AppRegistry.registerComponent('RegSubmit', () => RegSubmit);