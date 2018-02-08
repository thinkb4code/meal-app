import React from 'react';
import {View, ScrollView, Text, ImageBackground, StyleSheet, TextInput, Switch, Picker, TouchableOpacity} from 'react-native';
const AppConstants = require('../../service/constants');

export default class ProfileConfig extends React.Component{
    constructor(props){
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            id: `${params.provider}@${params.userId}`,
            fullName: 'Manish Singh Rana',
            mobile: '9866062309',
            vegetarianOnly: true,
            buildingLocation: null,
            floorOrDivision: null,
            deskNumOrExtension: '123'
        }
    }

    saveProfile() {
        const headers = new Headers();
        const body = JSON.stringify(this.state);
        headers.append('X-ZUMO-AUTH', this.props.navigation.state.params.apiKey);
        headers.append('ZUMO-API-VERSION', '2.0.0');
        headers.append('Content-Type', 'application/json');
        const curr = this;

        fetch(AppConstants.UserProfile, 
            {
                method: 'POST',
                headers: headers,
                body: body
            }
        ).then((resp) => {
            return resp.json().then((data) => {
                if(typeof(data) === "object"){
                    curr.props.navigation.state.params.updateHomePage(data.vegetarianOnly);
                    curr.props.navigation.goBack();
                }
            });
        }).catch((error) => {
            debugger;
        });
    }

    render(){
        return <View style={styles.container}>
            {/* <Text>Profile Page...!!</Text>
            <Text>{this.props.apiKey}</Text>
            <Text>{this.props.provider}</Text>
            <Text>{this.props.userId}</Text> */}
            <ImageBackground source={require('../../assets/app_bg.jpg')} style={styles.bgImage}>
                <ScrollView style={[styles.bgOverlapView]}>
                    <Text style={styles.title}>Profile Settings</Text>
                    {this.props.navigation.state.params.redirectViaHome && <Text>Please complete your profile first.</Text>}
                    
                    <Text>Full Name</Text>
                    <TextInput onChangeText={(text) => this.setState({...this.state, fullName: text})} value={this.state.fullName} />
                    
                    <Text>Mobile Number</Text>
                    <TextInput onChangeText={(text) => this.setState({...this.state, mobile: text})} value={this.state.mobile} />
                    
                    <View style={styles.prefView}>
                        <Text>Vegetarian</Text>
                        <Switch value={this.state.vegetarianOnly} onValueChange={(val) => this.setState({...this.state, vegetarianOnly: val})} />
                    </View>

                    <Text>Select Building</Text>
                    <Picker selectedValue={this.state.buildingLocation} onValueChange={(val, index) => this.setState({...this.state, buildingLocation: val})} >
                        {
                            AppConstants.OfficeBuilding.map((item) => {
                                return <Picker.Item label={item} value={item} />;
                            })
                        }
                    </Picker>

                    <Text>Select Floor</Text>
                    <Picker selectedValue={this.state.floorOrDivision} onValueChange={(val, index) => this.setState({...this.state, floorOrDivision: val})} >
                        {
                            AppConstants.OfficeFloors.map((item) => {
                                return <Picker.Item label={item} value={item} />;
                            })
                        }
                    </Picker>

                    <Text>Desk or Ext. Number</Text>
                    <TextInput onChangeText={(text) => this.setState({...this.state, deskNumOrExtension: text})} value={this.state.deskNumOrExtension} />
                    
                    <TouchableOpacity style={styles.saveButton} onPress={this.saveProfile.bind(this)}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    bgImage: {
        flex: 1,
        width: null,
        alignSelf: 'stretch'
    },
    bgOverlapView: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
    },
    prefView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10
    },
    title: {
        fontSize: 30,
        paddingBottom: 20
    },
    saveButton: {
        marginBottom: 40
    }
});