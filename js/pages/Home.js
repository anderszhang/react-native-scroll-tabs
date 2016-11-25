import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,

} from 'react-native';

import Header from '../components/header/Header';
import Tabs from '../components/tabs/Tabs';
import ViewPager from '../components/viewPager/ViewPager';

class Home extends Component {

    state = {
        tabIdx: 0
    }

    onTabClick(idx) {
        this.setState({ tabIdx: idx });
    }

    _onPageScroll(){

    }

    _onPageSelected(info){
        this.onTabClick(info.position);
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
            <View style={{ flex: 1 }}>
                <Header title={'标题'} />
                <Tabs activeIdx={this.state.tabIdx} tabs={tabs} onTabClick={this.onTabClick.bind(this)} />
                <ViewPager style={{marginTop:0}}
                    initialPage = {this.state.tabIdx}
                    onPageScroll={this._onPageScroll.bind(this)}
                    onPageSelected={this._onPageSelected.bind(this)}>
                    {tabs.map((tab,idx)=>{
                        return(
                            <View key={tab.name}>
                                <Text>{tab.name}</Text>
                            </View>
                        )
                    })}
                </ViewPager>
            </View>
        );
    }
}

export default Home;