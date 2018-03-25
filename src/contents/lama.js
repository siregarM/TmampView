import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import MapView from 'react-native-maps';
import { Fab, Content } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MyLocation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -0.9206402,
        longitude: 100.3653453,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      items:[],
      markers: [],
      selectedItem: undefined,
      latitude: null,
      longitude: null,
      lat: null,
      lng: null
    }
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  setModalVisible(visible, x) {
      this.setState({
          modalVisible: visible,
          selectedItem: x
      });
  }
  

  componentDidMount() {
    this.mapMarkers();
    navigator.geolocation.getCurrentPosition (
      (position) => {
        this.setState({
          region: {
            ...this.state.region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        });
        console.log("getCurrentPosition Succes");
        var latitude = JSON.stringify(position.coords.latitude);
        var longitude = JSON.stringify(position.coords.longitude);
        this.setState({latitude , longitude});
        this.watchPosition();
      },
      (error) => {
        alert(error)
      },
      {enableHightAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  watchPosition() {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        console.log("Watch Position Succes");
        if(this.props.followUser) {
          this.map.animateToRegion(this.newRegion(position.coords.latitude, position.coords.longitude));
        }
      },
      (error) => {
        alert(error)
      },
      {enableHightAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  mapMarkers() {
    return fetch('https://isnanmahmud57.000webhostapp.com/api/tempat/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          markers: responseJson
        });
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  animateTo(item) {    
    this.map.animateToCoordinate({
       latitude: item.coordinate.latitude,
       longitude: item.coordinate.longitude
    }, 2);
}   

  getDirection(latitude, longitude, lat, lng) {

    const location= this.state;
    const marker = this.state.markers;
    const url = `http://maps.google.com/maps?saddr=${location.latitude},${location.longitude}&daddr=${lat},${lng}`
    
    return Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      return Promise.reject(new Error(`Could not open the url: ${url}`))
    } else {
      return Linking.openURL(url)
    }
  })
}

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider="google"
          showsMyLocationButton={true}
          showsUserLocation={true}
          zoomEnabled={true}
          scrollEnabled={true}
          showsScale={true}
          showsCompass={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange} >
          {this.state.markers.map((marker, i) => {
          // kasih kondisi-kondisi di sini
          // misal
          let markerColor
          if (marker.kategori_id == 2) markerColor = '#f200d5'
          else markerColor = '#000cfc'

            return (
            <MapView.Marker
              key={i}
              pinColor={markerColor}
              coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
              title={marker.nama_tempat}
              description={marker.alamat}
              onPress={() => this.getDirection(this.state.latitude, this.state.longitude, parseFloat(marker.latitude), parseFloat(marker.longitude))}
            />
            )

          })}
        </MapView>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 500,
    flex: 1,
  },
  map: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
    },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
})
