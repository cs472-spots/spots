// CheckIn Screen JS code

import React, { Component } from 'react';
import { 
    AppRegistry, 
    StyleSheet, 
    View, 
    Image, 
    Text } from 'react-native';
import BottomNav from './BottomNav';
import MapView from 'react-native-maps';
window.navigator.userAgent = 'ReactNative';

const io = require('socket.io-client/dist/socket.io');
const socket = io('https://unlv-spots.herokuapp.com/', {
  transports: ['websocket']
});

export default class CheckIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            free: '',
            total: 100
        }
    }   

    RecieveSpots () {
        this.socket.on('reply', (spots)=> {
            
        })
    }

    render() {

        return (

            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.h1}>Available Spots: {this.state.free} / {this.state.total} </Text>
                </View>

                <View style={styles.main}>

                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 36.111603,
                        longitude: -115.141534,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                </View>

                <View style={{flex: 2.5}}>
                    <BottomNav />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8cc63f'
    },
    header: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        flex: 12,
        flexDirection: 'row',
        backgroundColor: '#434343',
        alignItems: 'center',
        justifyContent: 'center'
    },
    h1: {
        fontSize: 20,
        color: '#ffffff'
    },
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    }

});

AppRegistry.registerComponent('CheckIn', () => CheckIn);