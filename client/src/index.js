import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import SimpleReactLightbox from 'simple-react-lightbox';
import 'react-lazy-load-image-component/src/effects/blur.css';

// axios.defaults.baseURL = 'https://backendsociall.herokuapp.com/api';

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
