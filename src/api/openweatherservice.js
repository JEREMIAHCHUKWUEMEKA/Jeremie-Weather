const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = '8c2506440c48655e908b26841a7477c3';

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key':  '49d6366ba8msh94ea00f8f39354dp12fb6djsn76d9cf2344d2',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

export async function fetchWeatherData(lat, lon) {
  try {
    let [weatherPromise, forcastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${'8c2506440c48655e908b26841a7477c3'}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${'8c2506440c48655e908b26841a7477c3'}&units=metric`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();
    const forcastResponse = await forcastPromise.json();
    return [weatherResponse, forcastResponse];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}