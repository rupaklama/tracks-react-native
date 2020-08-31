// helper function to automate the process of creating context object for multiple data
// to avoid creating multiple context objects for different types of data,
// also to avoid creating multiple reducers to manage our states
// this will help us mainly with code duplications

import React, { useReducer } from 'react';

// automating context creation

// passing three things that actually need to be customized,
// any time we create another context object - reducer ,
// actions is an objects that has all different callback functions to
// dispatch an action & update our state,
// our initial state object
export default (reducer, actions, initialState) => {
  // creating two things (context object & provider func) & return it
  const Context = React.createContext();

  // helper Provider component
  // This provider component will wrap all our other components to get access to context state,
  // takes children component as a paramter
  const Provider = ({ children }) => {
    // reducer to update our state object
    const [state, dispatch] = useReducer(reducer, initialState);

    // looping through all of our action objects provided by dispatch
    // added little bit of fancy code here to allow helper functions in
    // other components to access dispatch to update state object

    // boundActions is all our action objects
    const boundActions = {};
    for (let key in actions) {
      // key === 'addUser' is action function 
      // boundActions[key] === addUser
      // actions[key] or addUser === reference to { return () => {} } & calling it with dispatch
      boundActions[key] = actions[key](dispatch);
    }

    // { state, ...boundActions } is our state object & action objects by dispatch
    // Provider component makes our data available to all the children components
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  // returning our Context object & Provider component
  return { Context, Provider };
};

// so we are going to loop through action object,
// take object key which is a function & call it with dispatch that's going to
// give us back - return function { return () => {} } to do something
// pass & store any values from the return function - { return () => {} }
// into our boundActions object &
// Finally, pass boundActions object to our provider value prop
// which will let all our children components to make changes to
// related context's state

// created reusable function to automate
// creating context object & provider component as many times as we want
// without code duplication

// createContext returns an object with 2 values: special components
// { Provider, Consumer }
// Provider component wraps around children components that can have an access to the Context Object

// using Provider component of Context object to make a value available to all
// children and grandchildren by using value={} property
