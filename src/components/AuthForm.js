import React, { useState, Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';

import Spacer from './Spacer';

// passing & destructuring props to customize AuthForm
const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Fragment>
      <Spacer>
        <Text h3>{ headerText }</Text>
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
        errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null
      }

      <Spacer>
        <Button title={submitButtonText} onPress={() => onSubmit({ email, password })} />
      </Spacer>

    </Fragment>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
  },
});

export default AuthForm;