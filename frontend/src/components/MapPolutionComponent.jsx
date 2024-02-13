import React, { useRef, useEffect,useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from 'axios';
import ReactDOM from "react-dom";
import LineChartComponent from './LineChartComponent';
import {circleColorArray} from '../components/HelperComponent';

// Grab the access token from your Mapbox account
// I typically like to store sensitive things like this
// in a .env file
// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
mapboxgl.accessToken = "pk.eyJ1IjoiY210YWRtaW4iLCJhIjoiY2xyb3Q1bnRrMTlxMjJpcXpnNWh6NjF2aiJ9.dmGnyBg6XFk6LyksCN9tTA";

// const coordinates = [
//   { lng: 23.65545900, lat: 38.068968, dbh: 10 },
//   { lng:  23.64825380, lat:38.06584070 , dbh: 45},
//   { lng:  23.65248102	, lat:38.06472785 , dbh: 50},
// ];

export const MapPolutionComponent = (props) => {
  const metricName=props.metricName;
  const year=props.year
  let colorArray=circleColorArray(metricName);
  console.log(circleColorArray(metricName));
  // if(metricName==="PM10"){
  //   colorArray = [
  //     [0, 'rgba(236,222,239,0)'],
  //     [10, 'rgb(236,222,239)'],
  //     [20, 'rgb(208,209,230)'],
  //     [30, 'rgb(166,189,219)'],
  //     [40, 'rgb(103,169,207)'],
  //     [50, 'rgb(28,144,153)'],
  //     [60, 'rgb(1,108,89)']
  // ];
  // }

  function Popup({ buildingname, metricname, metricvalue }) {
    return (
      <div className="box">
        
  
        <h3 className="route-name"><strong>{buildingname}</strong></h3>
        <div className="route-metric-row">
          <h4 className="row-title"><strong>Ρύπος: </strong>{metricname}</h4>
        </div>
        <div className="route-metric-row">
          <h4 className="row-title"><strong>Τιμή για την επιλεγμένη περίοδο: </strong>{metricvalue}</h4>
        </div>
        <LineChartComponent selectedMetric={metricName} buildingname={buildingname} />
      </div>
    );
  }

  

  const [buildingmetricsGeo,setBuildingMetricsGeo]=useState([]);

    useEffect(()=>{
      getBuildingMetricsGeo(metricName,year)
      // console.log(getBuildingMetricsGeo())
      
    },[metricName,year]);

    const getBuildingMetricsGeo = async(metricName,year) =>{

      try {
        const response = await axios.get('http://localhost:5000/buildingmetrics-geo');

        const filterCriteria = {
          metricname: metricName,
          year: year,
        };

       
        const filterdata = response.data.filter(
          (item) => item.metricName === filterCriteria.metricname && item.year === filterCriteria.year
        );
        

        setBuildingMetricsGeo(filterdata);
        // console.log(filterdata)
      } catch (error) {
        console.error('Error fetching data for Map:', error.message);
      }
        

    }

    


  const mapContainer = useRef();
  const popUpRef = useRef(new mapboxgl.Popup({ maxWidth: '600px' }))

  // this is where all of our map logic is going to live
  // adding the empty dependency array ensures that the map
  // is only created once
  useEffect(() => {
    console.log(buildingmetricsGeo)
    getMapPoints(buildingmetricsGeo)
    // create the map and configure it
    // check out the API reference for more options
    // https://docs.mapbox.com/mapbox-gl-js/api/map/
    

  }, [buildingmetricsGeo]);


  const getMapPoints = async(buildingmetricsGeo) =>{
    const map = new mapboxgl.Map({
      // container: "map",
      // style: 'mapbox://styles/mapbox/dark-v11',
      // center: [23.65545900, 38.068968],
      // zoom: 12,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/mapbox/satellite-streets-v12',
center: [23.65545900, 38.068968],
zoom: 12,
pitch: 45,
bearing: -17.6,
container: 'map',
antialias: true
    });


    map.on('style.load', () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
      (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;
       
      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
      {
      'id': 'add-3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
      'fill-extrusion-color': 'green',
       
      // Use an 'interpolate' expression to
      // add a smooth transition effect to
      // the buildings as the user zooms in.
      'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'height']
      ],
      'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height']
      ],
      'fill-extrusion-opacity': 1
      }
      },
      labelLayerId
      );
      });


      map.on('style.load', () => {
        map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
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

              value: coord.value,
            },
          })),
        },
      });
      
      // map.addLayer(
      //   {
      //     id: 'trees-heat',
      //     type: 'heatmap',
      //     source: 'trees',
      //     maxzoom: 20,
      //     paint: {
      //       // increase weight as diameter breast height increases
      //       'heatmap-weight': {
      //         property: 'value',
      //         type: 'exponential',
      //         stops: [
      //           [1, 0],
      //           [50, 10]
      //           // [1,0],
      //           // [15,20],
      //           // [30,40],
      //           // [45,60],
      //           // [60,80]
                
      //         ]
      //       },
      //       // increase intensity as zoom level increases
      //       'heatmap-intensity': {
      //         stops: [
      //           [11, 2],
      //           [18, 5],
      //           [20,15]
      //         ]
      //       },
      //       // assign color values be applied to points depending on their density
      //       'heatmap-color': [
      //         'interpolate',
      //         ['linear'],
      //         ['heatmap-density'],
      //         ['get', 'value'],
      //         // 0,
      //         // 'rgba(236,222,239,0)',
      //         // 0.2,
      //         // 'rgb(208,209,230)',
      //         // 0.4,
      //         // 'rgb(166,189,219)',
      //         // 0.6,
      //         // 'rgb(103,169,207)',
      //         // 0.8,
      //         // 'rgb(28,144,153)'
      //         // 0,
      //         // 'rgba(0, 0, 255, 0)',    // Adjusted color to emphasize heatmap effect
      //         // 0.1,
      //         // 'rgb(0, 0, 255)',
      //         // 0.3,
      //         // 'rgb(0, 255, 0)',
      //         // 0.6,
      //         // 'rgb(255, 255, 0)',
      //         // 0.8,
      //         // 'rgb(255, 165, 0)',
      //         // 1,
      //         // 'rgb(255, 0, 0)',
      //         // 0,
      //         // 'rgba(0, 0, 255, 0)',    // Adjusted color to emphasize heatmap effect
      //         // 0.1,
      //         // 'rgb(0, 255, 0)',
      //         // 0.3,
      //         // 'rgb(0, 255, 0)',
      //         // 0.6,
      //         // 'rgb(0, 255, 0)',
      //         // 0.8,
      //         // 'rgb(0, 255, 0)',
      //         // 1,
      //         // 'rgb(0, 255, 0)',
      //         0, 'rgba(0, 255, 0, 0)', // Green for values <= 0
      //          0.5, 'rgba(0, 255, 0, 1)', // Green for values <= 50
      //           0.6, 'rgba(255, 0, 0, 1)', // Red for values > 50
      //         0.8, 'rgba(255, 0, 0, 1)' // Red for values > 62
              
      //       ],
      //       // increase radius as zoom increases
      //       'heatmap-radius': {
      //         stops: [
      //           // [1, 25],
      //           [11, 30],
      //           [18, 60],
      //           [20,90]
      //         ]
      //       },
      //       // 'heatmap-radius': [
      //       //   'interpolate',
      //       //   ['linear'],
      //       //   ['zoom'],
      //       //   0,
      //       //   2,
      //       //   9,
      //       //   20
      //       //   ],
      //       // decrease opacity to transition into the circle layer
      //       'heatmap-opacity': {
      //         default: 1,
      //         stops: [
      //           [14, 1],
      //           [15, 0]
      //         ]
      //       }
            
               
      //     }
      //   },
      //   'waterway-label'
      // );
    
      map.addLayer(
        {
          id: 'trees-point',
          type: 'circle',
          source: 'trees',
          minzoom: 10,
          paint: {
            // increase the radius of the circle as the zoom level and dbh value increases
            'circle-radius': {
              property: 'value',
              type: 'exponential',
              stops: [
                // [{ zoom: 12, value: 1 }, 5],
                // [{ zoom: 12, value: 62 }, 10*2],
                // [{ zoom: 22, value: 1 }, 20],
                // [{ zoom: 22, value: 62 }, 50*2]
                [{ zoom: 3, value: 1 }, 1],
                [{ zoom: 3, value: 100 }, 10],
                [{ zoom: 20, value: 1 }, 3],
                [{ zoom: 20, value: 100 }, 30]
                // [{ zoom: 20, value: 100 }, 3]
                // [{ zoom: 20, value: 100 }, 30]
              ]
            },
            'circle-color': {
              property: 'value',
              type: 'exponential',
              stops: colorArray.colorArray
              
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': {
              stops: [
                [15, 1],
                [20, 0.5],  // Adjust opacity at zoom level 15 to make circles less visible
                [25, 0]     // Set opacity to 0 at zoom level 18 to make circles fully transparent
              ]
            }
          }
        },
        'waterway-label'
      );






      

      // Add click event handler for points
      map.on('click', 'trees-point', (event) => {

        const popupNode = document.createElement("div")

        ReactDOM.render(
          <Popup
            buildingname={event.features[0]?.properties?.buildingId}
            metricname={event.features[0]?.properties?.name}
            metricvalue={event.features[0]?.properties?.value}
          />,
          popupNode
        )

        popUpRef.current
        .setLngLat(event.lngLat)
        .setDOMContent(popupNode)
        .addTo(map)
        
        // new mapboxgl.Popup()
        //   .setLngLat(event.features[0].geometry.coordinates)
        //   .setHTML(`
        //   <strong>BuildingID:</strong> ${event.features[0].properties.buildingId}
        //   <strong>NAME:</strong> ${event.features[0].properties.name}
        //   <strong>VALUE:</strong> ${event.features[0].properties.value}`)
        //   .addTo(map);
      });

      

    });
  }

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};
