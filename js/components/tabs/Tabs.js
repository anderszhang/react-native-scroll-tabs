import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';

let styles = StyleSheet.create({

    bar:{
        height: 44
    },

    horizontalRow:{
        flexDirection : 'row',
        borderColor: 'green',
        borderWidth:2,
        borderStyle:'solid'
    },

    item:{
        width: 80,
        height: 44,
        textAlign: 'center',
        lineHeight:44,
        borderColor: 'red',
        borderWidth:2,
        borderStyle:'solid'
    },

    flex1:{
        flex: 1
    }
});

class Tab extends Component{

}

class Tabs extends Component {
    constructor(props){
        super(props);
        this.items = [
            {'name':'热门'},{'name':'直播'},
            {'name':'健康天天聊'},{'name':'美食天下'},{'name':'六个核桃'}
        ]
    }
    render() {
        return (
            <View style={styles.bar} >
                <ScrollView style={styles.horizontalRow} horizontal={true}  >
                   {this.items.map((item,idx)=>{
                      return( 
                          <TouchableWithoutFeedback >
                            <Text style={styles.item}>{item.name}</Text>
                          </TouchableWithoutFeedback>
                        )
                    })}
                </ScrollView>
            </View>
        );
    }
}

export default Tabs;