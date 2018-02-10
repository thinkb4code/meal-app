import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ItemList from './item-list';
import HttpService from '../../service/http_service';

export default class Menu extends React.Component{
    static navigationOptions = {
        title: 'Menu',
    };
    constructor(props){
        super(props);
        this.state = {
            menuList: null
        };
    }

    async componentWillMount(){
        const {params} = this.props.navigation.state;
        const data = await HttpService.GetMenuItems(params.apiKey, params.vegOnly);
        this.setState((prevState) => {
            return {...prevState, menuList: data};
        });
    }

    openItemCard(item) {
        this.props.navigation.navigate('ItemScreen', {item: item});
    }

    render(){
        if(this.state.menuList === null){
            return <View style={styles.containerNoItem}>
                <Text style={styles.noItem}>Please wait while loading the menu!</Text>
            </View>;
        }else {
            return <View style={styles.container}>
                <FlatList data={this.state.menuList} keyExtractor={(item, index) => item.id} renderItem={({item}) => <ItemList menuItem={item} openItemCard={this.openItemCard.bind(this)} />} />
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