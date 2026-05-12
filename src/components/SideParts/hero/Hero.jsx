import React from 'react';
import styled from 'styled-components';
import HeroBackground from 'assets/heroBG.png';
import { FiSearch } from 'react-icons/fi';
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

  position: relative;
  overflow: hidden;
  min-height: 595px;
  padding-top: 24px;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.48);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;

  width: 100%;
  max-width: 625px;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: -38px;
`;

const HeroTitle = styled.h1`
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 34px;
  font-weight: 600;
  line-height: 1;

  color: #ffffff;

  margin: 0 0 42px;
`;

const HeroSubtitleDiv = styled.div`
  width: 613px;
  height: 144px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 58px;
`;
const HeroSubtitle = styled.div`
  width: 323px;

  padding-right: 34px;

  border-right: 2px solid rgba(255, 255, 255, 0.9);
`;

const HeroSubtitleText = styled.p`
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.25;

  color: #ffffff;

  margin: 0;
  text-align: center;
`;

const HeroSubtitleData = styled.div`
  width: 222px;

  padding-left: 34px;

  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.35;

  color: #ffffff;

  text-align: left;
`;

const SearchForm = styled.form`
  width: 625px;
  height: 42px;

  display: flex;

  border-radius: 10px;
  overflow: hidden;

  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
`;

const SearchInput = styled.input`
  flex: 1;

  border: none;
  outline: none;

  padding: 0 20px;

  background: #ececec;

  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 12px;

  &::placeholder {
    color: #9d9d9d;
  }
`;

const SearchButton = styled.button`
  width: 36px;

  border: none;
  background: #ffb36c;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #000;
  font-size: 20px;

  transition:
    background 0.25s ease,
    transform 0.2s ease;

  &:hover {
    background: #ff9f45;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Hero = ({ setCityFromHero }) => {
  const [searchValue, setSearchValue] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!searchValue.trim()) {
      return;
    }

    setCityFromHero(searchValue.trim());
    setSearchValue('');
  }

  return (
    <HeroDiv>
      <HeroContent>
        <HeroTitle>Weather dashboard</HeroTitle>

        <HeroSubtitleDiv>
          <HeroSubtitle>
            <HeroSubtitleText>
              Create your personal list of favorite cities and always be aware
              of the weather.
            </HeroSubtitleText>
          </HeroSubtitle>

          <HeroSubtitleData>
            October 2023
            <br />
            Friday, 13th
          </HeroSubtitleData>
        </HeroSubtitleDiv>

        <SearchForm onSubmit={handleSubmit}>
          <SearchInput
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
            placeholder="Search location..."
          />

          <SearchButton type="submit">
            <FiSearch />
          </SearchButton>
        </SearchForm>
      </HeroContent>
    </HeroDiv>
  );
};

export default Hero;
