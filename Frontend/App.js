import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import Login from './src/login/component';
import LoginScreen from './src/login/login-screen';
import HomePage from './src/root-app/home/component';

export default class App extends Component {
	constructor(){
		super();
		this.state = {
			showPage: 0,
			loginProvider: null,
			key: null
		};
	}

	openLoginPage(provider){
		this.setState((prevState) => {
			return {showPage: 1, loginProvider: provider, key: null};
		});
	}

	async updateApiKey(key){
		await AsyncStorage.setItem('apiAuthKey', key);
		this.setState((prevState) => {
			return {...prevState, showPage: 2, key: key};
		});
	}

	componentWillMount(){
		const curr = this;
		AsyncStorage.getItem('apiAuthKey').then((token) => {
			if(token !== null){
				curr.setState((prevState) => {
					return {showPage: 2,
					loginProvider: null,
					key: token}
				});
			}else {
				curr.setState((prevState) => {
					return {showPage: 0,
					loginProvider: null,
					key: null}
				});
			}
		}).catch((error) => {
			curr.setState((prevState) => {
				return {showPage: 0,
				loginProvider: null,
				key: null}
			});
		});
	}

	render() {
		if(this.state.showPage == 0){
			return React.createElement(Login, {openLogin: this.openLoginPage.bind(this)});
		}else if(this.state.showPage == 1){
			if(this.state.loginProvider == 'aad'){
				return React.createElement(LoginScreen, {url: 'https://saketamealapp.azurewebsites.net/.auth/login/aad', saveKey: this.updateApiKey.bind(this)});
			}else {
				return React.createElement(LoginScreen, {url: 'https://saketamealapp.azurewebsites.net/.auth/login/twitter', saveKey: this.updateApiKey.bind(this)});
			}
		}else if(this.state.showPage == 2){
			return React.createElement(HomePage, {apiKey: this.state.key});
		}
	}
}