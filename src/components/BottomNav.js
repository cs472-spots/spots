// Bottom Navigation JS code

import React, { Component } from 'react';
import { 
    AppRegistry, 
    StyleSheet, 
    View, 
    Image, 
    Text, 
    TouchableOpacity } from 'react-native';

export default class Main extends Component {

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.navContainer}>
                    <TouchableOpacity>
                    <Image
                        style={styles.navCon}
                        source={require('./images/houseNavcon.png')}
                    />
                    </TouchableOpacity>
                </View>
                <View style={styles.navContainer}>
                    <TouchableOpacity>
                    <Image
                        style={styles.navCon}
                        source={require('./images/alertsNavcon.png')}
                    />
                    </TouchableOpacity>
                </View>
                <View style={styles.navContainer}>
                    <TouchableOpacity>
                    <Image
                        style={styles.navCon}
                        source={require('./images/searchNavcon.png')}
                    />
                    </TouchableOpacity>
                </View>
                <View style={styles.navContainer}>
                    <TouchableOpacity>
                    <Image
                        style={styles.navCon}
                        source={require('./images/profileNavcon.png')}
                    />
                    </TouchableOpacity>
                </View>
                <View style={styles.navContainer}>
                    <TouchableOpacity>
                    <Image
                        style={styles.navCon}
                        source={require('./images/moreNavcon.png')}
                    />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#67922d',
    },
    navCon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    navContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});

AppRegistry.registerComponent('BottomNav', () => BottomNav);