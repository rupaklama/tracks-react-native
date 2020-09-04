import '../_mockLocation';

import React, { useEffect, useState, useContext } from 'react';

// this component makes our content fit into screen
import { SafeAreaView } from 'react-navigation';

// to prompt user for permission
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

import { Context as LocationContext } from '../context/LocationContext';

import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import Map from '../components/Map';

const TrackCreateScreen = () => {
  const { addLocation } = useContext(LocationContext);
  const [err, setErr] = useState(null);

  // helper function
  const startWatching = async () => {
    // requesting user for permission
    try {
      const { granted } = await requestPermissionsAsync();
      if (!granted) {
        throw new Error('Location permission not granted');
      }

      await watchPositionAsync({
        // higher accuracy readings which consumes more battery 
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000, // update once every sec or
        distanceInterval: 10 // update in 10 meters 

        // takes location object - user location & update our state
      }, (location) => {
        addLocation(location)
      })
    } catch (e) {
      setErr(e);
    }
  };

  useEffect(() => {
    startWatching();
  }, []);

  return (
    // forceInset - special prop with object
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h2>Create a Track</Text>
      <Map />

      {err ? <Text>Please enable location services</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
