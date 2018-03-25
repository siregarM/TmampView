import React, {Component} from 'react';
import { DrawerLayoutAndroid, Navigator, BackAndroid, StyleSheet, Platform, Modal, View, Image, Linking, TouchableOpacity } from 'react-native';
import {
    Container,
    Header,
    Content,
    Input,
    Button,
    Text,
    Item,
    ListItem,
    Left,
    Right,
    Body,
    Thumbnail,
    List,
    Card,
    Spinner,
    CardItem
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends Component {

  constructor(props) {
      super(props);
      this.state = {
          radio1 : true,
          check1: false,
          modalVisible: false,
          search: '',
          selectedItem: undefined,
          results: {
              items: []
          },
          list: [],
          latitude: null,
          longitude: null,
          lat: null,
          lng: null,
      }
  }

  setModalVisible(visible, x) {
      this.setState({
          modalVisible: visible,
          selectedItem: x
      });
  }

  toggleCheck() {
      this.setState({
          check1 : !this.state.check1
      })
  }

  componentDidMount() {
      
      this.ListTempat();
      var that = this;
      this.search();
      this._setPosition();
      
      this.watchID = navigator.geolocation.watchPosition((position) => {
      var latitude = JSON.stringify(position.coords.latitude);
      var longitude = JSON.stringify(position.coords.longitude);
      this.setState({latitude , longitude});
    });

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
    _setPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                position: position
            });
        }, (error) => {
        }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    }

  search() {
        // Set loading to true when the search starts to display a Spinner
        this.setState({
            loading: true
        });

        var that = this;
        return fetch('http://128.199.82.65/'+'search?data='+this.state.search)
            .then((response) => response.json())
            .then((responseJson) => {
                // Store the results in the state variable results and set loading to
                // false to remove the spinner and display the list of repositories
                that.setState({
                    results: responseJson,
                    loading: false
                });

                return responseJson.Search;
            })
            .catch((error) => {

                that.setState({
                    loading: false
                });

                console.error(error);
        });
    }

  dir(latitude, longitude, lat, lng){

    const location = this.state;
    const url = `http://maps.google.com/maps?saddr=${location.latitude},${location.longitude}&daddr=${location.selectedItem.lat},${location.selectedItem.lng}`
    
    return Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      return Promise.reject(new Error(`Could not open the url: ${url}`))
    } else {
      return Linking.openURL(url)
    }
  })
 }

 ListTempat(props){
      fetch('http://128.199.82.65/api/tempat/'+this.props.id)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    render() {

      var that = this;
      const select = this.state.selectedItem;

        return (
            <Container style={{backgroundColor: '#fff'}}>
                <Header searchBar rounded>
                    <Item style={{ paddingRight: 5}}>
                        <Input placeholder="Cari Rumah Sakit" value={this.state.search}  onChangeText={(text) => this.setState({search:text})} onSubmitEditing={()=>this.search()}/>
                        <Icon active name="search" size={20} onPress={()=>this.search()}/>
                    </Item>
                </Header>
                <Card>
              <CardItem>
               <View style={{flexDirection: 'row'}}>
                 <View style={{justifyContent: 'center'}}>
                   <Image source={{uri:'http://128.199.82.65/images/'+ this.props.image}} style={{width: 80, height: 80,}}/>
                 </View>

                 <View style={{width: 0,flexGrow: 1, marginLeft: 3,}}>
                   <Text style={styles.listTitle}>{this.props.nama_tempat}</Text>
                  <Text style={styles.listContent}>{this.props.alamat}</Text>
                  <View style={{flexDirection:'row'}}>
                  <Button small onPress={()=> this.test(this.props.latitude, this.props.longitude)}><Icon name="map-marker" color="white"><Text>  Tunjukan </Text></Icon></Button>
                  </View>
                 </View>
                 </View>
              </CardItem>
          </Card>
            </Container>
        );
      }
  }

  const styles = StyleSheet.create({
      header : {
          marginLeft: -5,
          marginTop: 5,
          marginBottom: (Platform.OS==='android') ? -7 : 0,
          lineHeight: 24,
          color: '#5357b6'
      },
      modalImage: {
          resizeMode: 'contain',
          height: 200
      },
      bold: {
          fontWeight: '600'
      },
      negativeMargin: {
          marginBottom: -10
      }
  });
