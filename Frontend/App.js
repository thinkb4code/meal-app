import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import Login from './src/login/component';
import LoginScreen from './src/login/login-screen';
import HomePage from './src/root-app/home/component';
import ProfileConfig from './src/root-app/profile/component';

const AppConstants = require('./src/service/constants');

export default class App extends Component {
	constructor(){
		super();
		this.state = {
			showPage: AppConstants.Pages.LoginOption,
			loginProvider: null,
			userId: null,
			profileRedirectViaHome: false,
			key: null
		};
	}

	openLoginPage(provider){
		this.setState((prevState) => {
			return {showPage: AppConstants.Pages.ProviderLogin, loginProvider: provider, key: null};
		});
	}

	async updateApiKey(key){
		await AsyncStorage.setItem(AppConstants.APIAuthKey, key);
		this.setState((prevState) => {
			return {...prevState, showPage: AppConstants.Pages.HomeScreen, key: key};
		});
	}

	openProfileConfig(provider, userId){
		this.setState((prevState) => {
			return {...prevState, showPage: AppConstants.Pages.Profile,
				loginProvider: provider, userId: userId, profileRedirectViaHome: true
			};
		});
	}

	componentWillMount(){
		const curr = this;
		AsyncStorage.getItem(AppConstants.APIAuthKey).then((token) => {
			if(token !== null){
				curr.setState((prevState) => {
					return {showPage: AppConstants.Pages.HomeScreen,
					loginProvider: null,
					key: token}
				});
			}else {
				curr.setState((prevState) => {
					return {showPage: AppConstants.Pages.LoginOption,
					loginProvider: null,
					key: null}
				});
			}
		}).catch((error) => {
			curr.setState((prevState) => {
				return {showPage: AppConstants.Pages.LoginOption,
				loginProvider: null,
				key: null}
			});
		});
	}

	render() {
		switch(this.state.showPage){
			case AppConstants.Pages.LoginOption:
				return React.createElement(Login, {openLogin: this.openLoginPage.bind(this)});
				break;
			case AppConstants.Pages.ProviderLogin:
				if(this.state.loginProvider == AppConstants.AzureADProvider){
					return React.createElement(LoginScreen, {url: AppConstants.AzureADLoginUrl, saveKey: this.updateApiKey.bind(this)});
				}else {
					return React.createElement(LoginScreen, {url: AppConstants.TwitterLoginUrl, saveKey: this.updateApiKey.bind(this)});
				}
				break;
			case AppConstants.Pages.HomeScreen:
				return React.createElement(HomePage, {apiKey: this.state.key, navToProfile: this.openProfileConfig.bind(this)});
				break;
			case AppConstants.Pages.Profile: 
				return React.createElement(ProfileConfig, {apiKey: this.state.key, 
						provider: this.state.loginProvider, 
						userId: this.state.userId,
						redirectViaHome: this.state.profileRedirectViaHome});
				break;
			default:
				return React.createElement(Login, {openLogin: this.openLoginPage.bind(this)});
				break;
		}
	}
}