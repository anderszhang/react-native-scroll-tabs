import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
let styles = StyleSheet.create({

    bar: {
        height: 44
    },

    tabs: {
        flexDirection: 'row',   
    },

    tab: {
        paddingLeft: 15,
        paddingRight: 5,
        textAlign: 'center',
        lineHeight: 44
    },

    activeTab: {
        color: '#ff6f00'
    },

    activeTabLine: {
        height:2,
        position:'absolute',
        paddingLeft: 15,
        paddingRight: 5,
        left:10,
        right:0,
        bottom:4,
        backgroundColor: '#ff6f00'
    },

    flex1: {
        flex: 1
    }
});

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.tabsLayouts ={};
        this.tabsLength = 0;
        //滚动条位置
        this.scrollPosX = 0;
        //屏幕内Tab的游边界
        this.tabRightEdgeInScreen = 0;
        console.log("WINDOW_WIDTH"+WINDOW_WIDTH);
    }

    onPressTab(idx,evt){
        let {onTabClick} = this.props;
        //console.log(evt.nativeEvent)
        onTabClick&&onTabClick(idx);
        this.moveToActiveTab(idx);
    }

    moveToActiveTab(idx){

        let {width,left,right} =  this.tabsLayouts[idx];
        let newX = 0;
        //偏移值
        let halfWidth = this.tabContainerWidth/2;
        //如果选择的Tab在屏幕右侧
        if(right > this.tabContainerWidth){
            //默认屏幕右侧的选择tab,移动至屏幕正中
            newX = left - halfWidth + width/2 ;
            //Tab超出滚动区域的长度
            let outContainerLength = this.tabsLength - right;
            //如果右侧tab剩余的长度已经不满足半屏,经剩余的tab显示在屏幕中即可,
            //滚动条位置=tab总长度-屏幕外的长度
            if(outContainerLength < halfWidth){
                newX =  this.tabsLength - this.tabContainerWidth;
            }
            this.scrollPosX = newX;
            this._scrollView.scrollTo({x:newX,y:0,animated:false})
        }
        //在左侧的tab
        if(left < this.tabRightEdgeInScreen && this.scrollPosX > 0){
            newX = 0;
            this.scrollPosX = newX;
            this._scrollView.scrollTo({x:newX,y:0,animated:false})
        }
    }

    measureTabContainer(evt){
        const { width} = evt.nativeEvent.layout;
        this.tabContainerWidth = width;
        //console.log(this.tabContainerWidth);
    }

    measureTab(idx,evt){
        const { x, width, height, } = evt.nativeEvent.layout;
        let right = x+width;
        this.tabsLayouts[idx] = {left:x,right,width,height};
        //计算首屏显示的tab的外编辑
        if(x<this.tabContainerWidth && right >this.tabContainerWidth){
            this.tabRightEdgeInScreen = x;
        }
        if(idx == this.props.tabs.length-1){
            this.tabsLength = x + width;
        }
    }
    
    render() {
        let {activeIdx,tabs} = this.props;
        return (
            <View style={styles.bar} >
                <ScrollView  style={styles.tabs}
                ref={(scrollView) => { this._scrollView = scrollView; }}
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                onLayout={this.measureTabContainer.bind(this)}   >
                   
                    {tabs.map((item, idx) => {
                        return (
                            <TouchableWithoutFeedback onPress={this.onPressTab.bind(this,idx)} key={item.name} onLayout={this.measureTab.bind(this,idx)} >
                                <View>
                                    <Text style={[styles.tab, activeIdx==idx ? styles.activeTab : '']}>{item.name}</Text>
                                    <View style={activeIdx==idx ? styles.activeTabLine:''}></View>
                                </View>
                            </TouchableWithoutFeedback>

                        )
                    })}
                    
                </ScrollView>
            </View>
        );
    }
}

export default Tabs;