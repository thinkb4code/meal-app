import React from 'react';
import {View, Text, AsyncStorage, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation';

import UserHome from './user-home';
import AdminHome from './admin-home';
import NavigationCart from '../cart/navigation-cart';

const AppConstants = require('../../service/constants');

export default class HomePage extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Home',
            headerRight: <NavigationCart />
        };
    };

    constructor(props){
        super(props);

        this.state = {
            userId: null,
            authProvider: null,
            loading: true,
            vegOnly: false,
            isAdmin: false,
            menuList: [],
            cartItems: []
        };
    }

    componentWillMount(){
        const curr = this;
        
        this.getLocalAuthData().then((data) => {
            if(data !== null){
                curr.setState((prevState) => {
                    return {...prevState, authProvider: data[0][1], userId: data[1][1]};
                });
                curr.checkUserProfileCreate();
            }else {
                // Get Data from service.
                curr.getUserAuthDetails().then((data) => {
                    if(data !== null){
                        curr.updateUserId(data[0].provider_name , data[0].user_id);
                        curr.checkUserProfileCreate();
                    }
                });
            }
        });
    }

    componentWillReceiveProps(newProps){
        debugger;
    }

    getLocalAuthData(){
        return AsyncStorage.multiGet([AppConstants.AuthProvider, AppConstants.AuthLoginId]).then((data) => {
            if(data.length == 2 && (data[0][1] !== null || data[1][1] !== null)){
                return data;
            }else{
                return null;
            }
        });
    }

    getUserAuthDetails(){
        return fetch(AppConstants.AuthUserDetails).then((resp) => {
            return resp.json().then((data) => {
                if(data.length > 0){
                    if(data[0].provider_name && data[0].user_id){
                        return data;
                    }else {
                        return null;
                    }

                }else {
                    return null;
                }
            });
        }).catch((error) => {
            // TODO
        });
    }

    checkUserProfileCreate(){
        const {params} = this.props.navigation.state;
        const curr = this;
        const headers = new Headers();
        headers.append('X-ZUMO-AUTH', params.apiKey);
        headers.append('ZUMO-API-VERSION', '2.0.0');

        fetch((AppConstants.UserProfile + `/${this.state.authProvider}@${this.state.userId}`), {headers: headers, method: 'GET'}).then((data) => {
            return data.json().then((profile) => {
                if(profile.length <= 0 || profile.error){
                    //this.props.navToProfile(this.state.authProvider, this.state.userId);
                    curr.props.navigation.navigate('ProfileConfig', {
                        apiKey: params.apiKey,
                        provider: curr.state.authProvider,
                        userId: curr.state.userId,
                        redirectViaHome: true,
                        updateHomePage: curr.updateThis.bind(curr)
                    });
                    return;
                }else {
                    curr.setState((prevState) => {
                        return {...prevState, loading: false, vegOnly: profile.vegetarianOnly, isAdmin: profile.IsAdmin};
                    });
                    //curr.props.navigation.navigate('MenuList', {apiKey: params.apiKey, vegOnly: profile.vegetarianOnly});
                }
            }).catch((error) => {
                debugger;
            });
        }).catch((error) => {
            debugger;
        });
    }

    async updateUserId(provider, id){
        await AsyncStorage.setItem(AppConstants.AuthProvider, provider);
        await AsyncStorage.setItem(AppConstants.AuthLoginId, id);

        this.setState((prevState) => {
            return {...prevState, userId: id, authProvider: provider};
        });
    }

    updateThis(vegOnly){
        this.setState({...this.state, loading: !this.state.loading, vegOnly: vegOnly});
        //this.props.navigation.navigate('MenuList', {apiKey: params.apiKey, vegOnly: vegOnly});
    }

    navigateToView(viewName, viewParams){
        this.props.navigation.navigate(viewName, viewParams);
    }

    updateMenuList(menuList) {
        this.setState({...this.state, menuList: menuList});
    }

    updateCartItem(screenKey, id, action, quantity){
        const inCart = this.state.cartItems.filter((item) => {
            return item.id === id;
        });
        let {cartItems} = this.state;
        switch (action) {
            case 'add':
                if(inCart.length > 1){
                    alert('Some error!! Multiple Item already in cart');
                }else if(inCart.length === 1){
                    // Increment Item
                    cartItems = cartItems.map((item, index) => {
                        if(item.id === id){
                            item.qty += quantity;
                        }

                        return item;
                    });
                }else {
                    // Add Item by one
                    cartItems.push({id: id, qty: quantity});
                }
                break;
            case 'remove':
                debugger;
                if(inCart.length > 1){
                    alert('Some error!! Multiple Item already in cart');
                }else if(inCart.length === 1){
                    cartItems = cartItems.map((item, index) => {
                        if(item.id === id){
                            item.qty -= quantity;
                            if(item.qty > 0){
                                return item;
                            }
                        }else {
                            return item;
                        }
                    });
                }else {
                    alert('Item not in cart!!');
                }
                break;
            default:
                alert('Unknown action');
                break;
        }

        // Filter patch added as Remove function using Map which result 'undefined' in case of complete remove.
        cartItems = cartItems.filter((item) => {
            return item ? item : false;
        });
        
        const updateParam = NavigationActions.setParams({
            params: {inCartItems: cartItems},
            key: screenKey
        });
        this.props.navigation.dispatch(updateParam);

        this.setState((prevState) => {
            return {...prevState, cartItems: cartItems};
        });
    }

    render(){
        const {params} = this.props.navigation.state;
        if(this.state.loading){
            return <View style={styles.container}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>;
        }else {
            if(this.state.isAdmin){
                return <AdminHome apiKey={params.apiKey} openView={this.navigateToView.bind(this)} />;
            }else {
                return <UserHome 
                    apiKey={params.apiKey} 
                    openView={this.navigateToView.bind(this)} 
                    updateMenuList={this.updateMenuList.bind(this)}
                    updateCart={this.updateCartItem.bind(this)}
                    inCartItems={this.state.cartItems} />;
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
});