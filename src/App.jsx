/* eslint-disable */
import Papa from 'papaparse';
import React, { useState } from 'react';
import Map2 from './Map';
import SimpleMap from './SpreadMap';
import './App.css';
import Popup from './Popup';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [dataPred, setPredData] = useState([]);
  const [data2, setData2] = useState([]);
  const [dataPred2, setPredData2] = useState([]);
  const [files, setFiles] = useState("");
  const [files2, setFiles2] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [data3, setData3] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  var coords = {}
  // var coords2 = {}
  var windData = []

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const handleClick = async () => {
    console.log("OK")
    changeText();
      await fetch('http://localhost:8000/runscript', {
        method: 'GET',
      });
  };

  const fetchWeather = async () => {
    const loc1 = [{
      lat : 34.4819,
      lng : 73.0833
    }, {
      lat : 34.5006,
      lng : 72.8917
    }]
    for (let i = 0; i < loc1.length; i++){
      await fetch(`http://api.weatherapi.com/v1/current.json?key=d887b45deea74d9fbde103640230703&q=${loc1[i].lat},${loc1[i].lng}`)
        .then(response => response.json())
        .then(response => windData.push(response.current))
        .catch(err => console.error(err));
      windData[i]["lat"] = loc1[i].lat
      windData[i]["lng"] = loc1[i].lng
      console.log(i, "value", windData)
    }
  return windData;
  }

  function handleFile (file) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete (results) {
          resolve(results.data)
        },
        error (err) {
          reject(err)
        }
      })
    })
  }

  function handleFile2 (file) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete (results) {
          resolve(results.data)
        },
        error (err) {
          reject(err)
        }
      })
    })
  }
  

  const setCoords = async () => {
    let val = await fetchData();
    let val2 = await fetchWeather();
    await myfunc(val.data);
    let header = "latitude,longitude,bright_ti4,scan,track,acq_date,acq_time,satellite,confidence,version,bright_ti5,frp,daynight";
    data.map((row, index) => (
      coords[index] = [row.latitude,row.longitude,row.bright_ti4,row.scan,row.track,row.acq_date,row.acq_time,row.satellite,row.confidence,row.version,row.bright_ti5,row.frp,row.daynight]
    ))
    const len = Object.keys(coords).length;
    for (let i = 0; i < len; i++){
      let num = Number(coords[i][0]);
      let num2 = Number(coords[i][1]);
      coords[i][0] = num 
      coords[i][1] = num2
    }
    delete coords[len-1] 
    setData2([coords,val2])
  }

  const myfunc = async (res) => {
    if (!res) return;
    else {
      let temp = await handleFile(res)
      setData(temp)
    }
  }

  const handleChange = async () => {
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
    setFiles([data,data2,data3,data4,data5]);
  };

  const showPredData = () => {
    console.log("datapred2 here",dataPred2)
  }

  function showFiles () {
      setFiles2(files)
  }

  const changeText = () => {
    document.getElementById('label-text').innerHTML = 'Data Fetched';
    togglePopup();
  }

  const changeText2 = () => {
    document.getElementById('label-text2').innerHTML = 'GeoJSON File Uploaded';
  }

  const changeText4 = () => {
    document.getElementById('label-text').innerHTML = 'Data Fetched, Click Below';
  }

  const fetchData = async () => {
    let response = await fetch("http://localhost:8000/readFile");
    let data = await response.json();
    return data;
  } 

  const oneFunc  = async () => {
    await handleClick();
  }

  return (
    
    <div>
      {isOpen && <Popup
          content={<>
            <h1>Fetching Data</h1>
            <h4>Once the popup closes, please wait htmlFor a few seconds. And then click on <strong>Display Hotspots</strong>.</h4>
          </>}
          handleClose={togglePopup}
        />}
        
        <div className="container-fluid">
          <div className="row top_bar">
            <div className="col-md-1 logo">
                <img src="https://cdn-icons-png.flaticon.com/512/3898/3898712.png" height="80" alt="Forestry" />
            </div>
            <div className="col-md-9 title_text">
              <h1>KNOW YOUR FOREST</h1>
              <p>Forest Fire Prediction and Spread Visualization</p>
            </div>
          </div>  
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="sidebar">
                <button type="file" id='files' className='hidden' style={{display:'none'}}/>
                <div className="input-file">
                  <button type="button" id='label-text' htmlFor="files" onClick={oneFunc}>Fetch Data</button>
                </div>
                <div className="input-file">
                  <button onClick={setCoords}>Display Hotspots</button>
                </div>
              </div>

              <div className="sidebar">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-7">
                      <label htmlFor="latitude">Latitude</label>
                    </div>
                    <div className="col-md-auto">
                      <p> <span id="latVal"></span></p>
                    </div>
                  </div>
                </div>  
                <input className="slider" type="range" id="latRange" name="latRange" min="34.0" max="47.0" step="0.01"/>

                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-7">
                      <label htmlFor="londitude">Longitude</label>
                    </div>
                    <div className="col-md-auto">
                      <p> <span id="longVal"></span></p>
                    </div>
                  </div>
                </div>  
                <input className="slider" type="range" id="longRange" name="longRange" min="72.0" max="88.0" step="0.01"/>

                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <label htmlFor="formGroupExampleInput" className="form-label">Wind Speed (KM/hr)</label>
                      <input type="text" step="any" className="form-control" id="formGroupExampleInput" placeholder="12.5" 
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}/>
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="formGroupExampleInput" className="form-label">Wind Direction (degrees)</label>
                      <input type="text" step="any" className="form-control" id="formGroupExampleInput" placeholder="206" 
                      value={inputValue2}
                      onChange={(event) => setInputValue2(event.target.value)}/>
                    </div>
                  </div>
                </div>    

                <div className="input-file">
                  <button onClick={setCoords}>Display Fire Spread</button>
                </div>
              </div>
            </div>
            <div className="col-md-auto">
              <Map2 locations={data2}/>
            </div>

          </div> 
        </div>

    </div>
    
  );

};
// var latSlider = document.getElementById("latRange");
// var latOutput = document.getElementById("latVal");
// latOutput.innerHTML = latSlider.value;

// latSlider.oninput = function() {
//   latOutput.innerHTML = this.value;
// }

// var longSlider = document.getElementById("longRange");
// var longOutput = document.getElementById("longVal");
// longOutput.innerHTML = longSlider.value;

// longSlider.oninput = function() {
//   longOutput.innerHTML = this.value;
// }
export default MyComponent;
