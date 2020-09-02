import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
const SignupScreen = ({ navigation }) => {
  // destructuring state object & helper action func from AuthContext
  const { state, signup } = useContext(AuthContext);
  // console.log(state)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Sign up for Tracker</Text>
      </Spacer>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />

      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {
        /* Display error message */
        state.errorMessage ? (
          <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        ) : null
      }

      <Spacer>
        <Button title="Sign Up" onPress={() => signup({ email, password })} />
      </Spacer>

      <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.link}>Already have an account? Sign in instead!</Text>
        </TouchableOpacity>
      </Spacer>
    </View>
  );
};

// customizing header
// the reason navigationOptions attached to this component is to
// add functionality to navigate away when clicking on header
SignupScreen.navigationOptions = () => {
  return {
    // don't display header
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
  },
  link: {
    color: 'blue'
  }
});

export default SignupScreen;
