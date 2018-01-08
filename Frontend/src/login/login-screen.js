import React from 'react';
import {WebView} from 'react-native';

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
    }

    onNavChange(navState){
        if(navState.url.indexOf('/.auth/login/done') > 0){
            const token = JSON.parse(decodeURIComponent(navState.url.split('#token=')[1]));
            if(token.authenticationToken !== undefined || token.authenticationToken !== null){
                this.props.saveKey(token.authenticationToken);
            }
        }
    }

    render() {
        return <WebView source={{uri: this.props.url}} onNavigationStateChange={this.onNavChange.bind(this)} />
    }
}