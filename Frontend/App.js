//import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';

import Login from './src/login/component';
import LoginScreen from './src/login/login-screen';
import HomePage from './src/root-app/home/component';
import ProfileConfig from './src/root-app/profile/component';

const MealApp = StackNavigator({
	LoginProvider: {
		screen: Login,
		navigationOptions: {
			header: null
		}
	},
	LoginPage: {
		screen: LoginScreen,
		navigationOptions: {
			header: null
		}
	},
	ProfileConfig: {
		screen: ProfileConfig,
		navigationOptions: {
			title: 'Profile'
		}
	},
	MainApp: {
		screen: HomePage,
		navigationOptions: {
			title: 'Menu'
		}
	}
}, {initialRouteName: 'LoginProvider'});

export default MealApp;