/* eslint-disable*/
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import React, { useState } from "react";
import SimpleMap from './SpreadMap';
import Popup from './Popup';
import './map.css';

  const Map2 = (locations) => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [showInfoWindow, setInfoWindowFlag] = useState(true);
    const [selectedElement2, setSelectedElement2] = useState(null);
    const [activeMarker2, setActiveMarker2] = useState(null);
    const [showInfoWindow2, setInfoWindowFlag2] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [files2, setFiles2] = useState([]);
    const [files3, setFiles3] = useState([]);
    const [files4, setFiles4] = useState([]);
    const [files5, setFiles5] = useState([]);
    const [startingLoc, setStartingLoc] = useState([]);
    var temp = locations["locations"][0]
    var temp2 = locations["locations"][0]
    var temp3 = locations["locations"][1]
    const [lat, setStartingLat] = useState(0);
    const [lng, setStartingLng] = useState(0);
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
    const handleClick = async (mapProps, map, event) => {
      setStartingLat(await event.latLng.lat())
      setStartingLng(await event.latLng.lng())
      await fetch("http://localhost:8000/runforefire" , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({lat, lng, temp3})
      })
      let response = await fetch("http://localhost:8000/readgeojson");
      let response2 = await fetch("http://localhost:8000/readgeojson2");
      let response3 = await fetch("http://localhost:8000/readgeojson3");
      let response4 = await fetch("http://localhost:8000/readgeojson4");
      let response5 = await fetch("http://localhost:8000/readgeojson5");
      let data = await response.json();
      let data2 = await response2.json();
      let data3 = await response3.json();
      let data4 = await response4.json();
      let data5 = await response5.json();
      data = data.features[0].geometry.coordinates[0]
      data2 = data2.features[0].geometry.coordinates[0]
      data3 = data3.features[0].geometry.coordinates[0]
      data4 = data4.features[0].geometry.coordinates[0]
      data5 = data5.features[0].geometry.coordinates[0]
      setFiles([data,lat,lng]);
      setFiles2([data2,lat,lng]);
      setFiles3([data3,lat,lng]);
      setFiles4([data4,lat,lng]);
      setFiles5([data5,lat,lng]);
      togglePopup();
    };
    if (temp === undefined) {
        return (
          <div style={{ height: '50vh', width: '100%' }}>
          </div>
        );
    }
    else {
        return (
          <div>
            <div>
            <Map style={{ height: '100%', width: '100%' }}
              google={google}
              initialCenter={{
                lat: 31.5,
                lng: 74.35
              }}
              zoom={7}
              onClick={handleClick}
            >
              {Object.values(temp2).map((value, index) => {
                if (((value[0] > 34.05) || (value[0] < 23.35)) || ((value[1] > 74.5) || (value[1] < 60.5))) {
                  let x=1
                }
                else {
                  let url = "http://maps.google.com/mapfiles/ms/icons/";
                  url += "firedept.png";
                  return (
                    <Marker
                      key={index}
                      position={{
                        lat: value[0],
                        lng: value[1]
                      }}
                      icon={{
                        url:url,
                        scaledSize: new google.maps.Size(15, 15)
                      }}
                      onClick={(props, marker) => {
                        setSelectedElement(value);
                        setActiveMarker(marker);
                      }}
                    />
                  );
                }
              })}
              {Object.values(temp3).map((value, index) => {
                const svgMarker = {
                  path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                  // path: "M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM4.5 13.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1z",
                  fillColor: "red",
                  fillOpacity: 0.6,
                  strokeWeight: 0,
                  rotation: value.wind_degree,
                  scale: 3,
                  anchor: new google.maps.Point(0, 20),
                };
                  return (
                    <Marker
                      key={index}
                      position = {{
                        lat: value.lat,
                        lng: value.lng
                      }}
                      icon = {svgMarker}
                      onClick={(props, marker) => {
                        setSelectedElement2(value);
                        setActiveMarker2(marker);
                      }}
                    />
                  );
              })}
              {selectedElement2 ? (
                <InfoWindow
                  visible={showInfoWindow2}
                  marker={activeMarker2}
                  onCloseClick={() => {
                    setSelectedElement2(null);
                  }}
                >
                  <div>
                    <p>Wind Speed: {selectedElement2.wind_kph}</p>
                    <p>Wind Direction: {selectedElement2.wind_degree}</p>
                    <p>Wind Gust: {selectedElement2.gust_kph}</p>
                    <p>Latitude: {selectedElement2.lat}</p>
                    <p>Longitude: {selectedElement2.lng}</p>
                  </div>
                </InfoWindow>
              ) : null}
              {selectedElement ? (
                <InfoWindow
                  visible={showInfoWindow}
                  marker={activeMarker}
                  onCloseClick={() => {
                    setSelectedElement(null);
                  }}
                >
                  <div>
                    <p>Latitude: {selectedElement[0]}</p>
                    <p>Longitude: {selectedElement[1]}</p>
                    <p>Bright_Ti4: {selectedElement[2]}</p>
                    <p>Scan: {selectedElement[3]}</p>
                    <p>Track: {selectedElement[4]}</p>
                    {/* <p>Acquired Date: {selectedElement[5]}</p> */}
                    {/* <p>Acquired Time: {selectedElement[6]}</p> */}
                    {/* <p>Satellite: {selectedElement[7]}</p> */}
                    <p>Confidence: {selectedElement[8]}</p>
                    {/* <p>Version: {selectedElement[9]}</p> */}
                    <p>Bright_Ti5: {selectedElement[10]}</p>
                    <p>FRP: {selectedElement[11]}</p>
                    <p>Daynight: {selectedElement[12]}</p>
                  </div>
                </InfoWindow>
              ) : null}
            </Map>
          </div>
          {isOpen && files && startingLoc && 
            <Popup className="popup"
              content = {<>
              <div>
                <h1 className="spread_title">
                  Fire Spread Visualization
                </h1><br />
                <p className="spread_text">Hourly Basis</p>
              </div>

              <div className="row" style={{ textAlign: 'center', padding: '0px 60px' }}>
                <div className="col-md-3 param_box" style={{ textAlign: 'center' }}>
                  <p className="param_text"> Latitude: {lat}</p>
                </div>
                <div className="col-md-3 param_box" style={{ textAlign: 'center' }}>
                <p className="param_text">Longitude: {lng}</p>
                </div>
                <div className="col-md-3 param_box" style={{ textAlign: 'center' }}>
                <p className="param_text">Wind Speed: {temp3[0].wind_kph} KPH</p>
                </div>
                <div className="col-md-auto param_box" style={{ textAlign: 'center' }}>
                <p className="param_text">Wind Direction: {temp3[0].wind_degree} Degrees</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{width:'30vh', height:'100%', textAlign: "center"}}>
                  <strong>Hour 1</strong>
                  <SimpleMap locations = {files}/>
                </div>
                <div style={{width:'40vh', height:'100%', textAlign: "center"}}>
                  <strong>Hour 2</strong>
                  <SimpleMap locations = {files2}/>
                </div>
              
                <div style={{width:'45vh', height:'100%', textAlign: "center"}}>
                  <strong>Hour 3</strong>
                  <SimpleMap locations = {files3}/>
                </div>
                <div style={{width:'50vh', height:'100%', textAlign: "center"}}>
                  <strong>Hour 4</strong>
                  <SimpleMap locations = {files4}/>
                </div>
                <div style={{width:'60vh', height:'100%', textAlign: "center"}}>
                  <strong>Hour 5</strong>
                  <SimpleMap locations = {files5}/>
                </div>
              </div>
              </>}
              handleClose={togglePopup}
            />
          }
          </div>
        );
    }
    };
    
export default GoogleApiWrapper({
    apiKey: "AIzaSyAghkx61FRH1BREoHHWjMI64pZcCiL56SU",
})(Map2);


