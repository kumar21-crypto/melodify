import React, { useState } from 'react';
import { useAuth } from './AuthenticationContext';
import { useNavigate } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { toast } from 'react-toastify';
import Signup from './Signup';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,email,password);
      toast.success("login success",{
        position:'top-center'
      });
      navigate('/profile');
      
    } catch (error) {
      console.error('Failed to log in', error);
      toast.error("login failed");
    }
  };

  return (
    <div className='w-full h-screen flex text-white'>

      <div className='w-3/5 h-full font-sans  flex justify-center items-center'>
        <h1 className='font-extrabold text-6xl'>Welcome to Melodify</h1>
      </div>

      <div className='w-2/5 h-full  flex justify-center items-center'>
        <div className='w-4/5 h-150 '>
          <h1 className='font-bold text-2xl'>Melodify Login</h1>
          <div style={{marginTop:50}} className='w-full h-70 flex flex-col justify-between'>
            <input type="email" style={{padding:10}} className='border border-2px-solid-white rounded-2xl' onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" style={{padding:10}} className='border border-2px-solid-white rounded-2xl' onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button onClick={handleSubmit} type="submit" style={{padding:10}} className='w-2/5 border bg-blue-900 cursor-pointer border-2px-solid-white rounded-2xl flex justify-center items-center'>Login</button>
          </div>
          <div style={{marginTop:10}} className='text-white flex'>Not have an account ?  <p style={{marginLeft:8}} onClick={()=>{navigate('/signup')}} className='text-blue-500 cursor-pointer'> Signup here</p></div>
        </div>
      </div>

    </div>
  );
};

export default Login;