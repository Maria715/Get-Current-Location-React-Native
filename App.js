import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
   const [lat, setlat] = useState();
 

  useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMsg(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
    } else {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }
  });

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
   // setlat(location.coords.latitude);
    text = JSON.stringify(location);
    //console.log(location.coords.latitude);
//let lat=location.coords.latitude

  }
//console.log(location.coords.latitude)
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
{location ? 
     
                          
                               <MapView
        style={{ height:150,width:'100%' }}
        initialRegion={{
            latitude:  location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
      >

      <MapView.Marker
                                    coordinate={{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                    }}
                                    title={"Current Location"}
                                    description={"My Location"}
                                   // icon={require('./../../assets/Images/pin1.png')}

                                /> 
      </MapView>
                           : null }
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
