import axios from "axios";
import proj4 from "proj4";
import { useEffect, useState } from "react";

export default function ABC() {
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_WEATER_API_KEY;

  const now = new Date();
  const year = now.getFullYear(); // 현재 연도
  const month = now.getMonth() + 1; // 현재 월 (0부터 시작하므로 +1)
  const day = now.getDate(); // 현재 일

  useEffect(() => {
    // 위치 정보 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // openweathermap API 호출
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=kr&units=metric`
          );
          setWeatherData(response.data);
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="w-80  rounded-2xl text-lg ">
      {/* <div>
      {weatherData ? (
        <div>
          <p>현재 지역: {weatherData.name}</p>
          <p>현재 온도: {(weatherData.main.temp).toFixed(1)} ℃</p>
          <p>현재 습도: {weatherData.main.humidity}%</p>
          <p>현재 날씨: {weatherData.weather[0].description}
          weatherData.main.feels_like
         
          </p>
          <img src ={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} 
         alt="wthr img" />


        </div>
      ) : (
        <p>날씨 정보를 불러오는 중입니다...</p>
      )}
    </div> */}

      {weatherData ? (
        <>
          <div className="mx-auto flex   justify-center p-4">
            <div className="flex flex-wrap">
              <div className="w-full   px-2">
                <div className=" relative mb-4 w-full min-w-0 overflow-hidden break-words rounded-lg bg-[#25a6ce] text-white shadow-sm  dark:bg-gray-600">
                  <div className="relative px-6 py-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p>현재 지역: {weatherData.name}</p>
                        <h6 className="mb-0">
                          {year + "." + month + "." + day}
                        </h6>
                        <small>{weatherData.weather[0].description}</small>
                      </div>
                      <div className="">
                        <img
                          width={150}
                          height={150}
                          src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                          alt="wthr img"
                        />
                      </div>
                    </div>
                    <div className="block flex-wrap items-center justify-between sm:flex">
                      <div className="w-full ">
                        <div className="mb-2 flex items-center justify-between">
                          <span>온도</span>
                          <small className="inline-block px-2">
                            {weatherData.main.temp.toFixed(1)}&nbsp;&deg;
                          </small>
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="mb-2 flex items-center justify-between">
                          <span>체감온도</span>
                          <small className="inline-block px-2">
                            {weatherData.main.feels_like}&nbsp;&deg;
                          </small>
                        </div>
                      </div>
                      <div className="w-full ">
                        <div className="mb-2 flex items-center justify-between">
                          <span>습도</span>
                          <small className="inline-block px-2">
                            {weatherData.main.humidity}%
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
