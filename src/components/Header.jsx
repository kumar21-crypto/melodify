import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { SearchContext } from './SearchContext';
import profile from '../assets/profile.svg';
import { AudioContext } from '../player/AudioContext';
import Signup from '../firebase/Signup';
import Login from '../firebase/Login';
import Profile from '../pages/Profile';
import { useUser } from '../firebase/UserContext';

function Header() {

  const { searchResults, setSearchResults, search, handleSearchQuery
  } = useContext(SearchContext);

  const { isPlaying, isAudioPlayerVisible, setIsAudioPlayerVisible } = useContext(AudioContext);

  const { userData } = useUser();

  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    handleSearchQuery(query);
    navigate('/search');
  };

  const toggleAudioPlayerVisibility = () => {
    setIsAudioPlayerVisible((prev) => !prev);
  };


  return (
    // bg-[#0b0e16]
    <>
      <div className="fixed top-0 left-0 w-full bg-[#0b0e16]  text-white z-50">
        <div style={{ padding: 5 }} className='w-full h-full  flex justify-center  '>

          <div className='w-1/6 h-10 flex items-center justify-center text-lg font-sans'>
            <h1 className='text-3xl font-bold mb-6 cursor-pointer'>Melodify</h1>
          </div>

          <div className='w-3/6 h-10 flex  items-center justify-center'>
            <div className='flex justify-center items-center  w-full'>
              <div style={{ marginRight: 10 }} onClick={()=>{navigate('/signup')}} className='mr-5 cursor-pointer'>signup</div>
              <div style={{ marginLeft: 10 }} onClick={()=>{navigate('/login')}} className='ml-5 cursor-pointer'>login</div>
            </div>

            <div className='relative w-130'>
              <input
                style={{
                  paddingLeft: 15,
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingRight: 35,
                  color: 'white',
                  backgroundColor: '#22262f'
                }}
                type="search"
                className=' w-130 rounded-3xl'
                placeholder="Search songs,artists,albums ...."
                aria-label="Search"
                aria-describedby="button-addon2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <div onClick={() => {
                handleSearch();
              }} style={{ marginRight: 8, marginTop: 8 }} className='absolute cursor-pointer right-0 top-0'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className='w-1/6 h-10 flex items-center justify-center'>
              <button onClick={toggleAudioPlayerVisibility}>
                {isAudioPlayerVisible ? 'Hide Player' : 'Show Player'}
              </button>
            </div>

          </div>
          <div>

            {/* <div style={{ marginLeft: 5, padding: 5 }}
              onClick={() => {
                handleSearch();
              }}
              className='bg-gray-100 cursor-pointer rounded-sm'>
              <SearchIcon />
            </div> */}

          </div>

          <div className='w-1/6 h-10 flex items-center justify-center'>
            <Switch

            />
            <div className=''>{userData?.Name}</div>
          </div>

          <div className='w-1/6 h-10 flex items-center justify-center'>
            <img src={profile} alt="profile" className='w-8 h-8' onClick={()=>{
              navigate('/profile')
            }} />
          </div>
        </div >
      </div>

    </>
  );
}

export default Header;

