import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import { People } from '@mui/icons-material';


export const categories = [
    {path:"/",id:1, name: 'Home', icon: <HomeRoundedIcon />, },
    {path:"/browse",id:2, name: 'Browse', icon: <ExploreRoundedIcon />, },
    {path:"/trending",id:3, name: 'Trending', icon: <TrendingUpRoundedIcon />, },
    {path:"/artists",id:4, name: 'Artists', icon: <PeopleRoundedIcon />, },
    {path:"/albums",id:5, name: 'Albums', icon: <LibraryMusicRoundedIcon />, },
  ];


export const sizes = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  };

export const Colors = {
    mainContainerbg:'#0a0a0b',
    lightgree:'green',
    sidebarSelect:'#5b7afa'
  }


// export const playIcon = <PlayCircleFilledWhiteRoundedIcon sx={{fontSize:60,color:'white'}} className='hover:cursor-pointer hover:scale-110 duration-500'/>
// export const pauseIcon = <PauseCircleRoundedIcon sx={{fontSize:60,color:'white'}} className='hover:cursor-pointer hover:scale-110 duration-500'/>
// export const nextIcon = <SkipNextRoundedIcon  sx={{fontSize:50,color:'white'}} className='hover:cursor-pointer hover:scale-110 duration-500'/>
// export const previousIcon = <SkipPreviousRoundedIcon  sx={{fontSize:50,color:'white'}} className='hover:cursor-pointer hover:scale-110 duration-500'  />