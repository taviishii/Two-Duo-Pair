import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LocationProvider } from './LocationContext';

ReactDOM.render(
  <LocationProvider>
    <App />
  </LocationProvider>,
  document.getElementById('root')
);
