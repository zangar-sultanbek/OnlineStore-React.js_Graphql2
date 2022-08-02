import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
//GraphQL
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://flyby-gateway.herokuapp.com/',
    cache: new InMemoryCache(),
  });

client.query({
query: gql`
    query GetLocations {
    locations {
        id
        name
        description
        photo
    }
    }
`,
})
.then((result) => console.log(result));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
