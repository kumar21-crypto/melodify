import React, { useState } from 'react';
import { useAuth } from './AuthenticationContext';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Login from './Login';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);

      if (user) {
        await setDoc(doc(db, "Users", user.uid),
          {
            Name: name,
            Email: user.email
          }
        );
      }
      console.log("user register successfully");
      toast.success("user signed up successfully",{
        position:"top-center"
      })

    } catch (error) {
      console.error('Failed to sign up', error);
    }
  };

  return (

    <div className='w-full h-screen flex text-white'>

      <div className='w-3/5 h-full font-sans  flex justify-center items-center'>
        <h1 className='font-extrabold text-6xl'>Welcome to Melodify</h1>
      </div>

      <div className='w-2/5 h-full  flex justify-center items-center'>
        <div className='w-4/5 h-150 '>
          <h1 className='font-bold text-2xl'>Melodify SignUp</h1>
          <div style={{marginTop:50}} className='w-full h-70 flex flex-col justify-between'>
            <input type='text' style={{padding:10}} className='border border-2px-solid-white rounded-2xl' onChange={(e) => setName(e.target.value)} placeholder='Name' required />
            <input type="email" style={{padding:10}} className='border border-2px-solid-white rounded-2xl' onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" style={{padding:10}} className='border border-2px-solid-white rounded-2xl' onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button onClick={handleSubmit} type="submit" style={{padding:10}} className='w-2/5 border bg-blue-900 cursor-pointer border-2px-solid-white rounded-2xl flex justify-center items-center'>Signup</button>
          </div>
          <div style={{marginTop:10}} 
          className='text-white flex'>Already have an account ?  <p style={{marginLeft:5}} onClick={()=>{
            navigate('/login')
          }} className='text-blue-500 cursor-pointer'> Login here</p></div>
        </div>
      </div>

    </div>
    // <div className='text-white'>
    // <form onSubmit={handleSubmit}>
    //   <h2>Signup</h2>
    //   <input type='text' onChange={(e) => setName(e.target.value)} placeholder='Name' required />
    //   <input type="email"  onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
    //   <input type="password"  onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
    //   <button type="submit">Signup</button>
    // </form>
    // </div>
  );
};

export default Signup;