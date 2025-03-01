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
import Profile from './pages/Profile';
import ArtistsDetail from './parts/ArtistsDetail';

import Layout from './components/Layout';
import Header from './components/Header';
import { AppContext } from './components/ContextApi';
import { AudioProvider } from './player/AudioContext';
import { SearchProvider } from './components/SearchContext';
import AudioPlayer from './player/AudioPlayer';
import SearchResults from './pages/SearchResuls';
import './App.css';
import './index.css';

import Login from './firebase/Login';
import Signup from './firebase/Signup';
import { AuthProvider, useAuth } from './firebase/AuthenticationContext';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './firebase/UserContext';


const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};


function App() {
  return (
    <AppContext>
      <AudioProvider>
        <SearchProvider>
          <Router>
            <AuthProvider>
              <UserProvider>
                <Header />
                <div style={{ marginTop: 50 }} className="pt-20">
                  <Routes>
                    <Route path="/" element={<Layout />} >
                      <Route index element={<Home />} />
                      <Route path="/browse" element={<Browse />} />
                      <Route path="/albums" element={<Albums />} />
                      <Route path="/artists" element={<Artists />} />
                      <Route path="/trending" element={<Trending />} />
                      <Route path="/albumdetail" element={<AlbumDetail />} />
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/allcategory" element={<AllCategory />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/artistsdetail" element={<ArtistsDetail />} />
                    </Route>
                  </Routes>

                  <ToastContainer />
                </div>
              </UserProvider>
            </AuthProvider>
            <AudioPlayer />
          </Router>
        </SearchProvider>
      </AudioProvider>
    </AppContext>
  );
}

export default App;