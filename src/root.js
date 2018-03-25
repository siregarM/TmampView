import React, { Component } from 'react';
import { BackAndroid, DrawerLayoutAndroid, View, Text } from 'react-native';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import Splash from './Splash';
import Home from './contents/Home';
import Menu from './components/Menu';
import About from './components/About';
import Help from './components/Help';
import Kategori from './contents/Kategori';
import MyLocation from './contents/MyLocation';

export default class root extends Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.appNav && this.appNav.getCurrentRoutes().length > 1) {
        this.appNav.pop();
        return true;
      }
        return false;
    });
  }

  render() {
    return (
      <NavigationExperimental.Navigator
        renderScene={this.renderScene}
        initialRoute={{component: Splash}}
        ref={(nav) => { this.appNav = nav; }}
       />
      );
    }

    renderScene(route, navigator) {
      return <route.component navigator={navigator} {...route.passProps} />
    }
}
