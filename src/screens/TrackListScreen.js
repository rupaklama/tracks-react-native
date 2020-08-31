import React, { Fragment } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
const TrackListScreen = ({ navigation }) => {
  return <Fragment>
    <Text style={{ fontSize: 48 }}>TrackListScreen</Text>
    <Button title="Go to Track Detail" onPress={() => navigation.navigate('TrackDetail')} />
  </Fragment>
};

const styles = StyleSheet.create({});

export default TrackListScreen;
