import React, { Component } from 'react';
import './Map.scss';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from 'leaflet';

class Map extends Component {
  render() {
    return (
      <div className="map">
        <MapContainer
          center={[50, 10]}
          zoom={6}
          maxZoom={10}
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
          <Marker position={[50, 10]}>
            <Popup>The capital of country</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default Map;
