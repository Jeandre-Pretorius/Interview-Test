import React, { useEffect, useState } from 'react';
import { DeckGL } from '@deck.gl/react';
import { Map } from 'react-map-gl';
import { HeatmapLayer, HexagonLayer } from '@deck.gl/aggregation-layers';
import Sidebar from './components/Sidebar';
import './App.css';
import '@fontsource/inter';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopulation } from './redux/populationSlice';
import { fetchDams } from './redux/damSlice';

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDams());
    dispatch(fetchPopulation());
  }, [])

  const {damData, populationData} = useSelector(state => {
    return {
      damData: state.dams.data,
      populationData: state.population.data
    }
  })

  const heatmapData = populationData.map(pop => {
    return {
      COORDINATES: [parseFloat(pop.lng),parseFloat(pop.lat)],
      WEIGHT: 50
    }
  })

  // Add new layer here
  const heatmap = new HeatmapLayer({
    id: 'heatmapLayer',
    data: heatmapData,
    intensity: 2,
    radiusPixels: 30,
    threshold: 0.03,
    colorRange: [[240, 249, 232],[204, 235, 197], [168, 221, 181], [123, 204, 196], [67, 162, 202], [8, 104, 172]],
    getPosition: (d) => {
      console.log(d.COORDINATES);
      return d.COORDINATES;
    },
    getWeight: (d) => d.WEIGHT
  });

  // Uncomment the following after completing Question 1

   const hexagon = new HexagonLayer({
     id: 'hexagonLayer',
     data: damData,
     pickable: true,
     extruded: true,
     radius: 2000,
     colorRange: [[255, 255, 204],[199, 233, 180], [127, 205, 187], [65, 182, 196], [44, 127, 184], [37, 52, 148]],
     elevationScale: 100,
     getPosition: (d) => {
       const latitude = parseFloat(d.latitude_deg) + (parseFloat(d.lat_min) / 60) + (parseFloat(d.lat_sec) / 3600);
       const longitude = parseFloat(d.longitude_deg) + (parseFloat(d.long_min) / 60) + (parseFloat(d.long_sec) / 3600);
       return [longitude, -latitude];
     },
   });

   const layers = [
      hexagon,
      heatmap
   ];

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
          <DeckGL initialViewState={viewState} controller={true} layers={layers} >
            <Map
                mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                style={{ width: '100%', height: '100%', color: 'red' }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
            />
          </DeckGL>
        </div>
      </div>
  );
}

export default App;