import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MainLayout from 'layouts/main'

export default class RoastMe extends Component{
    render(){
        return <View style={style.container}>
                    <MainLayout/>
                </View>
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    }
})