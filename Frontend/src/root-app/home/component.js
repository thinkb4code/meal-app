import React from 'react';
import {View, Text, AsyncStorage, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';

import Menu from '../menu/component';
const AppConstants = require('../../service/constants');

export default class HomePage extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(props){
        super(props);

        this.state = {
            userId: null,
            authProvider: null,
            loading: true,
            vegOnly: false,
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
                        return {...prevState, loading: false, vegOnly: profile.vegetarianOnly};
                    });
                    curr.props.navigation.navigate('MenuList', {apiKey: params.apiKey, vegOnly: profile.vegetarianOnly});
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
        this.props.navigation.navigate('MenuList', {apiKey: params.apiKey, vegOnly: vegOnly});
    }

    render(){
        const {params} = this.props.navigation.state;
        if(this.state.loading){
            return <View style={styles.container}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>;
        }else {
            return <View style={styles.container}>
                <Text style={styles.aboutText}>
                    Some text about your coorporate application and its features. 
                    Or we can create some tile base UI for opening New Order, Past Orders, Contact card etc.
                </Text>
                <TouchableOpacity style={styles.goButtom} onPress={() => {this.props.navigation.navigate('MenuList',{apiKey: params.apiKey, vegOnly: this.state.vegOnly})}}>
                    <Text>Go to Menu!</Text>
                </TouchableOpacity>
            </View>;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    aboutText: {
        color: '#999'
    },
    goButtom: {
        
    }
});