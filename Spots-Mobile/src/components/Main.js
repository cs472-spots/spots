// Main Screen JS code

import React, { Component } from 'react';
import { 
    AppRegistry,
    StyleSheet, 
    View, 
    Image, 
    Text, 
    Button, 
    TouchableOpacity } from 'react-native';
import Login from './Login';
import CheckIn from './CheckIn';
import Register from './Register';
import BottomNav from './BottomNav';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: this.props.firstname
        }
    }   

    navCheckIn() {
        this.props.navigator.push({
            page: 'CheckIn'
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.h1}>
                        Welcome, {this.state.firstname}
                    </Text>
                </View>
                <View style={styles.mainNav}>
                    <View style={styles.rowOne}>
                        <View style={styles.checkIn}>
                            <TouchableOpacity onPress={this.navCheckIn.bind(this)}>
                            <Image
                            style={styles.icon}
                            source={require('./images/checkinIcon.png')}
                            />
                            <Text style={{textAlign: 'center'}}>Check In</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lineContainer}>
                            <Image
                            style={styles.line1}
                            source={require('./images/line1.png')}
                            />
                        </View>
                        <View style={styles.register}>
                            <TouchableOpacity>
                            <Image
                            style={styles.icon}
                            source={require('./images/registerIcon.png')}
                            />
                            <Text style={{textAlign: 'center'}}>Permit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.lineContainer}>
                        <Image
                        style={styles.line2}
                        source={require('./images/line2.png')}
                        />
                    </View>
                    <View style={styles.rowTwo}>
                        <View style={styles.findMe}>
                            <TouchableOpacity>
                            <Image
                            style={styles.icon}
                            source={require('./images/findmeIcon.png')}
                            />
                            <Text style={{textAlign: 'center'}}>FindMe</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lineContainer}>
                            <Image
                            style={styles.line1}
                            source={require('./images/line1.png')}
                            />
                        </View>
                        <View style={styles.map}>
                            <TouchableOpacity>
                            <Image
                            style={styles.icon}
                            source={require('./images/mapIcon.png')}
                            />
                            <Text style={{textAlign: 'center'}}>Map</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flex: 2.5}}>
                    <BottomNav />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8cc63f'
    },
    header: {
        flex: 2, 
        backgroundColor: '#292f2f',
        justifyContent: 'center',
        alignItems: 'center'
    },
    h1: {
        fontSize: 30,
        color: '#ffffff'
    },
    icon: {
        flex: 1,
        width: 120,
        height: 120,
        resizeMode: 'contain'
    },
    lineContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    line1: {
        width: 3,
        height: 80,
        resizeMode: 'stretch',
    },
    line2: {
        width: 500,
        height: 3,
        resizeMode: 'stretch',
    },
    mainNav: {
        flex: 10,
        backgroundColor: '#8cc63f',
        paddingBottom: 10
    },
    rowOne: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10
    },
    rowTwo: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkIn: {
        flex: 1,
        alignItems: 'center'
    },
    register: {
        flex: 1,
        alignItems: 'center'
    },
    findMe: {
        flex: 1,
        alignItems: 'center'
    },
    map: {
        flex: 1,
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('Main', () => Main);