import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'

import Showdata from './components/Showdata'
import Newdata from './components/Newdata'

export default class App extends React.Component {
  render(){

    const MyTab=createBottomTabNavigator({
      Adddata:{
        screen:Newdata,
        navigationOptions:{
          tabBarLabel:"Add Some Data",
          tabBarIcon:({tintColor})=><Icon name="plus-circle" color={tintColor}></Icon>
        }
      },
      Showdata:{
        screen:Showdata,
        navigationOptions:{
          tabBarLabel:"Available Data",
          tabBarIcon:({tintColor})=><Icon name="tags" color={tintColor}></Icon>
        }
      }
    },{
      initialRouteName:"Showdata"
    })

    const AppContainer=createAppContainer(MyTab)

    return(
      <AppContainer></AppContainer>
    )
  }
}

