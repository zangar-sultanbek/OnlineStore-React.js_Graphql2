import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
//GraphQL
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
//Redux
import store from './JS/Redux/Store';
import { Provider } from 'react-redux';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
       <Provider store={store}>
        <App />
       </Provider>
    </ApolloProvider>
);
