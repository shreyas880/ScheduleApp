import React, { Component} from 'react';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import {Header} from 'react-native-elements';

export class MyHeader extends React.Component{
    render(){
        return(
            <View>
                <Header centerComponent={{text:this.props.title,style:{fontWeight:'600',fontSize:22}}}/>
            </View>
        );
    }
}