import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AccountScreen from './src/screens/AccountScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';

// import clever function
import { setNavigator } from './src/navigationRef';

// provider
import { Provider as AuthProvider } from './src/context/AuthContext';

// creating Switch navigator object to create routes
const switchNavigator = createSwitchNavigator(
  {
    // first arg is the route config object
    
    // referring to another navigator object or grouping of screens
    // this will have a Stack navigator object to display
    // either SignupScreen or SignInScreen
    loginFlow: createStackNavigator({
      Signup: SignupScreen,
      SignIn: SignInScreen,
      
    }),
    mainFlow: createBottomTabNavigator({
      trackListFlow: createStackNavigator({
        TrackList: TrackListScreen,
        TrackDetail: TrackDetailScreen
      }),
      Account: AccountScreen,
      TrackCreate: TrackCreateScreen,
    }),
  },

  // as second arg, passing another object
  // {
  //   // default route to show anytime app starts up
  //   initialRouteName: 'Index',
  //   defaultNavigationOptions: {
  //     // default title for header
  //     title: 'Blogs',
  //   },
  // }
);

// createAppContainer func creates default component &
// displays all components inside of navigator object

// export default createAppContainer(switchNavigator);
// rather then exporting, assigning to a variable
const App = createAppContainer(switchNavigator);

// rather then directly exporting createAppContainer,
// we wrapped it inside of our own custom component 
// to add some code for extra functionalities
export default () => {
  return (
    // passing a prop call - ref
    // ref is going to receive arrow func with arg - navigator which
    // allow us navigate around & pass that into setNavigator func
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }}/>
    </AuthProvider>
  ) // ref is going to be a function which gets call with navigator object
  // allows us to navigate around
}
// passing App as child to AuthProvider to share our context object
// into all the children components with the help of createAppContainer's navigation
