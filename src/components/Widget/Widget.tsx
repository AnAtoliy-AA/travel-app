import React, { useEffect, useState } from 'react';
import './Widget.scss';
import { getWeather } from '../../services/fetchAPI';
import { WeatherDescritpion } from '../../shared/interfaces';

type TProps = {
  capital: string;
  country: string;
};
const Widget: React.FC<TProps> = ({ country = 'Egypt', capital = 'Kair' }) => {
  const [loadingWeather, setLoadingWeather] = useState<boolean>(false);
  const [loadingDate, setLoadingDate] = useState<boolean>(false);
  const [loadingCurrancy, setLoadingCurrancy] = useState<boolean>(false);
  const [dataWeather, setDataWeather] = useState<WeatherDescritpion>({
    temp: '',
    wind: '',
    humidity: '',
    weather: {
      id: '',
      main: '',
      icon: '',
      description: '',
    },
  });
  useEffect(() => {
    const weather = async () => {
      const data = await getWeather(capital).then((res) => {
        const { main, wind, weather } = res;
        setLoadingWeather(true);
        return {
          temp: `${main.temp}`,
          wind: `${wind.speed}`,
          humidity: `${main.humidity}`,
          weather: {
            id: `${weather[0].id}`,
            main: `${weather[0].main}`,
            icon: `${weather[0].icon}`,
            description: `${weather[0].description}`,
          },
        };
      });
      setDataWeather(data);
    };
    weather();
  }, []);

  const widgetWeather = () => {
    const { temp, wind, weather, humidity } = dataWeather;
    const tempC = Math.round(+temp - 273);

    return (
      <div>
        <p>
          Temperature <span>{tempC} &deg;C</span>
          <br />
          Wind <span>{wind} m/s</span>
          <br />
          Humidity <span>{humidity} %</span>
          <br />
        </p>
      </div>
    );
  };

  const widgetCurrancy = () => {
    return (
      <div>
        <p>
          <span>1,00</span> local currency - <span>1,00</span> &#36; <br />
          <span>1,00</span> local currency - <span>1,00</span> &euro; <br />
          <span>1,00</span> local currency - <span>1,00</span> &#8381; <br />
        </p>
      </div>
    );
  };

  const widgetDate = () => {
    return (
      <div>
        <span>09.03.2021</span> - <span>14:00</span>
      </div>
    );
  };
  return (
    <div className="widget-container">
      Widget
      <div className="widget-weather">
        <p>
          Weather in {capital} ({country})
        </p>
        {!loadingWeather && <p>Loading...</p>}
        {loadingWeather && widgetWeather()}
      </div>
      <div className="widget-currancy">
        <p>local currency rate</p>

        {!loadingCurrancy && <p>Loading...</p>}
        {loadingCurrancy && widgetCurrancy()}
      </div>
      <div className="widget-locale">
        <p>The local time</p>
        {!loadingDate && <p>Loading...</p>}
        {loadingCurrancy && widgetDate()}
      </div>
    </div>
  );
};

export default Widget;
