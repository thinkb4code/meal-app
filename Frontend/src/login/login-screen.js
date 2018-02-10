import React from 'react';
import {WebView, AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';
const AppConstants = require('../service/constants');

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.saveApiKey.bind(this);
    }

    onNavChange(navState){
        //console.log(navState.url);
        if(navState.url.indexOf('/.auth/login/done') > 0){
            const token = JSON.parse(decodeURIComponent(navState.url.split('#token=')[1]));
            if(token.authenticationToken !== undefined || token.authenticationToken !== null){
                this.saveApiKey(token.authenticationToken);
            }
        }
    }

    async saveApiKey(key) {
        await AsyncStorage.setItem(AppConstants.APIAuthKey, key);
        this.props.navigation.dispatch(NavigationActions.reset(
            {
                index: 0, 
                key: null, 
                actions: [NavigationActions.navigate({routeName: 'MainApp', params: {apiKey: key}})]
            }
        ));
    }

    render() {
        const {params} = this.props.navigation.state;
        return <WebView source={{uri: params.url}} onNavigationStateChange={this.onNavChange.bind(this)} />
    }
}