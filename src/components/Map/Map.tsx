import React from 'react';
import './Map.scss';

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import mapGeoData from '../../services/mapGeoData';

type TProps = {
  country: string;
  capital: string;
  coordsCapital: any;
};

const Map: React.FC<TProps> = ({
  country = 'Egypt',
  capital = 'Cairo',
  coordsCapital = [53.9, 27.5667],
}) => {
  return (
    <div className="map">
      <MapContainer
        center={coordsCapital}
        zoom={6}
        // maxZoom={10}
        attributionControl={true}
        zoomControl={true}
        // doubleClickZoom={true}
        // scrollWheelZoom={true}
        scrollWheelZoom={false}
        dragging={true}
        // animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={mapGeoData('Belarus')} />
        <Marker position={coordsCapital}>
          <Popup>
            {capital} ({country})
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
