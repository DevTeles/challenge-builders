import axios from 'axios';

interface propsCoords {
  latitude: number;
  longitude: number;
  latitudeDelta?: number
  longitudeDelta?: number
}

export default async function getCurrentWeather(locationCoords: propsCoords) {
  const lat = locationCoords.latitude;
  const log = locationCoords.longitude
  
  let result: any = []  

  await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=9c967e96eb753f938b2a4a5e03608740`)
  .then((response) => {
    const data = response.data
    const locationName = (data.sys.country + ', ' + data.name)
    const temperatureMin: number = data.main.temp_min;
    const temperatureMax: number = data.main.temp_max;
    const wind: number = data.wind.speed;
    const humidity: number = data.main.humidity;
    const currentTemperature: number = data.main.temp;
    const icon: string = data.weather[0].icon;

    result = [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity, icon]
  })
  .catch((error) => {
    console.log(error)
  })

  return result;
}