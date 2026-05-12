export const API_KEY = process.env.REACT_APP_OPENWEATHER_KEY;

export const getWeatherIcon = icon => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};



export const groupForecastByDay = forecastList => {
  const days = {};

  forecastList.forEach(item => {
    const date = item.dt_txt.split(' ')[0];

    if (!days[date]) {
      days[date] = [];
    }

    days[date].push(item);
  });

  return Object.entries(days).map(([date, items]) => {
    const middleItem = items[Math.floor(items.length / 2)];

    return {
      date,
      temp: Math.round(middleItem.main.temp),
      description: middleItem.weather[0].description,
      icon: middleItem.weather[0].icon,
    };
  });
};

export const getTodayHourlyForecast = forecastList => {
  const today = new Date().toISOString().split('T')[0];

  return forecastList.filter(item => item.dt_txt.startsWith(today));
};