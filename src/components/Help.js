import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

export default class Help extends Component {
    render() {
        return (
            <View style={styles.container}>
              <ScrollView>
                <View style={styles.logoContainer}>
                  <Text style={{color: 'black', marginBottom: 25, fontSize: 20}}>Bantuan</Text>
                  <Image style={styles.image} source={require('../image/ic_launcher.png')} />
                </View>
                <View style={{flexDirection:'column', padding: 10}}>
                  <Text style={{padding:10 , marginBottom: 10}}>1.Pilih Salah Satu Menu di Beranda Aplikasi</Text>
                  <View style={{flexDirection:'row'}}>
                    <Image 
                      source={require('../image/beranda.png')}
                      style={{width: 200, height: 300, alignItems: 'center', justifyContent: 'center', padding: 10}}
                      />
              </View>
              <View style={{flexDirection:'column', padding: 10}}>
                <Text style={{marginBottom: 10}}>2. Menu Lokasi , untuk mencari Rumah Sakit sekitar kita . Click Icon Marker untuk menuju Lokasi</Text>
                <View style={{flexDirection:'row'}}>
                  <Image 
                    source={require('../image/lokasi.png')}
                    style={{width: 200, height: 300, alignItems: 'center', justifyContent: 'center'}}
                    />
                </View>
              </View>
              <View style={{flexDirection:'column', padding: 10}}>
                <Text style={{marginBottom: 10}}>3. Menu Kategori , disajikan untuk mencari Rumah Sakit Umum atau Rumah Sakit Khusus</Text>
                <View style={{flexDirection:'row'}}>
                  <Image 
                    source={require('../image/kategori.png')}
                    style={{width: 200, height: 300}}
                  />
                </View>
            </View>
            <View style={{flexDirection:'column', padding: 10}}>
              <Text style={{marginBottom: 10}}>4. Click Button Tunjukan untuk menuju ke lokasi Rumah Sakit yang Kita Pilih</Text>
              <View style={{flexDirection:'row'}}>
                <Image 
                  source={require('../image/list.png')}
                  style={{width: 200, height: 300}}
                />
              </View>
            </View>
                </View>
              </ScrollView>
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
    color: 'black',
    marginTop: 10
  }
})
