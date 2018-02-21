import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

import CardList from './card-item';

export default class UserHome extends React.Component {
    render(){
        return <ScrollView>
            <View style={styles.container}>
            <CardList icon="&#xf2e7;" 
                text="Menu" 
                openView={this.props.openView} 
                viewName="MenuList" 
                params={
                    {
                        apiKey: this.props.apiKey, 
                        vegOnly: false, 
                        updateMenuList: this.props.updateMenuList,
                        updateCart: this.props.updateCart,
                        inCartItems: this.props.inCartItems
                    }
                } />
            <CardList icon="&#xf2e5;" text="Past Orders" openView={this.props.openView}/>
            <CardList icon="&#xf007;" text="Profile" openView={this.props.openView}/>
            </View>
        </ScrollView>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});