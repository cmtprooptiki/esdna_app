import React, { useRef, useState } from "react";
import { MapContainer, TileLayer ,Marker ,popUp, Popup,GeoJSON} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L,{ Icon,divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
// import seg from "./seg.json";
// import ecomp from "./ecomp.json"
const ProfileMap = (props) => {
    const mapRef = useRef(null);
    // const latitude = 51.505;
    // const longitude = -0.09; 
    const latitude = props.lat;
    const longitude = props.lon;
    console.log("lat:"+parseFloat(latitude))
    console.log("lon:"+longitude)
    // const[latitude,setlat]=useState(props.lat);
    // const[longitude,setlon]=useState(props.lon);

    const markers=[
      {
        geocode:[latitude,longitude],
        popUp:props.name
      }
    ];
    console.log(latitude)


  const multipol={"type":"FeatureCollection","features":[
    {"type":"Feature",
    "key":"01",
    "id":"01",
    "properties":{"name":"Alabama","density":94.65},
    "geometry":{"type":"Polygon","coordinates":[[
    [-67.13734, 45.13745],
    [-66.96466, 44.8097],
    [-68.03252, 44.3252],
    [-69.06, 43.98],
    [-70.11617, 43.68405],
    [-70.64573, 43.09008],
    [-70.75102, 43.08003],
    [-70.79761, 43.21973],
    [-70.98176, 43.36789],
    [-70.94416, 43.46633],
    [-71.08482, 45.30524],
    [-70.66002, 45.46022],
    [-70.30495, 45.91479],
    [-70.00014, 46.69317],
    [-69.23708, 47.44777],
    [-68.90478, 47.18479],
    [-68.2343, 47.35462],
    [-67.79035, 47.06624],
    [-67.79141, 45.70258],
    [-67.13734, 45.13745]]]}}
    ,{"type":"Feature",
    "key":"02",
    "id":"10000",
    "properties":{"name":"Portmouth","density":94.65},
    "geometry":{"type":"Polygon","coordinates":[[
    [-80.203947,25.748008],
    [-66.1184935,18.4650078],
    [-64.757,32.3209935],
    [-80.203947,25.748008]
      ]]}},
      {"type":"Feature",
    "key":"03",
    "id":"10001",
    "properties":{"name":"Portmouth","density":94.65},
    "geometry":{"type":"Polygon","coordinates":[[
    [51.502228, -0.132386],
    [51.501078, -0.141503],
    [51.504437, -0.138012],
    [51.502228, -0.132386]
      ]]}}
      
  
  ]}
  
  

  const setColor = ({ properties }) => {
    return { weight: 1 };
  };
  const customMarkerIcon = (name) =>
  divIcon({
    html: name,
    className: "icon"
  });

const setIcon = ({ properties }, latlng) => {
  return L.marker(latlng, { icon: customMarkerIcon(properties.Name) });
};


    const customIcon = new Icon({
      //iconUrl:"https://w7.pngwing.com/pngs/731/25/png-transparent-location-icon-computer-icons-google-map-maker-marker-pen-cartodb-map-marker-heart-logo-color-thumbnail.png",
      iconUrl:require("../Images/location.png"),
      iconSize:[38,38]
    });
    
    return ( 
      <div>
        
      
        <MapContainer center={[38.068968,23.65545900]} zoom={12} ref={mapRef} style={{height: "25vh", width: "25vw"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={multipol} style={setColor}/>
          {/* <GeoJSON data={seg} style={setColor} />
          <GeoJSON data={ecomp} pointToLayer={setIcon} /> */}
          {}
          <MarkerClusterGroup>
          {/* Additional map layers or components can be added here */
            markers.map((marker) =>(
              <Marker position={marker.geocode} icon={customIcon} >
                <Popup>
                  {marker.popUp}
                </Popup>
              </Marker>
              
            ))
            
          }
          
          </MarkerClusterGroup>
          

        </MapContainer>
        </div>
    );
  };
  
  export default ProfileMap;