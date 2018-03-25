import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default class About extends Component {
    render() {
        return (
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image style={styles.image} source={require('../image/ic_launcher.png')} />
                <Text style={styles.title}>Hospital Apps adalah Aplikasi Pencarian Rumah Sakit di daerah Padang . Aplikasi ini diperuntukan untuk masyarakat yang kurang mengenal lokasi Rumah Sakit di daerah Padang</Text>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logoContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 25
    },
    title: {
       fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
})
