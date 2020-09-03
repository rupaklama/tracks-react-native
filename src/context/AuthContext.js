import { AsyncStorage } from 'react-native';

// import context object
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

// importing our navigation object
import { navigate } from '../navigationRef';

// auth reducer
const authReducer = (state, action) => {
  // action is object, type is operation with that object
  // RULES for updating our state object inside reducer is that
  // we always have to return a brand new object so that we will never modify
  // our state object directly.
  switch (action.type) {
    case 'add_error':
      // add all the props from current state & add on this new object &
      // override the property that we want to update
      return { ...state, errorMessage: action.payload };

    // after user signs up, don't want to show errorMessage anymore,
    // this happens if user logs out & goes to the signup form, will still see errorMessage

    // don't need to carry any values from current state object
    // resetting our entire errorMessage state object after user signs up,
    case 'signup':
      return { errorMessage: '', token: action.payload };
    case 'signIn':
      return { errorMessage: '', token: action.payload };
    case 'clear_errorMessage':
      return { ...state, errorMessage: ''}
    case 'signOut': 
      return { token: null, errorMessage: '' }
    default:
      return state;
  }
};

// check to see if there's a token in react native's asyncStorage
const tokenSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    // reusing action type - signIn from reducer
    dispatch({ type: 'signIn', payload: token })

    // to navigate user to TrackList screen
    navigate('TrackList')
  } else {
    navigate('loginFlow')
  }
  
}

// to clear out Error messages
const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_errorMessage'})
}

// action functions to change state
// accessing dispatch in createDataContext to update our state object
const signup = dispatch => {
  return async ({ email, password }) => {
    // api request to sign up to backend server
    try {
      const response = await trackerApi.post('/signup', {
        email,
        password,
      });
      // console.log(response.data)
      // storing token in asyncStorage
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'signup', payload: response.data.token });

      // navigate to main flow,
      // calling navigate func with route name
      navigate('TrackList');
    } catch (err) {
      // console.log(err.message)
      // console.log(err.response.data)
      // calling dispatch anytime we want to update our state
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up',
      });
    }

    // if we sign up, modify our state to change to authenticated

    // if signing up fails, show error message
  };
};

// cleaning up function by removing return for concise code
const signIn = dispatch => async ({ email, password }) => {
  // try to signIn
  // handle success by updating state
  try {
    const response = await trackerApi.post('/signIn', { email, password })
    // storing token in asyncStorage
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signIn', payload: response.data.token });

    navigate('TrackList')

  } catch (err) {
    // handle failure by showing error message
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in',
    });
  }
};

const signOut = dispatch => async () => {
  // sign out user
  await AsyncStorage.removeItem('token')
  dispatch({ type: 'signOut' })
  navigate('loginFlow')
};


// this will give us back Context & Provider from createDataContext
// which will make all our data available to children components inside our application
export const { Context, Provider } = createDataContext(
  authReducer, // our reducer
  {
    // action objects to be dispatch & available to all components
    signup,
    signIn,
    signOut,
    clearErrorMessage,
    tokenSignIn

  },
  { token: null, errorMessage: '' } // initial state
);
