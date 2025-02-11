import React, { useState } from 'react';
import { useAuth } from './AuthenticationContext';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await createUserWithEmailAndPassword(auth,email,password);
      const user = auth.currentUser;
      console.log(user);

      if(user){
        await setDoc(doc(db,"Users",user.uid),
      {
        Name:name,
        Email:user.email
      }
      );
      }
      console.log("user register successfully");
      toast.success("user signed up successfully")

    } catch (error) {
      console.error('Failed to sign up', error);
    }
  };

  return (
    <div className='text-white'>
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input type='text' onChange={(e) => setName(e.target.value)} placeholder='Name' required />
      <input type="email"  onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password"  onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Signup</button>
    </form>
    </div>
  );
};

export default Signup;