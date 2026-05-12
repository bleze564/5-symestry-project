import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { toast } from 'react-toastify';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiThermometer,
} from 'react-icons/wi';

import { FiRefreshCw, FiTrash2, FiHeart } from 'react-icons/fi';

import { FaHeart } from 'react-icons/fa';

import { getWeatherIcon, groupForecastByDay } from './weatherCast.data';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Section = styled.section`
  padding: 40px 0;
  font-family: 'Montserrat Alternates', sans-serif;
`;

const Container = styled.div`
  width: 1140px;
  margin: 0 auto;
`;

const CardsList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 28px;
  margin-bottom: 40px;
`;

const WeatherCard = styled.div`
  width: 240px;
  min-height: 340px;
  background: #f2f2f2;
  border-radius: 18px;
  padding: 18px 18px 20px;

  position: relative;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);

    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
  }
`;

const CityName = styled.h3`
  font-size: 13px;
  margin-bottom: 8px;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CountryText = styled.p`
  font-size: 11px;
  color: #666;
`;

const CardTime = styled.h2`
  text-align: center;
  font-size: 32px;
  margin-top: 12px;
`;

const CardDate = styled.p`
  text-align: center;
  font-size: 12px;
  color: #666;
`;

const WeatherBadgeRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;
`;

const WeatherBadge = styled.div`
  min-width: 82px;
  height: 24px;
  border-radius: 20px;
  background: #ffb36c;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 10px;
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: auto;
  padding-top: 18px;
`;

const SeeMoreButton = styled.button`
  width: 110px;
  height: 34px;

  border: none;
  border-radius: 10px;

  background: #ffb36c;
  cursor: pointer;

  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 12px;

  transition: 0.25s ease;

  &:hover {
    transform: translateY(-2px);

    box-shadow: 0 10px 20px rgba(255, 179, 108, 0.4);
  }

  &:active {
    transform: scale(0.96);
  }
`;
const TimeText = styled.p`
  font-size: 12px;
  text-align: center;
  margin-bottom: 8px;
`;

const WeatherIcon = styled.img`
  width: 110px;
  height: 110px;
  object-fit: contain;
  display: block;
  margin: 28px auto 18px;
`;

const Temp = styled.p`
  text-align: center;
  font-size: 22px;
  font-weight: 600;
`;

const Description = styled.p`
  text-align: center;
  font-size: 11px;
  color: #555;
`;

const SmallButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    transform 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: #ff8c2b;
    transform: scale(1.12);
  }

  &:active {
    transform: scale(0.92);
  }
`;

const DetailsPanel = styled.div`
  width: 100%;
  max-width: 920px;

  background: #e9e9e9;
  border-radius: 18px;
  padding: 28px;

  margin: 0 auto 34px;

  animation: panelOpen 0.3s ease forwards;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
`;

const DetailBox = styled.div`
  background: #dcdcdc;
  border-radius: 12px;
  min-height: 115px;
  padding: 14px;
  text-align: center;
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
  }

  svg {
    font-size: 42px;
    color: #ff9f45;
  }
`;

const DetailTitle = styled.p`
  font-size: 11px;
  margin-bottom: 8px;
`;

const DetailValue = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const ChartBox = styled.div`
  width: 100%;
  max-width: 920px;

  background: #e9e9e9;
  border-radius: 18px;
  padding: 28px;

  margin: 0 auto 34px;
`;

const ForecastBox = styled.div`
  width: 100%;
  max-width: 920px;

  background: #e9e9e9;
  border-radius: 18px;
  padding: 28px;

  margin: 0 auto;
`;

const ForecastButton = styled.button`
  display: block;
  margin: 0 auto 20px;
  height: 36px;
  padding: 0 18px;
  border: none;
  border-radius: 10px;
  background: #ffb36c;
  cursor: pointer;
  transition: 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(255, 179, 108, 0.4);
  }
`;

const ForecastRow = styled.div`
  height: 34px;
  background: #dcdcdc;
  border-radius: 9px;
  padding: 0 16px;
  margin-bottom: 8px;

  display: grid;
  grid-template-columns: 1fr 70px 1fr;
  align-items: center;

  font-size: 12px;
`;

