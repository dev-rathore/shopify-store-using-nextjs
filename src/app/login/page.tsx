// pages/login.js
import { FormEvent, useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { LOGIN_CUSTOMER } from '../lib/queries';
// import client from '../lib/apolloClient';

const LOGIN_CUSTOMER = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loginCustomer, { data, loading, error }] = useMutation(LOGIN_CUSTOMER);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    // const result = await loginCustomer({ variables: { input: { email, password } } });
    // const accessToken = result.data.customerAccessTokenCreate.customerAccessToken.accessToken;
    // localStorage.setItem('customerAccessToken', accessToken);
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">
        Login
      </button>
      {/* {data && <p>Login successful!</p>} */}
      {/* {error && <p>Error: {error.message}</p>} */}
    </form>
  );
}
