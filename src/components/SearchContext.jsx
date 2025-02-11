import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchSongResults, setSearchSongResults] = useState([]);


  const handleSearchQuery = async (query) => {
    try {
      const response = await fetch(`https://saavn.dev/api/search?query=${query}`);
      const response1 = await fetch(`https://saavn.dev/api/search/songs?query=${query}`);

      const data = await response.json(); // Await the JSON parsing
      const data1 = await response1.json(); // Await the JSON parsing

      setSearchResults(data?.data);

      if (data1?.success) {
        setSearchSongResults(data1?.data);
      }
      console.log("search song result:",data1.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };


  return (
    <SearchContext.Provider 
    value={{ 
      searchQuery, 
      setSearchQuery, 
      searchResults, 
      setSearchResults, 
      searchSongResults, 
      setSearchSongResults,
      handleSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};


