import React, { useEffect, useState } from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';
import { HeatmapLayer, HexagonLayer } from '@deck.gl/aggregation-layers';
import Sidebar from './components/Sidebar';
import './App.css';
import '@fontsource/inter';

// Mapbox token
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [viewState, setViewState] = useState({
    longitude: 28.0473,
    latitude: -26.2041,
    zoom: 4,
    pitch: 0,
    bearing: 0,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const damData = [];// Remove this

  // Add new layer here
  // 
  //
  //
  //
  //
  //
  //

  // Uncomment the following after completing Question 1

  // const hexagon = new HexagonLayer({
  //   id: 'hexagonLayer',
  //   data: damData,
  //   pickable: true,
  //   extruded: true,
  //   radius: 2000,
  //   elevationScale: 100,
  //   getPosition: (d) => {
  //     const latitude = parseFloat(d.latitude_deg) + (parseFloat(d.lat_min) / 60) + (parseFloat(d.lat_sec) / 3600);
  //     const longitude = parseFloat(d.longitude_deg) + (parseFloat(d.long_min) / 60) + (parseFloat(d.long_sec) / 3600);
  //     return [longitude, -latitude];
  //   },
  // });

  // const layers = [
  //   hexagon,
  // ];

  return (
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Sidebar damData={damData} isOpen={isSidebarOpen} />
        <button
            className={`toggle-btn ${isSidebarOpen ? 'open' : ''}`}
            onClick={toggleSidebar}
            style={{left: isSidebarOpen ? '320px' : '1px'}}
        >
          <div className="icon"></div>
        </button>
        <div style={{flex: 1, position: 'relative'}}>
          {/* Add layers in the DeckGL component */}
          <DeckGL initialViewState={viewState} controller={true} layers={[]}>
            <Map
                mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
            />
          </DeckGL>
        </div>
      </div>
  );
}

export default App;