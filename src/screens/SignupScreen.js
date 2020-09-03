import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
const SignupScreen = ({ navigation }) => {
  // destructuring state object & helper action func from AuthContext
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  
  return (
    <View style={styles.container}>

      <NavigationEvents 
      // calling action func to clear error messages
        onWillFocus={clearErrorMessage} 
      />

      <AuthForm 
        headerText="Sign Up for Tracker!"
        errorMessage={state.errorMessage}
        onSubmit={signup} 
        submitButtonText="Sign Up" 
      />

      <NavLink 
        routeName="SignIn"
        text="Already have an account? Sign in instead!"
      />
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
  
  
});

export default SignupScreen;
