// import context object
import createDataContext from './createDataContext';

// auth reducer
const authReducer = (state, action) => {
  // action is object, type is operation with that object
  switch (action.type) {
    default:
      return state;
  }
};

// this will give us back Context & Provider from createDataContext 
// which will make all our data available to children components inside our application
export const { Context, Provider } = createDataContext(
  authReducer, // our reducer
  {}, // action objects to be dispatch
  { isSignedIn: false } // initial state
);
