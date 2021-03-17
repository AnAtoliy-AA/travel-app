import React, { Fragment, useEffect, useState } from 'react';
import './Map.scss';
import * as dataBelarusGeo from '../../services/geoData/belarus.geo.json';
import * as dataBelgiumGeo from '../../services/geoData/belgium.geo.json';
import * as dataChinaGeo from '../../services/geoData/china.geo.json';
import * as dataEgyptGeo from '../../services/geoData/egypt.geo.json';
import * as dataGreeceGeo from '../../services/geoData/greece.geo.json';
import * as dataRussiaGeo from '../../services/geoData/russia.geo.json';
import * as dataItalyGeo from '../../services/geoData/italy.geo.json';
import * as dataSpainGeo from '../../services/geoData/spain.geo.json';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';

import { Button, Icon } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { makeStyles } from '@material-ui/core/styles';

import { CircularProgress } from '@material-ui/core';
import Fullscreen from '@material-ui/icons/Fullscreen';

type TProps = {
  capitalEng: string;
  capital: string;
  country: string;
  coordsCapital: any;
};

const Map: React.FC<TProps> = ({
  capitalEng = 'Cairo',
  capital = 'Cairo',
  country = 'Egypt',
  coordsCapital = [53.9, 27.5667],
}) => {
  const [mapCountries, setMapCountries] = useState<any>([]);
  const [loadingMap, setLoadingMap] = useState<boolean>(false);
  const [isFull, setFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const getJsonData = (c: string) => {
      let jsonData: any = [];
      switch (c) {
        case 'Minsk':
          jsonData = dataBelarusGeo['features'];
          break;
        case 'Brussel':
          jsonData = dataBelgiumGeo['features'];
          break;
        case 'Beijing':
          jsonData = dataChinaGeo['features'];
          break;
        case 'Cairo':
          jsonData = dataEgyptGeo['features'];
          break;
        case 'Athens':
          jsonData = dataGreeceGeo['features'];
          break;
        case 'Rome':
          jsonData = dataItalyGeo['features'];
          break;
        case 'Moscow':
          jsonData = dataRussiaGeo['features'];
          break;
        case 'Madrid':
          jsonData = dataSpainGeo['features'];
          break;
        default:
          break;
      }
      setMapCountries(jsonData);
    };

    getJsonData(capitalEng);
    setLoadingMap(true);
  }, [capitalEng]);

  const handleScreen = () => {
    if (!isFull) {
      setFullscreen(true);
    } else {
      setFullscreen(false);
    }
  };
  const classMap = () => {
    return isFull ? 'map map__fullscreen' : 'map';
  };

  return (
    <Fragment>
      {!loadingMap && <CircularProgress />}
      {loadingMap && (
        <div className={classMap()}>
          <Button
            size="small"
            color="primary"
            className="map__screen"
            onClick={handleScreen}
          >
            {!isFull && <Fullscreen />}
            {isFull && <FullscreenExitIcon />}
          </Button>

          <MapContainer
            center={coordsCapital}
            zoom={5}
            maxZoom={22}
            attributionControl={true}
            zoomControl={true}
            scrollWheelZoom={false}
            dragging={true}
            easeLinearity={0.35}
          >
            {/* <TileLayer
    url="https://api.mapbox.com/styles/v1/burik84/ckmaza88n3x0x17qi3guhgbcv.html?fresh=true&title=view&access_token=pk.eyJ1IjoiYnVyaWs4NCIsImEiOiJja21heTJlcWYxMjN2MndwaDd1c3k2MnM3In0.JE0gwAcAaLTj1qYLZueUOA"
    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
  /> */}

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON data={mapCountries} />
            <Marker position={coordsCapital}>
              <Popup>
                {capital} ({country})
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </Fragment>
  );
};

export default Map;
