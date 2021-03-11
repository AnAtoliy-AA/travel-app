import React, { useEffect, useState } from 'react';
import './Widget.scss';
import { getWeather, getTime, getCurrancy } from '../../services/fetchAPI';
import { getIcon } from '../../services/getIcons';
import {
  WeatherDescritpion,
  TimeDescritpion,
  CurrencyDescritpion,
} from '../../shared/interfaces';

type TProps = {
  capital: string;
  capitalEng: string;
  country: string;
  currancy: string;
};
const Widget: React.FC<TProps> = ({
  country = 'Egypt',
  capital = 'Kair',
  capitalEng = 'Kair',
  currancy = 'EGP',
}) => {
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
  const [dataTime, setDataTime] = useState<TimeDescritpion>({
    time_24: '',
    date: '',
    timezone_offset: 0,
  });
  const [dataCurrancy, setCurrancy] = useState<CurrencyDescritpion>({
    eur: 0,
    rub: 0,
    local: 0,
  });

  useEffect(() => {
    const weather = async () => {
      const data = await getWeather(capitalEng).then((res) => {
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
  }, [capitalEng]);

  useEffect(() => {
    const dateCity = async () => {
      const data = await getTime(capitalEng).then((res) => {
        setLoadingDate(true);
        const { time_24, date, timezone_offset } = res;
        return { time_24, date, timezone_offset };
      });
      setDataTime(data);
    };
    dateCity();
  }, [capitalEng]);

  useEffect(() => {
    const currancyExchange = async () => {
      const data = await getCurrancy(currancy).then((res) => {
        const { quotes } = res;
        setLoadingCurrancy(true);
        return {
          eur: quotes.USDEUR,
          rub: quotes.USDRUB,
          local: quotes[`USD${currancy}`],
        };
      });
      setCurrancy(data);
    };
    currancyExchange();
  }, [currancy]);

  const widgetWeather = () => {
    const { temp, wind, weather, humidity } = dataWeather;
    const tempC = Math.round(+temp - 273);

    const weatherImageIcon = () => {
      return <img src={getIcon(weather.icon)} alt={weather.description} />;
    };

    return (
      <div>
        {weatherImageIcon()}
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

  const localCurrancySymbol = (cur: string) => {
    switch (cur) {
      case 'CNY':
        return <span>&yen;</span>;
      case 'RUB':
        return <span>&#8381;</span>;
      case 'EUR':
        return <span>&euro;</span>;
      case 'USD':
        return <span>&#36;</span>;
      // case 'EGP':
      //   return <span>EGP</span>;
      case 'BYN':
        return <span>&#8381;</span>;
      default:
        return <span>{cur}</span>;
    }
  };

  const widgetCurrancy = () => {
    const currensyUSDEUR: number = dataCurrancy.eur;
    const currensyUSDRUB: number = dataCurrancy.rub;
    const currensyUSD: any = (dataCurrancy.local * 10).toFixed(1);
    const currensyEUR = (currensyUSD / currensyUSDEUR).toFixed(1);
    const currensyRUB = ((currensyUSD * 10) / currensyUSDRUB).toFixed(1);

    return (
      <div>
        <p>
          <span>{currensyUSD}</span>
          {localCurrancySymbol(currancy)} - <span>10</span>
          {localCurrancySymbol('USD')} <br />
          <span>{currensyEUR}</span>
          {localCurrancySymbol(currancy)} - <span>10</span>
          {localCurrancySymbol('EUR')} <br />
          <span>{currensyRUB}</span>
          {localCurrancySymbol(currancy)}- <span>100</span>
          {localCurrancySymbol('RUB')} <br />
        </p>
      </div>
    );
  };

  const widgetDate = () => {
    const { date, time_24 } = dataTime;
    return (
      <div>
        <span>{date}</span> - <span>{time_24}</span>
      </div>
    );
  };

  return (
    <div className="widget-container">
      Widget
      <div className="widget-weather">
        <p>Weather in {capital}</p>
        {!loadingWeather && <p>Loading...</p>}
        {loadingWeather && widgetWeather()}
      </div>
      <div className="widget-currancy">
        <p>Currency exchange</p>
        {!loadingCurrancy && <p>Loading...</p>}
        {loadingCurrancy && widgetCurrancy()}
      </div>
      <div className="widget-locale">
        <p>Time in {capital}</p>
        {!loadingDate && <p>Loading...</p>}
        {loadingDate && widgetDate()}
      </div>
    </div>
  );
};

export default Widget;
