import axios from "axios";
import proj4 from "proj4";
import { useEffect, useState } from "react";

export default function ABC() {
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY="a77478b57ded2059da0d98d400e41ae5"

  useEffect(() => {
    // 위치 정보 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // openweathermap API 호출
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=kr&units=metric`);
          setWeatherData(response.data);
          console.log(response)
        },
        (error) => {
          console.error(error);
        },
        
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div  className="text-lg  w-72 bg-slate-600">
    <div>
      {weatherData ? (
        <div>
          <p>현재 지역: {weatherData.name}</p>
          <p>현재 온도: {(weatherData.main.temp).toFixed(1)} ℃</p>
          <p>현재 습도: {weatherData.main.humidity}%</p>
          <p>현재 날씨: {weatherData.weather[0].description}
         
          </p>
          <img src ={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} 
         alt="wthr img" />


        </div>
      ) : (
        <p>날씨 정보를 불러오는 중입니다...</p>
      )}
    </div>
    </div>
  );
}