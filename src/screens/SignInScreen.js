import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';

// we will be adding NavigationEvents to our SignupScreen
// and SignInScreen and passing it event props to clear our error messages
// NavigationEvent is component which calls callback funcs any time
// we navigate to or away from the components.
// Tt is very helpful like situation above to clear out error messages / cleanups
import { NavigationEvents } from 'react-navigation';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

import { Context as AuthContext } from '../context/AuthContext';
const SignInScreen = () => {
  // destructuring state object & helper action func from AuthContext
  const { state, signIn, clearErrorMessage } = useContext(AuthContext);

  return (
    // NavigationEvents props get call on this screen
    <View style={styles.container}>

      <NavigationEvents 
      // calling action func to clear error messages
        onWillFocus={clearErrorMessage} // clicking/touching to navigate to different screens
        // onDidFocus={() => {}} // will be call after successful navigation from one screen to another
        // onWillBlur={() => {}} // clicking/touching to navigate away from different screens
        // onDidBlur={() => {}} // after navigation transitions complete
      />

      <AuthForm
        headerText="Sign in"
        errorMessage={state.errorMessage}
        onSubmit={signIn}
        submitButtonText="Sign In"
      />

      <NavLink
        text="Don't have an account? Sign up instead"
        routeName="Signup"
      />
    </View>
  );
};

// customizing header
// the reason navigationOptions attached to this component is to
// add functionality to navigate away when clicking on header
SignInScreen.navigationOptions = () => {
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

export default SignInScreen;