const ForecastSmallIcon = styled.img`
  width: 34px;
`;

function WeatherCast({
  currentUser,
  setCurrentUser,
  cityFromHero,
  setCityFromHero,
}) {
  const [cities, setCities] = useState([]);
  const [weatherList, setWeatherList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [forecastList, setForecastList] = useState([]);
  const [favoriteCities, setFavoriteCities] = useState([]);
  async function fetchCurrentWeather(city) {
    const response = await fetch(
      `http://localhost:5000/weather/current/${city}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'City not found');
    }

    return data;
  }

  async function fetchForecast(city) {
    const response = await fetch(
      `http://localhost:5000/weather/forecast/${city}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Forecast not found');
    }

    return data;
  }

  async function loadAllCities() {
    try {
      const weatherData = await Promise.all(
        cities.map(city => fetchCurrentWeather(city))
      );

      setWeatherList(weatherData);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function refreshCity(cityName) {
    try {
      const freshWeather = await fetchCurrentWeather(cityName);

      setWeatherList(prevList =>
        prevList.map(item => (item.name === cityName ? freshWeather : item))
      );

      toast.success(`${cityName} updated`);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function openDetails(cityName) {
    try {
      const forecastData = await fetchForecast(cityName);

      setSelectedCity(cityName);
      setForecastList(forecastData.list);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function addCityFromHero(cityName) {
    const newCity = cityName.trim();

    if (!newCity) {
      return;
    }

    if (cities.includes(newCity)) {
      toast.error('City already added');
      setCityFromHero('');
      return;
    }

    try {
      const newWeather = await fetchCurrentWeather(newCity);

      if (!currentUser) {
        setCities(prevCities => [...prevCities, newWeather.name]);
        setWeatherList(prevList => [...prevList, newWeather]);
        setCityFromHero('');
        toast.info('City added temporarily. Log in to save it.');
        return;
      }

      const response = await fetch(
        `http://localhost:5000/users/${currentUser.id}/cities`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            city: newWeather.name,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        setCityFromHero('');
        return;
      }

      setCurrentUser({
        ...currentUser,
        cities: data.cities,
      });

      setCities(data.cities);
      setWeatherList(prevList => [...prevList, newWeather]);
      setCityFromHero('');

      toast.success('City added');
    } catch (error) {
      toast.error(error.message);
      setCityFromHero('');
    }
  }

  async function deleteCity(cityName) {
    if (!currentUser) {
      setCities(prevCities => prevCities.filter(city => city !== cityName));

      setWeatherList(prevList =>
        prevList.filter(weather => weather.name !== cityName)
      );

      if (selectedCity === cityName) {
        setSelectedCity(null);
        setForecastList([]);
      }

      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/users/${currentUser.id}/cities/${cityName}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      setCurrentUser({
        ...currentUser,
        cities: data.cities,
      });

      setCities(data.cities);

      setWeatherList(prevList =>
        prevList.filter(weather => weather.name !== cityName)
      );

      if (selectedCity === cityName) {
        setSelectedCity(null);
        setForecastList([]);
      }

      toast.success('City deleted');
    } catch (error) {
      toast.error(error.message);
    }
  }
  function toggleFavorite(cityName) {
    setFavoriteCities(prev =>
      prev.includes(cityName)
        ? prev.filter(city => city !== cityName)
        : [...prev, cityName]
    );
  }
  useEffect(() => {
    if (currentUser) {
      setCities(currentUser.cities || []);
    } else {
      setCities([]);
      setWeatherList([]);
      setSelectedCity(null);
      setForecastList([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (cities.length > 0) {
      loadAllCities();
    } else {
      setWeatherList([]);
    }
  }, [cities]);

  useEffect(() => {
    if (cityFromHero) {
      addCityFromHero(cityFromHero);
    }
  }, [cityFromHero]);

  const selectedWeather = weatherList.find(
    weather => weather.name === selectedCity
  );

  const todayHourly = forecastList.slice(0, 8);
  const weekForecast = groupForecastByDay(forecastList);

  const chartData = {
    labels: todayHourly.map(item => item.dt_txt.slice(11, 16)),
    datasets: [
      {
        label: 'Temperature °C',
        data: todayHourly.map(item => Math.round(item.main.temp)),
        tension: 0.4,
      },
    ],
  };

  return (
    <Section>
      <Container>
        <CardsList>
          {weatherList.map(weather => (
            <WeatherCard key={weather.id}>
              <CardTop>
                <CityName>{weather.name}</CityName>

                <CountryText>{weather.sys.country}</CountryText>
              </CardTop>

              <CardTime>
                {new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </CardTime>

              <WeatherBadgeRow>
                <WeatherBadge>Hourly forecast</WeatherBadge>

                <WeatherBadge>Weekly forecast</WeatherBadge>
              </WeatherBadgeRow>

              <CardDate>{new Date().toLocaleDateString()}</CardDate>

              <WeatherIcon
                src={getWeatherIcon(weather.weather[0].icon)}
                alt={weather.weather[0].description}
              />

              <Temp>{Math.round(weather.main.temp)}°C</Temp>

              <Description>
                Feels like {Math.round(weather.main.feels_like)}°C
              </Description>

              <CardBottom>
                <SmallButton
                  type="button"
                  onClick={() => refreshCity(weather.name)}
                >
                  <FiRefreshCw />
                </SmallButton>

                <SmallButton
                  type="button"
                  onClick={() => toggleFavorite(weather.name)}
                >
                  {favoriteCities.includes(weather.name) ? (
                    <FaHeart color="#ff5b5b" />
                  ) : (
                    <FiHeart />
                  )}
                </SmallButton>

                <SeeMoreButton
                  type="button"
                  onClick={() => openDetails(weather.name)}
                >
                  See more
                </SeeMoreButton>

                <SmallButton
                  type="button"
                  onClick={() => deleteCity(weather.name)}
                >
                  <FiTrash2 />
                </SmallButton>
              </CardBottom>
            </WeatherCard>
          ))}
        </CardsList>

        {selectedWeather && (
          <>
            <DetailsPanel>
              <DetailsGrid>
                <DetailBox>
                  <DetailTitle>Feels like</DetailTitle>
                  <DetailValue>
                    {Math.round(selectedWeather.main.feels_like)}°C
                  </DetailValue>
                  <WiThermometer />
                </DetailBox>

                <DetailBox>
                  <DetailTitle>Min °C</DetailTitle>
                  <DetailValue>
                    {Math.round(selectedWeather.main.temp_min)}°C
                  </DetailValue>

                  <DetailTitle>Max °C</DetailTitle>
                  <DetailValue>
                    {Math.round(selectedWeather.main.temp_max)}°C
                  </DetailValue>
                </DetailBox>

                <DetailBox>
                  <DetailTitle>Humidity</DetailTitle>
                  <DetailValue>{selectedWeather.main.humidity}%</DetailValue>
                  <WiHumidity />
                </DetailBox>

                <DetailBox>
                  <DetailTitle>Pressure</DetailTitle>
                  <DetailValue>{selectedWeather.main.pressure} Pa</DetailValue>
                  <WiBarometer />
                </DetailBox>

                <DetailBox>
                  <DetailTitle>Wind speed</DetailTitle>
                  <DetailValue>{selectedWeather.wind.speed} m/s</DetailValue>
                  <WiStrongWind />
                </DetailBox>

                <DetailBox>
                  <DetailTitle>Visibility</DetailTitle>
                  <DetailValue>
                    {selectedWeather.visibility
                      ? `${selectedWeather.visibility / 1000} km`
                      : 'Unknown'}
                  </DetailValue>
                </DetailBox>
              </DetailsGrid>
            </DetailsPanel>

            <ChartBox>
              <h3>Next 24 hours forecast</h3>
              <Line data={chartData} />
            </ChartBox>

            <ForecastBox>
              <ForecastButton>7-day forecast</ForecastButton>

              {weekForecast.map(day => (
                <ForecastRow key={day.date}>
                  <span>{day.date}</span>

                  <ForecastSmallIcon
                    src={getWeatherIcon(day.icon)}
                    alt={day.description}
                  />

                  <span>
                    {day.temp}°C, {day.description}
                  </span>
                </ForecastRow>
              ))}
            </ForecastBox>
          </>
        )}
      </Container>
    </Section>
  );
}

export default WeatherCast;
