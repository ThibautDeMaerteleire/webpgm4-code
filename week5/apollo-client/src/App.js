import React from 'react';
import { useError } from './Hooks';
import { gql, useQuery } from '@apollo/client';
import './App.css';
import Register from './Register';

const USERS = gql`
  {
    users {
      id
      email
      password
    }
  }
`

function App() {
  const [handleGqlError] = useError();
  const { loading, error, data } = useQuery(USERS, {
    onError: handleGqlError
  });

  if(loading) return 'loading...';
  if(error) return `ERROR: ${error.message}`;

  return (
    <>
      <div className="App">
      {!loading && (
          <ul>
            {data.users.map(user => (
              <li key={user.id}>User with email: {user.email} and password: {user.password}</li>
            ))}
          </ul>
        )}
      </div>
      <Register></Register>
    </>
  );
}

export default App;
