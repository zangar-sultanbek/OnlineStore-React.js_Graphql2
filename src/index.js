import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
//GraphQL
import { ApolloProvider } from '@apollo/client';
import client from './Client';
//Redux
import store from './JS/Redux/Store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
       <Provider store={store}>
          <App />
       </Provider>
    </ApolloProvider>
);
