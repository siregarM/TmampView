import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Navigator } from 'react-native';
import App from './contents/App';

 export default class Splash extends Component {

    componentWillMount () {
        setTimeout (() => {
            this.props.navigator.replace({
                component: App,
            });
        }, 2000);
    }

    render () {
        return (
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image style={styles.image} source={require('./image/ic_launcher.png')} />
                <Text style={styles.title}>Hospital Apps</Text>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1 ,
    flexDirection: 'column'
  },
  image: {
    width: 170,
    height: 170,
    marginBottom: 30
  },
  title : {
    color: 'white',
    fontSize : 25,
    fontWeight: 'bold'
  }
})
