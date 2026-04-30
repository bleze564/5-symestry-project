import React from 'react';
import styled from 'styled-components';
import HeroBackground from 'assets/heroBG.png';

const HeroDiv = styled.div`
  width: 100%;
  min-height: 595px;
  background-image: url(${HeroBackground});
    background-size: cover;
    background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
    flex-direction: column;


`;

const HeroTitle = styled.h1`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 40px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0%;
  color: #ffffff;
`;
const HeroSubtitleDiv = styled.div`
  width: min(760px, 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  margin-top: 24px;
`;
const HeroSubtitle = styled.div`
  border-right: 2px solid #ffffff;
  width: 440px;

`;
const HeroSubtitleText = styled.p`
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.4;
  color: #ffffff;
  margin: 0;
`;
const HeroSubtitleData = styled.p`
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.4;
  color: #ffffff;
  margin: 0;
  text-align: left;
`;
const Hero = () => {
  return (
    <HeroDiv>
      <HeroTitle>Weather dashboard</HeroTitle>
      <HeroSubtitleDiv>
        <HeroSubtitle>
            <HeroSubtitleText>Create your personal list of favorite cities and always be aware of the weather.</HeroSubtitleText>
        </HeroSubtitle>
         <HeroSubtitleData>October 2023 Friday, 13th </HeroSubtitleData>
      </HeroSubtitleDiv>

    </HeroDiv>
  );
};

export default Hero;
