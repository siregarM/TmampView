import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import  MapView from 'react-native-maps';
import { Fab, Content } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class screens extends Component {
  constructor(props) {
  super(props);
    this.state = {
      region: {
        latitude: -0.9206402,
        longitude: 100.3653453,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
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
  };

  setModalVisible(visible, x) {
      this.setState({
          modalVisible: visible,
          selectedItem: x
      });
  }
  

  componentWillMount() {
    this.i = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let i = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (i >= this.state.markers.length) {
        i = this.state.markers.length - 1;
      }
      if (i <= 0) {
        i = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.i !== i) {
          this.i = i;
          const { coordinate } = this.state.markers[i];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: parseFloat(this.state.region.latitudeDelta),
              longitudeDelta: parseFloat(this.state.region.longitudeDelta),
            },
            350
          );
        }
      }, 10);
    });

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
      {enableHightAccuracy: true, timeout: 20000, maximumAge: 0}
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
      {enableHightAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1}
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  mapMarkers() {
    return fetch('https://sanahama.000webhostapp.com/api/tempat/')
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
    const interpolations = this.state.markers.map((marker, i) => {
      const inputRange = [
        (i - 1) * CARD_WIDTH,
        i * CARD_WIDTH,
        ((i + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
          showsMyLocationButton={true}
          showsUserLocation={true}
          mapType = {this.state.mapTypes[this.state.mapTypeCode]}
        >
          {this.state.markers.map((marker, i) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[i].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[i].opacity,
            };
            return (
              <MapView.Marker key={i} coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
               onPress={() => this.getDirection(this.state.latitude, this.state.longitude, parseFloat(marker.latitude), parseFloat(marker.longitude))}
              >
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, i) => (
            <View style={styles.card} key={i} >
              <Image
                source={{uri:'https://sanahama.000webhostapp.com/images/' + marker.image}}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>RS M Djamil</Text>
                <Text numberOfLines={1} style={styles.cardDescription} onPress={() => this.getDirection(this.state.latitude, this.state.longitude, parseFloat(marker.latitude), parseFloat(marker.longitude))}>
                  {marker.longitude}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});