import React from 'react';
import './Widget.scss';

const Widget = () => {
  return (
    <div className="widget-container">
      Widget
      <div className="widget-weather">
        <p>Weather in the capital of the country</p>
        <p>
          Weather <span>1.00 &ordm;C</span>
          <br />
          Feels like <span>1.00 &ordm;C</span>
          <br />
          Wind <span>1.00 m/s</span>
          <br />
          Humidity <span>1.00 %</span>
          <br />
        </p>
      </div>
      <div className="widget-currancy">
        <p>local currency rate</p>
        <p>
          <span>1,00</span> local currency - <span>1,00</span> &#36; <br />
          <span>1,00</span> local currency - <span>1,00</span> &euro; <br />
          <span>1,00</span> local currency - <span>1,00</span> &#8381; <br />
        </p>
      </div>
      <div className="widget-locale">
        <p>The local time</p>
        <span>09.03.2021</span> - <span>14:00</span>
      </div>
    </div>
  );
};

export default Widget;
