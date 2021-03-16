import React, { Fragment, useEffect, useState } from 'react';
import './Widget.scss';
import { getWeather, getCurrancy } from '../../services/fetchAPI';
import { getIcon } from '../../services/getIcons';
import {
  WeatherDescritpion,
  TimeDescritpion,
  CurrencyDescritpion,
} from '../../shared/interfaces';

import { Typography } from '@material-ui/core';

type TProps = {
  capital: string;
  capitalEng: string;
  country: string;
  currancy: string;
  timezone: number;
};
const Widget: React.FC<TProps> = ({
  capital = 'Kair',
  capitalEng = 'Kair',
  currancy = 'EGP',
  timezone = 0,
}) => {
  const [loadingWeather, setLoadingWeather] = useState<boolean>(false);
  const [loadingCurrancy, setLoadingCurrancy] = useState<boolean>(false);
  const [loadingClock, setLoadingClock] = useState<boolean>(false);

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
  const [dataCurrancy, setCurrancy] = useState<CurrencyDescritpion>({
    eur: 0,
    rub: 0,
    local: 0,
  });

  const [clockSec, setClockSec] = useState<number>(0);
  const [clockData, setClockData] = useState<TimeDescritpion>({
    month: '01',
    day: '01',
    year: '2021',
    hour: '00',
    min: '00',
    sec: '00',
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
    let timer = setTimeout(() => {
      const data = new Date();

      let year, mon, day, hour, min, sec;
      let hourCapital: number = 0;
      if (timezone === 0) {
        year = data.getFullYear();
        mon = data.getMonth() + 1;
        day = data.getDate();
        hour = data.getHours();
        min = data.getMinutes();
        sec = data.getSeconds();

        hourCapital = hour;
      } else {
        year = data.getUTCFullYear();
        mon = data.getUTCMonth() + 1;
        day = data.getUTCDate();
        hour = data.getUTCHours();
        min = data.getUTCMinutes();
        sec = data.getUTCSeconds();

        hourCapital = hour + timezone;
        if (hourCapital > 24) {
          day += 1;
          hourCapital = hourCapital - 24;
        }
      }

      const monNew = mon < 10 ? `0${mon}` : `${mon}`;
      const dayNew = day < 10 ? `0${day}` : `${day}`;
      const hourNew = hourCapital < 10 ? `0${hourCapital}` : `${hourCapital}`;
      const minNew = min < 10 ? `0${min}` : `${min}`;
      const secNew = sec < 10 ? `0${sec}` : `${sec}`;

      const next = {
        month: monNew,
        day: dayNew,
        year: `${year}`,
        hour: hourNew,
        min: minNew,
        sec: secNew,
      };
      setClockSec(clockSec + 1);
      setClockData((prev) => next);
      setLoadingClock(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [clockSec]);

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
      <Fragment>
        <Typography variant="body1" color="textPrimary" component="p">
          {tempC} &deg;C
        </Typography>
        {weatherImageIcon()}
        <div>
          <Typography variant="body1" color="textPrimary" component="p">
            {wind} m/s
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            {humidity} %
          </Typography>
        </div>
      </Fragment>
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
      <Fragment>
        <Typography variant="body1" color="textPrimary" component="p">
          {currensyUSD} {localCurrancySymbol(currancy)} - 10{' '}
          {localCurrancySymbol('USD')}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
          {currensyEUR} {localCurrancySymbol(currancy)} - 10{' '}
          {localCurrancySymbol('EUR')}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
          {currensyRUB} {localCurrancySymbol(currancy)}- 100{' '}
          {localCurrancySymbol('RUB')}
        </Typography>
      </Fragment>
    );
  };

  const widgetClock = () => {
    const { month, day, year, hour, min, sec } = clockData;
    return (
      <Fragment>
        <Typography variant="body1" color="textPrimary" component="p">
          {day} - {month} - {year} {hour} : {min} : {sec}
        </Typography>
      </Fragment>
    );
  };
  return (
    <React.Fragment>
      <div className="widget-weather">
        {!loadingWeather && <p>Loading...</p>}
        {loadingWeather && widgetWeather()}
      </div>
      <div className="widget-currancy">
        {!loadingCurrancy && <p>Loading...</p>}
        {loadingCurrancy && widgetCurrancy()}
      </div>
      <div className="widget-locale">
        {!loadingClock && <p>Loading...</p>}
        {loadingClock && widgetClock()}
      </div>
    </React.Fragment>
  );
};

export default Widget;
