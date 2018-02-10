import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, TextInput, processColor} from 'react-native';

export default class ItemView extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        return {
            title: `Item: ${params.item.ItemName}`
        };
    };

    constructor(props){
        super(props);
        this.state = {
            count: "0"
        };
    }

    render() {
        const {params} = this.props.navigation.state;
        return <ScrollView style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={{uri: params.item.Image}} style={styles.productImage} />
            </View>
            <View style={styles.descContainer}>
                <Text style={styles.descColor}>{params.item.Description}</Text>
                <Text style={styles.descColor}>${params.item.Price.toFixed(2)}</Text>
            </View>
            <View style={styles.insertContainer}>
                <TouchableOpacity style={[styles.control, styles.button]}>
                    <Text style={styles.controlTextStyle}>+</Text>
                </TouchableOpacity>

                <TextInput 
                    keyboardType="numeric" 
                    value={this.state.count.toString()} 
                    onChangeText={(val) => this.setState({count: val})}
                    maxLength={2}
                    style={[styles.control, {fontSize: 18}]}
                ></TextInput>
                
                <TouchableOpacity style={[styles.control, styles.button]}>
                    <Text style={styles.controlTextStyle}>-</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.control, styles.button]}>
                    <Text style={styles.controlTextStyle}>Add</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>;
    }
}
const window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    imgContainer: {
        flex: 5,
    },
    productImage:{
        flex: 1,
        height: (window.height/2 - 20)
    },
    descContainer: {
        flex: 3,
        paddingTop: 10,
        paddingBottom: 10
    },
    descColor: {
        color: '#999'
    },
    insertContainer: {
        flex: 2,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    control: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        margin: 10,
        backgroundColor: '#acacac',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#fff'
    },
    controlTextStyle: {
        fontSize: 18,
        color: '#fff'
    }
});