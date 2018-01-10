import React from 'react';
import {View, Text, AsyncStorage, ActivityIndicator, StyleSheet} from 'react-native';
const AppConstants = require('../../service/constants');

export default class HomePage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            userId: null,
            authProvider: null,
			loading: true
        }
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
        const curr = this;
        const headers = new Headers();
        headers.append('X-ZUMO-AUTH', this.props.apiKey);
        headers.append('ZUMO-API-VERSION', '2.0.0');

        fetch((AppConstants.UserProfile + `/${this.state.authProvider}@${this.state.userId}`), {headers: headers, method: 'GET'}).then((data) => {
            return data.json().then((profile) => {
                if(profile.length <= 0 || profile.error){
                    this.props.navToProfile(this.state.authProvider, this.state.userId);
                    return;
                }else {
                    curr.setState((prevState) => {
                        return {...prevState, loading: false};
                    });
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

    render(){
        if(this.state.loading){
            return <View style={styles.container}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>;
        }else {
            return <View style={styles.container}>
                <Text> {this.props.apiKey} </Text>
                <Text> {this.state.userId} </Text>
                <Text> {this.state.authProvider} </Text>
            </View>;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});