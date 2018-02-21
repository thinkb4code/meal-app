import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';

export default class ItemList extends React.Component {
    render() {
        return <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={() => this.props.openItemCard(this.props.menuItem)}>
                            <Image source={{uri: this.props.menuItem.Image}} style={styles.itemImage} resizeMode="stretch" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailsContainer}>
                        <TouchableOpacity onPress={() => this.props.openItemCard(this.props.menuItem)}>
                            <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">{this.props.menuItem.ItemName}</Text>
                            <Text style={styles.itemDesc} numberOfLines={2} ellipsizeMode="tail">{this.props.menuItem.Description}</Text>
                        </TouchableOpacity>
                        <View style={styles.contolContainer}>
                            <TouchableOpacity onPress={() => this.props.updateCart(this.props.screenKey, this.props.menuItem.id, 'remove', 1)}>
                                <Text style={[styles.faFamily, styles.control]}>&#xf146;</Text>
                            </TouchableOpacity>

                            <Text style={[styles.control, {marginTop: -4}]}>
                            {
                                this.props.inCart && this.props.inCart.length == 1 ? this.props.inCart[0].qty : '0'
                            }
                            </Text>

                            <TouchableOpacity onPress={() => this.props.updateCart(this.props.screenKey, this.props.menuItem.id, 'add', 1)}>
                                <Text style={[styles.faFamily, styles.control]}>&#xf0fe;</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.priceContainer} onPress={() => this.props.openItemCard(this.props.menuItem)}>
                        <Text>${this.props.menuItem.Price.toFixed(2)}</Text>
                        <Text style={[styles.viewIcon, styles.faFamily]}>&#xf054;</Text>
                    </TouchableOpacity>
                </View>
        </View>;
    }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 10
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    imageContainer: {
        flex: 1,
        padding: 2,
        justifyContent: 'center'
    },
    itemImage: {
        flex: 1,
        height: (window.width/4 - 4)
    },
    detailsContainer: {
        flex: 2,
        padding: 2,
    },
    itemName: {
        color: '#000',
        fontSize: 14,
        marginBottom: 4
    },
    itemDesc: {
        color: '#999',
        textAlign: 'justify',
        fontSize: 10
    },
    priceContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 2,
    },
    viewIcon: {
        marginLeft: 15,
        color: '#ccc'
    },
    faFamily:{
        fontFamily: 'FaSolid'
    },
    contolContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 15,
        paddingLeft: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    control: {
        flex: 1,
        textAlign: 'center',
        fontSize: 28
    }
})