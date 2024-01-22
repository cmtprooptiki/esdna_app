import React, { useRef, useEffect,useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from 'axios'
// Grab the access token from your Mapbox account
// I typically like to store sensitive things like this
// in a .env file
// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
mapboxgl.accessToken = "pk.eyJ1IjoiY210YWRtaW4iLCJhIjoiY2xyb3Q1bnRrMTlxMjJpcXpnNWh6NjF2aiJ9.dmGnyBg6XFk6LyksCN9tTA";

const coordinates = [
  { lng: 23.65545900, lat: 38.068968, dbh: 10 },
  { lng:  23.64825380, lat:38.06584070 , dbh: 45},
  { lng:  23.65248102	, lat:38.06472785 , dbh: 50},
];

export const MapPolutionComponent = () => {


  const [buildingmetricsGeo,setBuildingMetricsGeo]=useState([]);

    useEffect(()=>{
      getBuildingMetricsGeo()
      console.log(getBuildingMetricsGeo())
    },[]);

    const getBuildingMetricsGeo = async() =>{
        const response = await axios.get('http://localhost:5000/buildingmetrics-geo');
        setBuildingMetricsGeo(response.data);
        console.log(response)

    }

    


  const mapContainer = useRef();

  // this is where all of our map logic is going to live
  // adding the empty dependency array ensures that the map
  // is only created once
  useEffect(() => {
    // create the map and configure it
    // check out the API reference for more options
    // https://docs.mapbox.com/mapbox-gl-js/api/map/
    const map = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [23.65545900, 38.068968],
      zoom: 14,
    });

    map.on('load', () => {
      // Add a source and layer for heatmap
      map.addSource('trees', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: buildingmetricsGeo.map(coord => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [coord.lon, coord.lat],
            },
            properties: {
              name:coord.metricName,
              buildingId:coord.buildingName,

              dbh: coord.value,
            },
          })),
        },
      });

      map.addLayer(
        {
          id: 'trees-heat',
          type: 'heatmap',
          source: 'trees',
          maxzoom: 15,
          paint: {
            // increase weight as diameter breast height increases
            'heatmap-weight': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [1, 0],
                [62, 1]
              ]
            },
            // increase intensity as zoom level increases
            'heatmap-intensity': {
              stops: [
                [11, 1],
                [15, 3]
              ]
            },
            // assign color values be applied to points depending on their density
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(236,222,239,0)',
              0.2,
              'rgb(208,209,230)',
              0.4,
              'rgb(255, 0, 0)',
              0.6,
              'rgb(103,169,207)',
              0.8,
              'rgb(28,144,153)'
            ],
            // increase radius as zoom increases
            'heatmap-radius': {
              stops: [
                [11, 15],
                [15, 20]
              ]
            },
            // decrease opacity to transition into the circle layer
            'heatmap-opacity': {
              default: 1,
              stops: [
                [14, 1],
                [15, 0]
              ]
            }
          }
        },
        'waterway-label'
      );
    
      map.addLayer(
        {
          id: 'trees-point',
          type: 'circle',
          source: 'trees',
          minzoom: 14,
          paint: {
            // increase the radius of the circle as the zoom level and dbh value increases
            'circle-radius': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [{ zoom: 15, value: 1 }, 5],
                [{ zoom: 15, value: 62 }, 10],
                [{ zoom: 22, value: 1 }, 20],
                [{ zoom: 22, value: 62 }, 50]
              ]
            },
            'circle-color': {
              property: 'dbh',
              type: 'exponential',
              stops: [
                [0, 'rgba(236,222,239,0)'],
                [10, 'rgb(236,222,239)'],
                [20, 'rgb(208,209,230)'],
                [30, 'rgb(166,189,219)'],
                [40, 'rgb(255, 0, 0)'],
                [50, 'rgb(255, 0, 0)'],
                [60, 'rgb(255, 0, 0)']
              ]
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': {
              stops: [
                [14, 0],
                [15, 1]
              ]
            }
          }
        },
        'waterway-label'
      );

      // Add click event handler for points
      map.on('click', 'trees-point', (event) => {
        new mapboxgl.Popup()
          .setLngLat(event.features[0].geometry.coordinates)
          .setHTML(`<strong>DBH:</strong> ${event.features[0].properties.dbh}
          <strong>NAME:</strong> ${event.features[0].properties.name}
          <strong>BuildingID:</strong> ${event.features[0].properties.buildingId}`)
          .addTo(map);
      });
    });

  }, []);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};
