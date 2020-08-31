import React from 'react';
import { View, StyleSheet } from 'react-native';

// helper styling component to give margin space to any elements 
const Spacer = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
  spacer: {
    margin: 15
  }
});

export default Spacer;
