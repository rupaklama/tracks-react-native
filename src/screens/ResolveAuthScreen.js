import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

// figuring out current auth state
// this component shows nothing instead of a loader
// since it happens fraction of a second, displaying loading don't make sense
const ResolveAuthScreen = () => {
  const { tokenSignIn } = useContext(AuthContext);

  useEffect(() => {
    tokenSignIn();
  }, []);

  return null;
};

export default ResolveAuthScreen;
