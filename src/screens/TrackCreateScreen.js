import React from 'react';

// this component makes our content fit into screen
import { SafeAreaView } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import Map from '../components/Map';

const TrackCreateScreen = () => {
  return ( // forceInset - special prop with object
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h2>Create a Track</Text>
      <Map />
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;
