'use client';

import { FormEvent, useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { REGISTER_CUSTOMER } from '../lib/queries';
// import client from '../lib/apolloClient';
import { storefront } from '@/utils/store';

const REGISTER_CUSTOMER = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [registerCustomer, { data, loading, error }] = useMutation(REGISTER_CUSTOMER);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const response = await storefront(REGISTER_CUSTOMER, { input: { email, password } });
    if (response.data.customerCreate?.customer) {
      console.log('Registration successful!');
    } else if (response.data.customerCreate.customerUserErrors.length !== 0) {
      console.log('Error: ', response.data.customerCreate.customerUserErrors[0].message);
    }
    // await registerCustomer({ variables: { input: { email, password } } });
  };

  return (
    <form onSubmit={handleRegister}>
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
        Register
      </button>
      {/* {data && <p>Registration successful!</p>} */}
      {/* {error && <p>Error: {error.message}</p>} */}
    </form>
  );
}
