import React, { useState } from 'react';
import { GlobalStyle } from 'components/GlobalStyle';
import Hero from './SideParts/hero/Hero';
import Header from 'components/SideParts/header/Header';
import WeatherCast from './mainContent/weatherCast/WeatherCast';
import ActualNews from './mainContent/actualNews/ActualNews';
export const App = () => {
const [currentUser, setCurrentUser] = useState(null);
const [cityFromHero, setCityFromHero] = useState('');
  return (
    <>
      <GlobalStyle />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />

        <Hero setCityFromHero={setCityFromHero} />
        <WeatherCast
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          cityFromHero={cityFromHero}
          setCityFromHero={setCityFromHero}
        />
        <ActualNews />
      </div>
    </>
  );
};
