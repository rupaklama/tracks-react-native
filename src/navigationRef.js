// getting access to the screen's navigation prop object from outside non-react components
// like action functions - dispatch or others is hard to do and 
// switchNavigator is not a navigation, it's a function 

import { NavigationActions } from 'react-navigation';

let navigator;

// here's our clever function to get access to navigator
// param, call with navigation object to allow us navigate to different screens
export const setNavigator = (nav) => {
 // will assign that nav thing, coming from react navigation to our variable
 navigator = nav;

}

// navigate function for everyone else to use
// routeName - call it with name of the route that we want to navigate to,
// params - information that we want to pass into screen that we are about to show 
export const navigate = (routeName, params) => {
  // trigger navigation with object
  // dispatching action with react navigation to change it's state &
  // show different screen to our user
  navigator.dispatch(
    NavigationActions.navigate({
      routeName: routeName,
      params: params
    })
  )
}