import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import SimpleReactLightbox from 'simple-react-lightbox';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

// axios.defaults.baseURL = 'https://backendsociall.herokuapp.com/api';

TimeAgo.addDefaultLocale(en)

ReactDOM.render(
  <React.StrictMode>
    <SearchProvider>
      <AuthContextProvider>
      <SimpleReactLightbox>
          <App />
          </SimpleReactLightbox>
      </AuthContextProvider>
    </SearchProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
