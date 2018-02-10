import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

export default class CardList extends React.Component {
    render(){
        return <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.openView(this.props.viewName, this.props.params)} >
                <Text style={styles.cardIcon}>{this.props.icon}</Text>
                <Text style={styles.cardText}>{this.props.text}</Text>
            </TouchableOpacity>
        </View>;
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#dedede',
        borderRadius: 5,
        margin: 10,
        width: (window.width/2 - 20),
        shadowColor: '#dedede',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 1.0,
        shadowRadius: 5,
        elevation: 5
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    cardIcon: {
        fontFamily: 'FaSolid',
        fontSize: 28,
        color: '#ddd'
    },
    cardText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555'
    }
});