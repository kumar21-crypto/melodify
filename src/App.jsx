import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Albums from './pages/Albums';
import Trending from './pages/Trending';
import Artists from './pages/Artists';
import AlbumDetail from './parts/AlbumDetail';
import HomeSlider from './parts/HomeSlider';
import AllCategory from './homecategory/AllCategory';


import Layout from './components/Layout';
import Header from './components/Header';
import { AppContext } from './components/ContextApi';
import { AudioProvider } from './player/AudioContext';
import { SearchProvider } from './components/SearchContext';
import AudioPlayer from './player/AudioPlayer';
import SearchResults from './pages/SearchResuls';
import './App.css';
import './index.css';


function App() {
  return (
    <AppContext>
      <AudioProvider>
        <SearchProvider>
        <Router>
          <Header />
          <div style={{marginTop:50}} className="pt-20"> 
          <Routes>
            <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="browse" element={<Browse />} />
            <Route path="albums" element={<Albums />} />
            <Route path="artists" element={<Artists />} />
            <Route path="trending" element={<Trending />} />
            <Route path="albumdetail" element={<AlbumDetail />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="allcategory" element={<AllCategory />} />
            </Route>
          </Routes>
          </div>
          <AudioPlayer />
        </Router>
        </SearchProvider>
      </AudioProvider>
    </AppContext>
  );
}

export default App;