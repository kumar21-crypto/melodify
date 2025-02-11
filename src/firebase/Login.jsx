import React, { useState } from 'react';
import { useAuth } from './AuthenticationContext';
import { useNavigate } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,email,password);
      toast.success("login success");
      
    } catch (error) {
      console.error('Failed to log in', error);
    }
  };

  return (
    <div className='text-white'>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;