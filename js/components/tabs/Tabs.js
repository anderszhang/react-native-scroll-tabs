import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';

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
        //Tab项总长
        this.tabsWidth = 0;
        //Tab显示区域宽度
        this.tabsViewportWidth = 0;
        //Tab显示区左边界
        this.tabsViewportLeftPosX = 0;
        //Tab显示区右边界
        this.tabsViewportRightPosX = 0;

    }

    onPressTab(idx,evt){
        let {onTabClick} = this.props;
        //console.log(evt.nativeEvent)
        onTabClick&&onTabClick(idx);
        this.moveToActiveTab(idx);
    }

    moveToActiveTab(idx){
        let {width,left,right} =  this.tabsLayouts[idx];
        //如果选择的Tab在屏幕之外,需要重新设定滚动条位置
        if(left < this.tabsViewportLeftPosX || right > this.tabsViewportRightPosX ){
            let newX = 0;
            //半屏宽度值
            let halfWidth = this.tabsViewportWidth/2;
            //right < this.tabsViewportWidth 表明选择Tab在首屏
            //left < this.tabsViewportLeftPosX 表明在左侧未显示全
            //对首屏,在左侧未显示全的Tab,滚动条X坐标设0,即可显示全
            if(left < this.tabsViewportLeftPosX && right < this.tabsViewportWidth){
                newX = 0;
            }else{
                //其他在屏幕外的选择tab,移动至屏幕正中即可
                newX = left - halfWidth + width/2 ;
                //Tab超出滚动区域的长度
                let outContainerLength = this.tabsWidth - right;
                //如果右侧tab剩余的长度已经不满足半屏,经剩余的tab显示在屏幕中即可,
                //滚动条位置=tab总长度-tab显示宽度
                if(outContainerLength < halfWidth){
                    newX =  this.tabsWidth - this.tabsViewportWidth;
                }
            }

            this.tabsViewportLeftPosX = newX;
            this.tabsViewportRightPosX = this.tabsViewportLeftPosX + this.tabsViewportWidth;
            this._scrollView.scrollTo({x:newX,y:0,animated:false})
        }
    }

    measureTabContainer(evt){
        const { width} = evt.nativeEvent.layout;
        this.tabsViewportWidth = width;
        this.tabsViewportLeftPosX = 0;
        this.tabsViewportRightPosX = this.tabsViewportLeftPosX + this.tabsViewportWidth;
    }

    measureTab(idx,evt){
        const { x, width, height, } = evt.nativeEvent.layout;
        let right = x+width;
        this.tabsLayouts[idx] = {left:x,right,width,height};
        if(idx == this.props.tabs.length-1){
            this.tabsWidth = right;
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