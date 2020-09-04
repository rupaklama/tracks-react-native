import React, { useContext } from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Context as LocationContext } from '../context/LocationContext';

// importing map with MapView, auto installed with react-native
// Polyline is component which can be shown inside MapView to
// draw line on the map itself.
import MapView, { Polyline, Circle } from 'react-native-maps';

const Map = () => {
  const { state: { currentLocation } } = useContext(LocationContext);
  
  if (!currentLocation) {
    // return null or spinner
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  // MapView is similar image,
  // by default no height/width
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        // initial location to display
        ...currentLocation.coords,
        latitudeDelta: 0.01, // zoom level
        longitudeDelta: 0.01,
      }}

      // track user around
      // on updating this prop, map gets auto updated & recenter/re-zoom user as well
      // region={{
      //   ...currentLocation.coords,
      //   latitudeDelta: 0.01, 
      //   longitudeDelta: 0.01,
      // }}
    >
      
      <Circle 
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158, 158, 255, 1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
    </MapView>
  );
  // Polyline takes some number of coordinates which are series of points
  // that indicate a line we want to draw on map. So, the line is going to be
  // array of objects where every object is going to have lat & long property.
  // Polyline then will take that array of objects & reflect it as an actual line.
};

const styles = StyleSheet.create({
  map: {
    height: 500,
  },
});

export default Map;


// to draw custom line on a map
// let points = [];
  // for (let i = 0; i < 20; i++) {
  //   // this object is going to have imaginary points that we are
  //   // trying to draw on a map
  //   if (i % 2 === 0) {
  //     points.push({
  //       latitude: 37.33233 + i * 0.001,
  //       longitude: -122.03121 + i * 0.001,
  //     });
  //   } else {
  //     points.push({
  //       latitude: 37.33233 - i * 0.002,
  //       longitude: -122.03121 + i * 0.001,
  //     });
  //   }
  // }