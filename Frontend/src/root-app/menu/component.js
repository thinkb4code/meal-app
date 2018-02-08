import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ItemList from './item-list';
import HttpService from '../../service/http_service';

export default class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuList: null
        };
    }

    async componentWillMount(){
        //HttpService.SaveItem(this.props.apiKey);
        const data = await HttpService.GetMenuItems(this.props.apiKey, this.props.vegOnly);
        this.setState((prevState) => {
            return {...prevState, menuList: data};
        });
    }

    render(){
        if(this.state.menuList === null){
            return <View style={styles.containerNoItem}>
                <Text style={styles.noItem}>Oops, no menu found for today!</Text>
            </View>;
        }else {
            return <View style={styles.container}>
                <FlatList data={this.state.menuList} renderItem={({item}) => <ItemList menuItem={item} />} />
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