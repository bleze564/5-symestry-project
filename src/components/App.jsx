import React from 'react';
import { GlobalStyle } from 'components/GlobalStyle';
import Hero from './SideParts/hero/Hero';
import Header from 'components/SideParts/header/Header';

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

        </div>
      </>
    
  );
};
