/*
 * Scroll Tabs
 * @Author: zhangshubin 
 * @Date: 2016-11-26 04:59:58 
 */

import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';

let styles = StyleSheet.create({

    bar: {
        height: 45
    },

    tabs: {
        flexDirection: 'row',
        height: 45,
        marginRight: 45
    },

    line: {
        backgroundColor: '#e0e0e0',
        height: 1
    },


    tab: {
        fontSize: 16,
        paddingLeft: 15,
        paddingRight: 5,
        textAlign: 'center',
        lineHeight: 45
    },

    activeTab: {
        color: '#ff6f00'
    },

     moreBtnBox: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: 45,
        width: 45
    },
    moreBtn: {
        position: 'absolute',
        right: 12,
        top: 18
    },

    allText: {
        marginTop: 30,
        marginLeft: 15,
        fontSize: 13,
        color: '#999999'
    },

    itemContainer: {
        position: 'absolute',
        top: 45
    },
    itemGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    itemView: {
        borderColor: '#cccccc',
        borderRadius: 100,
        borderWidth: 1,
        height: 30,
        marginTop: 15,
        marginLeft: 15,
        paddingLeft: 4,
        paddingRight: 4
    },

    activeItemView: {
        borderColor: 'white'
    },

    itemText: {
        color: '#666666',
        textAlign: 'center',
        top: 5,
        fontSize: 15,
        fontWeight: "200"
    },

    activeTabLine: {
        height: 2,
        position: 'absolute',
        paddingLeft: 15,
        paddingRight: 5,
        left: 10,
        right: 0,
        bottom: 0,
        backgroundColor: '#ff6f00'
    }
});

var {height, width} = Dimensions.get('window')

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.tabsLayouts = {};
        //Tab项总长
        this.tabsWidth = 0;
        //Tab显示区域宽度
        this.tabsViewportWidth = 0;
        //Tab显示区左边界
        this.tabsViewportLeftPosX = 0;
        //Tab显示区右边界
        this.tabsViewportRightPosX = 0;
    }

    state = {
        itemContainerVisalbe: false
    }

    componentWillMount() {
        let {width} = Dimensions.get('window');
        this.itemViewWidth = (width - 15) / 4 - 15;
    }


    onPressTab(idx) {
        let {onTabClick} = this.props;
        //console.log(evt.nativeEvent)
        onTabClick && onTabClick(idx);
        this.moveToActiveTab(idx);
    }

    onPressMoreBtn() {
        this.setState({
            itemContainerVisalbe: !this.state.itemContainerVisalbe
        })
    }

    onPressItemView(idx){
        this.onPressTab(idx);
        this.onPressMoreBtn();
    }

    moveToActiveTab(idx) {
        let {width, left, right} = this.tabsLayouts[idx];
        //如果选择的Tab在屏幕之外,需要重新设定滚动条位置
        if (left < this.tabsViewportLeftPosX || right > this.tabsViewportRightPosX) {
            let newX = 0;
            //半屏宽度值
            let halfWidth = this.tabsViewportWidth / 2;
            //right < this.tabsViewportWidth 表明选择Tab在首屏
            //left < this.tabsViewportLeftPosX 表明在左侧未显示全
            //对首屏,在左侧未显示全的Tab,滚动条X坐标设0,即可显示全
            if (left < this.tabsViewportLeftPosX && right < this.tabsViewportWidth) {
                newX = 0;
            } else {
                //其他在屏幕外的选择tab,移动至屏幕正中即可
                newX = left - halfWidth + width / 2;
                //Tab超出滚动区域的长度
                let outContainerLength = this.tabsWidth - right;
                //如果右侧tab剩余的长度已经不满足半屏,经剩余的tab显示在屏幕中即可,
                //滚动条位置=tab总长度-tab显示宽度
                if (outContainerLength < halfWidth) {
                    newX = this.tabsWidth - this.tabsViewportWidth;
                }
            }

            this.tabsViewportLeftPosX = newX;
            this.tabsViewportRightPosX = this.tabsViewportLeftPosX + this.tabsViewportWidth;
            this._scrollView.scrollTo({ x: newX, y: 0, animated: true })
        }
    }

    measureTabContainer(evt) {
        const { width} = evt.nativeEvent.layout;
        this.tabsViewportWidth = width;
        this.tabsViewportLeftPosX = 0;
        this.tabsViewportRightPosX = this.tabsViewportLeftPosX + this.tabsViewportWidth;
    }

    measureTab(idx, evt) {
        const { x, width, height, } = evt.nativeEvent.layout;
        let right = x + width;
        this.tabsLayouts[idx] = { left: x, right, width, height };
        if (idx == this.props.tabs.length - 1) {
            this.tabsWidth = right;
        }
    }

    render() {
        let {activeIdx, tabs} = this.props;
        return (
            <View style={styles.bar} >
                <ScrollView style={styles.tabs}
                    ref={(scrollView) => { this._scrollView = scrollView; } }
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    onLayout={this.measureTabContainer.bind(this)}   >
                    {tabs.map((item, idx) => {
                        return (
                            <TouchableWithoutFeedback onPress={this.onPressTab.bind(this, idx)} key={item.name} onLayout={this.measureTab.bind(this, idx)} >
                                <View>
                                    <Text style={[styles.tab, activeIdx == idx ? styles.activeTab : '']}>{item.name}</Text>
                                    <View style={activeIdx == idx ? styles.activeTabLine : ''}></View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
                </ScrollView>
                <View style={styles.line}></View>
                <TouchableWithoutFeedback onPress={this.onPressMoreBtn.bind(this)}>
                    <View style={styles.moreBtnBox}>
                        <Image style={styles.moreBtn}
                        source={this.state.itemContainerVisalbe ? require('../../../images/menu-expland.png') : require('../../../images/menu-close.png')}></Image>
                    </View>
                   
                </TouchableWithoutFeedback>
                {this.renderItemGroup(tabs, activeIdx)}
            </View>
        );
    }

    renderItemGroup(tabs, activeIdx) {
        if (!this.state.itemContainerVisalbe) {
            return;
        } else {
            return (
                <View style={styles.itemContainer} vis>
                    <Text style={styles.allText}>全部栏目</Text>
                    <View style={styles.itemGroup}>
                        {tabs.map((item, idx) => {
                            return (
                                <TouchableWithoutFeedback onPress={this.onPressItemView.bind(this, idx)} key={item.name}>
                                    <View style={[styles.itemView, { 'width': this.itemViewWidth }, activeIdx == idx ? styles.activeItemView : '']} >
                                        <Text style={[styles.itemText, activeIdx == idx ? styles.activeTab : '']}>{item.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })}
                    </View>
                </View>
            )
        }
    }
}

export default Tabs;