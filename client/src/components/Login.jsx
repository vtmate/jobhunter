import { useLoginMutation } from "../store/authApiSlice.js";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [apiLogin, { isSuccess, isError, error }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
      strategy: 'local',
    };

    try {
      await apiLogin({ body: loginData }).unwrap();
      setErrorMessage('');
    } catch (err) {
      if (err.status === 401) {
        setErrorMessage('Invalid email or password');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  if (isSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} className='mx-auto w-fit mt-32'>
      <div className='flex justify-between'>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input input-bordered input-sm mb-4"
        />
      </div>
      <div className='flex justify-between'>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input input-bordered input-sm mb-8 ml-4"
        />
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <button className='btn btn-sm btn-secondary w-full' type="submit">Login</button>
    </form>
  );
}
