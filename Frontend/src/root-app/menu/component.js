import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import ItemList from './item-list';
import HttpService from '../../service/http_service';
import NavigationCart from '../cart/navigation-cart';

export default class Menu extends React.Component{
    static navigationOptions = {
        title: 'Menu',
        headerRight: <NavigationCart />
    };

    constructor(props){
        super(props);
        this.state = {
            menuList: null,
            update: 0
        };
    }

    async componentWillMount(){
        const {params} = this.props.navigation.state;
        const data = await HttpService.GetMenuItems(params.apiKey, params.vegOnly);
        params.updateMenuList(data);
        this.setState((prevState) => {
            return {...prevState, menuList: data};
        });
    }

    componentWillReceiveProps(newProps){
        this.setState((prevState) => {
            return {...prevState, update: (prevState.update+1) };
        });
    }

    openItemCard(item) {
        const {params} = this.props.navigation.state;
        this.props.navigation.navigate('ItemScreen', {
            item: item,
            updateCart: params.updateCart,
            inCart: params.inCartItems.filter((cartItem) => {return item.id === cartItem.id;})
        });
    }

    render(){
        const {params, key} = this.props.navigation.state;
        if(this.state.menuList === null){
            return <View style={styles.containerNoItem}>
                <Text style={styles.noItem}>Please wait while loading the menu!</Text>
            </View>;
        }else {
            return <View style={styles.container}>
                <FlatList 
                    data={this.state.menuList} 
                    extraData={this.state}
                    keyExtractor={(item, index) => item.id} 
                    renderItem={({item}) => 
                        <ItemList 
                            screenKey={key}
                            menuItem={item} 
                            openItemCard={this.openItemCard.bind(this)} 
                            updateCart={params.updateCart}
                            inCart={params.inCartItems.filter((cartItem) => {return item.id === cartItem.id;})}
                        />}
                />
            </View>;
        }
    }
}

const styles = StyleSheet.create({
    containerNoItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    noItem: {
        fontSize: 20
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 10
    }
});