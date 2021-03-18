import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <StrictMode>
      <ColorModeScript />
      <App />
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
