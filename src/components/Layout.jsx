import React from 'react';
import { NavLink, Outlet } from 'react-router';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import HomeSlider from '../parts/HomeSlider';
import { BiHomeAlt2 } from "react-icons/bi";
import { CiCompass1 } from "react-icons/ci";
import { BiTrendingUp } from "react-icons/bi";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineLibraryMusic } from "react-icons/md";





function Layout() {
    return (
        <div style={{ paddingBottom: '90px' }} className="flex h-auto bg-[#0b0e16] ">
            <div className="w-64 text-white flex flex-col p-4 ">

                <h1 style={{marginTop:10, marginRight:50}} className='font-bold flex justify-center'>Menu</h1>

                <NavLink to="/" className="mb-2 p-2 w-full flex justify-center items-center rounded hover:bg-gray-700" activeclassname="bg-red-400">
                    <div className=' flex justify-center items-center w-2/3 h-13 '>
                        <div style={{marginRight:5}} className=''><BiHomeAlt2 size={25} /></div>
                        <div style={{marginLeft:5}} className='font-sans font-semibold text-md '>Home</div>
                    </div>
                </NavLink>

                <NavLink to="/browse" className="mb-2 p-2 w-full flex justify-center items-center rounded hover:bg-gray-700" activeclassname="bg-gray-700">
                    <div style={{marginTop:15}} className=' flex justify-center items-center w-2/3 h-13'>
                        <div style={{marginRight:5}} className='p-10'><CiCompass1 size={25} /></div>
                        <div  style={{marginLeft:5}} className='font-sans font-semibold  text-md'>Browse</div>
                    </div>
                </NavLink>
                <NavLink to="/artists" className="mb-2 p-2 w-full flex justify-center items-center h-13 rounded hover:bg-gray-700" activeclassname="bg-gray-700">
                    <div style={{marginTop:15}} className=' flex justify-center items-center w-2/3 h-13'>
                        <div style={{marginRight:5}} className='p-10'><BiTrendingUp size={25} /></div>
                        <div  style={{marginLeft:5}} className='font-sans font-semibold  text-md'>Trending</div>
                    </div>
                </NavLink>
                <NavLink to="/trending" className="mb-2 p-2 w-full flex justify-center items-center h-13 rounded hover:bg-gray-700" activeclassname="bg-gray-700">
                    <div style={{marginTop:15}} className=' flex justify-center items-center w-2/3 h-13'>
                        <div style={{marginRight:5}} className='p-10'><IoPeopleOutline size={25} /></div>
                        <div  style={{marginLeft:5}} className='font-sans font-semibold  text-md'>Artists</div>
                    </div>
                </NavLink>
                <NavLink to="/albums" className="mb-2 p-2 w-full flex justify-center items-center h-13 rounded hover:bg-gray-700" activeclassname="bg-gray-700">
                    <div style={{marginTop:15}}  className=' flex justify-center items-center w-2/3 h-13'>
                        <div style={{marginRight:5}} className='p-10'><MdOutlineLibraryMusic size={25} /></div>
                        <div  style={{marginLeft:5}} className='font-sans font-semibold  text-md'>Albums</div>
                    </div>
                </NavLink>
            </div>

            <main className="flex-1 p-4 h-full bg-[#0b0e16]">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;