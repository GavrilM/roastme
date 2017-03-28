import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid
} from 'react-native'

import Nav from '../components/navigation'

export default class MainLayout extends Component{
    render(){
        return <DrawerLayoutAndroid
                    drawerWidth={300}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => Nav}>
                    
                </DrawerLayoutAndroid>
    }
}