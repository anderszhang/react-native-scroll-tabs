import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,

} from 'react-native';

import Header from '../components/header/Header';
import Tabs from '../components/tabs/Tabs';

class Home extends Component {
    render() {
        return (
            <View style={{flex:1,height:44}}>
                <Header title={'健康直播'} />
                <Tabs />
            </View>
        );
    }
}

export default Home;