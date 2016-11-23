import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';

let styles = StyleSheet.create({
    header : {
        backgroundColor: '#ff6f00',
        height: 44
    },

    title:{
        top:24,
        textAlign:'center',
        color: 'white'
    }
})
class Header extends Component {
    render() {
        let {title} = this.props; 
        return (
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }
}

export default Header;