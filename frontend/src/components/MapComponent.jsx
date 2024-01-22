import React, { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import { parsePath } from "react-router-dom"

// Grab the access token from your Mapbox account
// I typically like to store sensitive things like this
// in a .env file
// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
mapboxgl.accessToken="pk.eyJ1IjoiY210YWRtaW4iLCJhIjoiY2xyb3Q1bnRrMTlxMjJpcXpnNWh6NjF2aiJ9.dmGnyBg6XFk6LyksCN9tTA"

export const Map = () => {
  const mapContainer = useRef()

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

    //   style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [23.65545900,38.068968],
      zoom: 14,
    })

    // map.on("load", () => {
    //     map.addSource("mapbox-dem", {
    //       type: "raster-dem",
    //       url: "mapbox://mapbox.mapbox-terrain-dem-v1",
    //       tileSize: 512,
    //       maxZoom: 16,
    //     })
   

    map.on('load', () => {
        map.addSource('trees', {
          type: 'geojson',
          data: './trees.geojson'
        });
        // add heatmap layer here
        // add circle layer here
      

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
              'rgb(166,189,219)',
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
      );});

  }, [])

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: "100%", height: "100vh" }}
    />
  )
}

export const Map2 = () => {
    const mapContainer = useRef()
  
    // this is where all of our map logic is going to live
    // adding the empty dependency array ensures that the map
    // is only created once
    useEffect(() => {
      // create the map and configure it
      // check out the API reference for more options
      // https://docs.mapbox.com/mapbox-gl-js/api/map/
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/satellite-streets-v11",
        center: [23.65545900,38.068968],
        zoom: 14,
        pitch: 60,
      })
  
      map.on("load", () => {
        map.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxZoom: 16,
        })
        map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 })
        map.addLayer({
          id: "sky",
          type: "sky",
          paint: {
            "sky-type": "atmosphere",
            "sky-atmosphere-sun": [0.0, 90.0],
            "sky-atmosphere-sun-intensity": 15,
          },
        })
      })
    }, [])
  
    return (
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "100%", height: "100vh" }}
      />
    )
  }
  
