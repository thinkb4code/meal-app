import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, TextInput, processColor} from 'react-native';
import NavigationCart from '../cart/navigation-cart';

export default class ItemView extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;
        return {
            title: params.item.ItemName,
            headerRight: <NavigationCart />
        };
    };

    constructor(props){
        super(props);
        this.state = {
            count: 0
        };
    }

    updateQty(action) {
        switch (action) {
            case 'add':
                
                break;
            case 'remove':
                break;
            default:
                break;
        }
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
                <TouchableOpacity onPress={() => this.updateQty('remove')}>
                    <Text style={[styles.faFamily, styles.control]}>&#xf146;</Text>
                </TouchableOpacity>

                {/* <TextInput 
                    keyboardType="numeric" 
                    value={this.state.count.toString()} 
                    onChangeText={(val) => this.setState({count: val})}
                    maxLength={2}
                    style={{fontSize: 20}}
                ></TextInput> */}
                <Text style={[styles.control, {marginTop: -4}]}>
                {
                    params.inCart && params.inCart.length == 1 ? params.inCart[0].qty : '0'
                }
                </Text>
                
                <TouchableOpacity onPress={() => this.updateQty('add')}>
                    <Text style={[styles.faFamily, styles.control]}>&#xf0fe;</Text>
                </TouchableOpacity>
                
                {/* <TouchableOpacity style={styles.button}>
                    <Text style={{fontSize: 20, color: '#fff'}}>Add</Text>
                </TouchableOpacity> */}
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
        color: '#999',
        marginTop: 10
    },
    insertContainer: {
        flex: 2,
        paddingTop: 10,
        paddingBottom: 10,
        // paddingLeft: 30,
        // paddingRight: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    faFamily: {
        fontFamily: 'FaSolid'
    },
    control: {
        fontSize: 28,
        marginRight: 30
    },
    // button: {
    //     borderWidth: 0.5,
    //     borderColor: '#dedede',
    //     borderRadius: 5,
    //     backgroundColor: '#555',
    //     width: 80,
    //     height: 34,
    //     padding: 2,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     elevation: 5
    // }
});