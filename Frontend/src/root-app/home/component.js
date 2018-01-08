import React from 'react';
import {View, Text} from 'react-native';

export default class HomePage extends React.Component {
    render(){
        return <View>
            <Text> {this.props.apiKey} </Text>
        </View>;
    }
}