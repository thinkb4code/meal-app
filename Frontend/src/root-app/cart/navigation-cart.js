import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class NavigationCart extends React.Component {
    render(){
        return <TouchableOpacity style={styles.container}>
            <Text style={styles.cartIcon}>&#xf07a;</Text>
            <View style={styles.cartItems}>
                <Text style={styles.cartCount}>0</Text>
            </View>
        </TouchableOpacity>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 25,
        position: 'relative'
    },
    cartIcon: {
        fontSize: 32,
        color: '#999',
        fontFamily: 'FaSolid'
    },
    cartItems: {
        position: 'absolute',
        backgroundColor: '#333',
        width: 20,
        height: 20,
        top: 10,
        right: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cartCount: {
        fontSize: 10,
        color: '#fff'
    }
});