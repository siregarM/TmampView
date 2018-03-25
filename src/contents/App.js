import React , { Component } from 'react';
import { Container, Content, Header, Body, Title, Text, ListItem, Left, List, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyLocation from '../contents/MyLocation';
import Kategori from '../contents/Kategori';
import About from '../components/About';
import Help from '../components/Help';
import {
    StyleSheet,
} from 'react-native';


export default class App extends Component {

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#3498db'}}>
                    <Body>
                        <Title style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 10}}>Beranda</Title>
                    </Body>
                </Header>
                <Content style={{ backgroundColor: '#ecf0f1'}}>
                    <List>
                        <ListItem onPress={this.gotoMyLocation.bind(this)}>
                            <Thumbnail square size={150} source={require('../assets/lokasi.png')} />
                            
                            <Body>
                                <Text style={{fontSize: 23}}>Lokasi</Text>
                                <Text note style={{ fontSize: 15}}>Mencari lokasi Rumah Sakit yang ada disekitar kita.</Text>
                            </Body>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem onPress={this.gotoKategori.bind(this)}>
                            <Thumbnail square size={150} source={require('../assets/rs.png')} />
                            <Body>
                                <Text style={{fontSize: 23}}>Rumah Sakit</Text>
                                <Text note style={{fontSize: 15}}>Mencari Rumah Sakit Umum atau Khusus yang ada di daerah Padang.</Text>
                            </Body>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem onPress={this.gotoHelp.bind(this)}>
                            <Thumbnail square size={150} source={require('../assets/bantuan.png')} />
                            <Body>
                                <Text style={{fontSize: 23}}>Bantuan</Text>
                                <Text note style={{fontSize: 15}}>Panduan atau tata cara menggunakan Aplikasi.</Text>
                            </Body>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem onPress={this.gotoAbout.bind(this)}>
                            <Thumbnail square size={150} source={require('../assets/tentang.png')} />
                            <Body>
                                <Text style={{fontSize: 23}}>Tentang</Text>
                                <Text note style={{fontSize: 15}}>Tentang Aplikasi atau Tujuan dibuatnya Aplikasi</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }

    
    gotoMyLocation() {
        this.props.navigator.push({
            component: MyLocation
        })
    }

    gotoKategori() {
        this.props.navigator.push({
            component: Kategori
        })
    }

    gotoHelp() {
        this.props.navigator.push({
            component: Help
        })
    }

    gotoAbout() {
        this.props.navigator.push({
            component: About
        })
    }
};
const styles = StyleSheet.create({
        boxImage: {
            borderRadius: 40,
            height: 80,
            marginRight:-30,
            width: 80,

    elevation: 1,
        },
        boxList: {
            backgroundColor: '#ecf0f1',
            width: 1000,
            height: 100,
            borderWidth: 0,
            borderRadius: 5,
            borderBottomWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 10, height: 5 },
            shadowOpacity: 0.98,
            shadowRadius: 2,
        },
    })