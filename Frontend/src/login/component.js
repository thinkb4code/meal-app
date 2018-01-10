import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class Login extends React.Component{
    render(){
        return <View style={styles.container}>
            <Image style={styles.bgImage} source={require('../assets/app_bg.jpg')} />
            <View style={styles.bgImageCover}>
                <View style={styles.blank}>
                    {/* Empty Space */}
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Login</Text>
                    <TouchableOpacity onPress={this.loginUsingAzureAD.bind(this)} style={styles.loginButton}>
                        <View style={styles.loginProviderContainer}>
                            <Image source={require('../assets/aad.png')} style={styles.loginProviderImage} />
                            <Text>via Azure Active Directory</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.loginUsingTwitter.bind(this)} style={styles.loginButton}>
                        <View style={styles.loginProviderContainer}>
                            <Image source={require('../assets/twitter.png')} style={styles.loginProviderImage} />
                            <Text>via Twitter</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.blank}>
                    {/* Empty Space */}
                </View>
            </View>
        </View>;
    }

    loginUsingAzureAD() {
        this.props.openLogin('aad');
    }

    loginUsingTwitter() {
        this.props.openLogin('twitter');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImage: {
        flex: 1,
        width: null,
        justifyContent: 'center',
        alignSelf: 'stretch',
        resizeMode: 'cover'
    },
    bgImageCover: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    blank: {
        flex: 1
    },
    loginContainer: {
        flex: 3,
        alignItems: 'center',
    },
    loginText: {
        height: null,
        color: '#555',
        fontSize: 40,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textShadowColor: '#888',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 15, 
    },
    loginButton: {
        width: '70%',
        alignItems: 'center'
    },
    loginProviderContainer: {
        width: '60%',
        height: 80,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginProviderImage: {
        width: 40,
        height: 40,
    }
});