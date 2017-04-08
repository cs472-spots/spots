// CheckIn Screen JS code

import React, { Component } from 'react';
import { 
    AppRegistry, 
    StyleSheet, 
    View, 
    Image, 
    Text } from 'react-native';
import BottomNav from './BottomNav';

export default class CheckIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            free: 3,
            total: 6
        }
    }   

    render() {

        return (

            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.h1}>Available Spots: {this.state.free} / {this.state.total} </Text>
                </View>

                <View style={styles.main}>

                    <View style={styles.spotCol}>

                        <View style={styles.spot}>
                            <Image
                                style={styles.spotImg}
                                source={require('./images/spotFree.png')}>
                                <View style={styles.spotTextView}>
                                    <Text style={styles.spotText}>S1</Text>
                                </View>
                            </Image>
                        </View>

                        <View style={styles.spot}>
                            <Image
                                style={styles.spotImg}
                                source={require('./images/spotTaken.png')}>
                                <View style={styles.spotTextView}>
                                    <Text style={styles.spotText}>S3</Text>
                                </View>
                            </Image>
                        </View>

                        <View style={styles.spot}>
                            <Image
                                style={styles.spotImg}
                                source={require('./images/spotFree.png')}>
                                <View style={styles.spotTextView}>
                                    <Text style={styles.spotText}>S5</Text>
                                </View>
                            </Image>
                        </View>

                    </View>

                    <View style={styles.spotCol}>

                        <View style={styles.spot}>
                            <Image
                                style={styles.spotImg}
                                source={require('./images/spotTakenRev.png')}>
                                <View style={styles.spotTextView}>
                                    <Text style={styles.spotText}>S2</Text>
                                </View>
                            </Image>
                        </View>

                        <View style={styles.spot}>
                            <Image
                                style={styles.spotImg}
                                source={require('./images/spotTakenRev.png')}>
                                <View style={styles.spotTextView}>
                                    <Text style={styles.spotText}>S4</Text>
                                </View>
                            </Image>
                        </View>

                        <View style={styles.spot}>
                            <Image
                                style={styles.spotImg}
                                source={require('./images/spotFreeRev.png')}>
                                <View style={styles.spotTextView}>
                                    <Text style={styles.spotText}>S6</Text>
                                </View>
                            </Image>
                        </View>

                    </View>
                    
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
    spotCol: {
        flexDirection: 'column',
    },
    spot: {
        paddingTop: 5,
        paddingBottom: 5
    },
    spotImg: {
        width: 150,
        height: 75,
        resizeMode: 'contain',
    },
    spotTextView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    spotText: {
        fontSize: 50,
        color: '#434343'
    }

});

AppRegistry.registerComponent('CheckIn', () => CheckIn);