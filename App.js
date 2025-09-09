import React from 'react';
import Route from './src/navigation/Route';
import { AuthProvider } from './src/navigation/AuthProvider'

const App = () => {
  return (
    <AuthProvider>
      <Route />
    </AuthProvider>
  );
};
export default App;
