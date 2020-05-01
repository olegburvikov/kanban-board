import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux"
import { Provider } from 'react-redux'

import App from './components/App/App';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
);

