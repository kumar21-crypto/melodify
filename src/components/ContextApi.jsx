import React, { createContext, useState, useEffect } from 'react';
export const Context = createContext();

export const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [homeData, sethomeData] = useState('no data');
  const [selectCategory, setSelectCategory] = useState('Home');
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetchSelectQueryData(selectCategory);
  }, [selectCategory]);

  const fetchSelectQueryData = async (query) => {
    setLoading(true);
    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://www.jiosaavn.com/api.php?__call=webapi.getLaunchData&_format=json&_marker=0&api_version=4&ctx=web6dot0');
      const data = await response.json();
      sethomeData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      sethomeData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Context.Provider value={{
      loading,
      setLoading,
      homeData,
      sethomeData,
      selectCategory,
      setSelectCategory,
      mobileMenu,
      setMobileMenu
    }}>
      {children}
    </Context.Provider>
  );
};