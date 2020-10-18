import React, { useEffect } from 'react';
import { NetworkStatus } from '@apollo/client';
import { useError } from './Hooks';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import Register from './Register';
import { FRAGMENT_USER_EMAIL } from './gqlFragments';

const USERS = gql`
  #{
  #  users {
  #    id
  #    email
  #    password
  # }
  # }
  {
    users {
      ...UserEmail
      password
    }
  }
  ${FRAGMENT_USER_EMAIL}
`
const GET_USER_PASSWORD = gql`
  query user($id: ID) {
    user(id: $id) {
      password
    }
  }
`

function App() {
  const [handleGqlError] = useError();
  const { loading, error, data, refetch, networkStatus } = useQuery(USERS, {
    onError: handleGqlError,
    fetchPolicy: "cache-first", // https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies
    notifyOnNetworkStatusChange: true,
    // pollInterval: 500,
  });
  const [getUser, lazyQueryParams] = useLazyQuery(GET_USER_PASSWORD);

  useEffect(() => {
    if(lazyQueryParams.data && lazyQueryParams.data.user) {
      console.log(lazyQueryParams.data.user.password);
    }
  }, [lazyQueryParams.data])

  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if(loading) return 'loading...';
  if(error) return `ERROR: ${error.message}`;
  // if(lazyQueryParams.loading) return 'loading user...';

  return (
    <>
      <div className="App">
      {!loading && (
          <ul>
            {data.users.map(user => (
              <li key={user.id}>
                User with email: {user.email}. <button onClick={() => getUser({ variables: { id: user.id } })}>Get Password</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => refetch()}>Refetch</button>
      </div>
      <Register></Register>
    </>
  );
}

export default App;
