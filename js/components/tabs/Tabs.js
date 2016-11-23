import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
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
        this.scrollPosX = 0;
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
            //如果右侧tab剩余的长度已经不满足半屏
            if(outContainerLength < halfWidth){
                //newX = this.tabContainerWidth - outContainerLength - width;
                //newX = newX - outContainerLength - width;
                newX =  this.tabsLength - this.tabContainerWidth;
            }

            //如果在一屏中,不需将其居中显示
            //if(newX - this.scrollPosX > halfWidth || this.scrollPosX ==0){
                 this.scrollPosX = newX;
                 this._scrollView.scrollTo({x:newX,y:0,animated:false})
            //}
           
        }
        //在左侧的tab
        if(left < 0){
            newX = left + halfWidth;
        }
        //console.log(tabRight);
    }

    measureTabContainer(evt){
        const { width} = evt.nativeEvent.layout;
        this.tabContainerWidth = width;
        //console.log(this.tabContainerWidth);
    }

    measureTab(idx,evt){
        const { x, width, height, } = evt.nativeEvent.layout;
        // if(idx>1){
        //     let preRight = this.tabsLayouts[idx-1].right;
        // }
        //console.log(evt.nativeEvent.layout);
        this.tabsLayouts[idx] = {left:x,right:x+width,width,height};
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
                            <TouchableOpacity onPress={this.onPressTab.bind(this,idx)} key={item.name} onLayout={this.measureTab.bind(this,idx)} >
                                <View>
                                    <Text style={[styles.tab, activeIdx==idx ? styles.activeTab : '']}>{item.name}</Text>
                                    <View style={activeIdx==idx ? styles.activeTabLine:''}></View>
                                </View>
                            </TouchableOpacity>

                        )
                    })}
                    
                </ScrollView>
            </View>
        );
    }
}

export default Tabs;