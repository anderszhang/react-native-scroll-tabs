import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,

} from 'react-native';

import Header from '../components/header/Header';
import Tabs from '../components/tabs/Tabs';

class Home extends Component {

    state = {
        tabIdx: 1
    }

    onTabClick(idx) {
        this.setState({ tabIdx: idx });
    }


    render() {
        let tabs = [
            { 'name': '栏目1' }, { 'name': '栏目2' },
            { 'name': '栏目3' }, { 'name': '栏目4' }, { 'name': '栏目5' }, { 'name': '栏目6' },
            { 'name': '栏目7' }, { 'name': '栏目8' }, { 'name': '栏目9' }, { 'name': '栏目10' },
            { 'name': '栏目11' }, { 'name': '栏目12' }, { 'name': '栏目13' }, { 'name': '栏目14' },
            { 'name': '栏目15' }, { 'name': '栏目16' }
        ];
        return (
            <View style={{ flex: 1, height: 44 }}>
                <Header title={'健康直播'} />
                <Tabs activeIdx={this.state.tabIdx} tabs={tabs} onTabClick={this.onTabClick.bind(this)} />
            </View>
        );
    }
}

export default Home;