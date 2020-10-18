import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ApolloProvider,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  HttpLink
} from '@apollo/client';

import * as serviceWorker from './serviceWorker';

// create the http link for the API
const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : 'https://memoryapi.incloudspace.be/',
});

// create the authentication header
const authLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjhjMjEyNjYzM2E1NzExODBjMjA0ZjciLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2MDMwMjMxMDksImV4cCI6MTYwMzAyNjcwOX0.xoC3V_faUrTWHuqV9Da36DwpCSYIuXonIkZhMvXQQiA";

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

// init apolloclient
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
