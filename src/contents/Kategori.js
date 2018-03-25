import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ListView,
  Navigator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import list from './bantuan';

// import { StackNavigator } from 'react-navigation'

import { 
 ListItem,
 List,
 Thumbnail,
 Left,
 Right,
 Body,
 Button,
 Card, 
 CardItem,
 StyleProvider,
 Header,
 Title,
 Item,
 Input
  } from 'native-base';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Kategori extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        dataSource: ds,
        modalList: false,
        modalDetail: false
    };
  }
  
  componentWillMount() {
    fetch('https://sanahama.000webhostapp.com/api/kategori/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: ds.cloneWithRows(responseJson) });
      })
      .catch((error) => {
        console.error(error);
      });
  }

   List(visible) {
        this.setState({
            modalList: visible,
        });
    }

    Detail(visible) {
        this.setState({
            modalDetail: visible,
        });
    }
 render() {
  // const { navigate } = this.props.navigation; 
      return (

        <View style={styles.container}>
            <Header>
                <Body style={{paddingRight: 10}}>
                    <Title>Kategori</Title>
                </Body>
          </Header>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(data) => <Row {...data} />}
          />

        </View>
      
      );
  } 
}

class Row extends Component{
  constructor(props){
    super(props);
    this.state = {
        dataSource: ds,
        modalList: false,
        modalDetail: false,
        results: {
          items: []
        },
        select : '',
        search: ''
    }
  }
 
    componentWillMount() {
      this.search();
      this.ListTempat();
  }
  
    ListTempat(props){
      fetch('https://sanahama.000webhostapp.com/api/tempat/'+this.props.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: ds.cloneWithRows(responseJson) });
      })
      .catch((error) => {
        console.error(error);
      });
    }
    List(visible, x) {
        this.setState({
            modalList: visible,
            select : x
        });
    }

    Detail(visible) {
        this.setState({
            modalDetail: visible,
        });
    }

    search() {
        // Set loading to true when the search starts to display a Spinner
        this.setState({
            loading: true
        });

        var that = this;
        return fetch('https://sanahama.000webhostapp.com/'+'search?data='+this.state.search)
            .then((response) => response.json())
            .then((responseJson) => {
                // Store the results in the state variable results and set loading to
                // false to remove the spinner and display the list of repositories
                that.setState({
                    results: responseJson.data,
                    dataSource: ds.cloneWithRows(responseJson.data),
                    loading: false
                });
                const results = this.state.results;
                console.log(results);
                return responseJson.Search;
            })
            .catch((error) => {

                that.setState({
                    loading: false
                });

                console.error(error);
        });
    }

  render(){
    return(
      <View>
          <TouchableOpacity onPress={()=>this.List(true, this.props.id)}>
            <Image
            style={styles.item}
            source={{uri: 'https://sanahama.000webhostapp.com/images/'+this.props.image}}/>
         </TouchableOpacity>

           <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalList}
              onRequestClose={() => {this.List(!this.state.modalList)}}
              >
          
          <Header searchBar rounded>
              <Item style={{ paddingRight: 5}}>
                  <Input placeholder="Cari Rumah Sakit" value={this.state.search}  onChangeText={(text) => this.setState({search:text})} onSubmitEditing={()=>this.search()}/>
                  <Icon active name="search" size={20} onPress={()=>this.search()}/>
              </Item>
          </Header>

          <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) => <Detail {...data}/>}
          />

              </Modal>

        </View>
        
    );
  }
}

class Detail extends Component{
  constructor(props){
    super(props);
    this.state = {
        modalDetail: false,
        select : '',
        latitude: null,
        longitude: null,
        lat: null,
        lng: null
    }
  }
 
    Detail(visible, x) {
        this.setState({
            modalDetail: visible,
            select : x
        });
    }
    componentDidMount(){
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
        }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 0});
    }




 test(lat, lng){
  //  console.warn(lat, lng);

    const location = this.state;
    const url = `http://maps.google.com/maps?saddr=${location.latitude},${location.longitude}&daddr=${lat},${lng}`
    
    return Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      return Promise.reject(new Error(`Could not open the url: ${url}`))
    } else {
      return Linking.openURL(url)
    }
  })
 }

  render(){
    
    return(
      <View>
        <Card>
              <CardItem>
               <View style={{flexDirection: 'row'}}>
                 <View style={{justifyContent: 'center'}}>
                   <Image source={{uri:'https://sanahama.000webhostapp.com/images/'+ this.props.image}} style={{width: 80, height: 80,}}/>
                 </View>

                 <View style={{width: 0,flexGrow: 1, marginLeft: 3,}}>
                   <Text style={styles.listTitle}>{this.props.nama_tempat}</Text>
                  <Text style={styles.listContent}>{this.props.alamat}</Text>
                  <View style={{flexDirection:'row'}}>
                  <Button small onPress={()=> this.test(this.props.latitude, this.props.longitude)}><Icon name="map-marker" color="white"><Text style={{color: 'white'}}>  Tunjukan </Text></Icon></Button>
                  </View>
                 </View>
                 </View>
              </CardItem>
          </Card>
           

           <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalDetail}
              onRequestClose={() => {this.Detail(!this.state.modalDetail)}}
              >
          
            <View style={styles.container}>
          <Text style={styles.judul}>Detail</Text>
         <Text style={styles.judul}>{this.props.keterangan}</Text>
         

        </View>

              </Modal>

        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listKat: {
    height: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 3,
    padding: 5,
    backgroundColor: 'red'
  },
    list: {
     
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    item: {
        margin: 3,
        height: 300,
    },
    judul: {
      fontFamily: 'Roboto-Medium',
      fontSize: 20,
      textAlign: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    listContent: {
      fontFamily : 'Roboto',
      fontSize: 12,
      flex: 1,
      flexWrap: 'wrap'
    },
    listTitle: {
      fontFamily : 'Roboto-Medium',
      fontSize: 14,
      flexWrap: 'wrap'
    },
     row: { 
       flexDirection: 'row', 
       justifyContent: 'center', 
       padding: 3, 
      }, 
     thumb: { 
       width: 80, 
       height: 80,
       marginRight: 5 
      }, 
     text: { 
       flex: 1, 
      },

});
