import React from 'react';
import { GlobalStyle } from 'components/GlobalStyle';
import Hero from './SideParts/hero/Hero';
import Header from 'components/SideParts/header/Header';
import { WeatherCast } from './mainContent/weatherCast/WeatherCast';
const mockData = {
  city: "Kyiv",
  temp: 22,
  humidity: 60,
  wind: 3,
  feelsLike: 21,
};
export const App = () => {
  return (
    <>
      <GlobalStyle />
      <div
        style={{
          display: 'flex',
          justifyContent  : 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}>

            <Header />

          <Hero />
          <WeatherCast data={mockData} />
        </div>
      </>
    
  );
};
