import React, {Component} from 'react';
import {
    Container,
    Content,
    ListItem,
    Left,
    Body,
    Text,
    Thumbnail
} from 'native-base';
import {View, StyleSheet, Image, Navigator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Menu extends Component {
    

    render() {

        return (
            <Container>
                <Content>
                  <View style={styles.drawerLogo}>
                      <Image style={styles.drawer} source={require('../image/ic_launcher.png')}/>
                  </View>
                    <ListItem icon onPress={this.props.OnselectMyLocation}>
                        <Left>
                            <Icon name="location-arrow" size={20} />
                        </Left>
                        <Body>
                            <Text>Lokasi</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon onPress={this.props.OnselectHome}>
                        <Left>
                            <Icon name="home" size={20}/>
                        </Left>
                        <Body>
                            <Text>Rumah Sakit</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon onPress={this.props.OnselectAbout}>
                        <Left>
                            <Icon name="info-circle" size={20}/>
                        </Left>
                        <Body>
                            <Text style={{
                                paddingRight: 10
                            }}>Tentang</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon onPress={this.props.OnselectHelp}>
                        <Left>
                            <Icon name="question-circle" size={20}/>
                        </Left>
                        <Body>
                            <Text style={{
                                paddingRight: 10
                            }}>Bantuan</Text>
                        </Body>
                    </ListItem>
                </Content>
            </Container>
      );
    }
}

const styles = StyleSheet.create({
    drawerLogo: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    drawer: {
        width: 150,
        height: 150,
        marginTop: 70,
        marginBottom: 70
    }
})
