import './App.css';

import Dropdown from './components/Dropdown'

import React, { useState } from 'react';

import Axios from 'axios';

function App() {

  const [selectedDataSource, setDataSource] = useState("");

  const handleDropdownChangeDataSource = (newDataSource) => {
    setDataSource(newDataSource);
  };

  const [selectedRecording, setSelectedRecording] = useState("recording1");

  const handleDropdownChangeRecording = (newRecording) => {
    setSelectedRecording(newRecording);
  };

  const [selectedChannel, setSelectedChannel] = useState("Channel1");

  const handleDropdownChangeChannel = (newChannel) => {
    setSelectedChannel(newChannel);
  };

  const Generate = ({properties}) => {

    const handleClick = async() => {
      let lowerBound = document.getElementById('lower_bound');
      let upperBound = document.getElementById('upper_bound');
      
      let start = lowerBound.value;
      let stop = upperBound.value;

      const params = {
        channel: selectedChannel,
        start: start,
        stop: stop,
        dataSource: selectedDataSource,
        recording: selectedRecording,
      };

      Axios.get("http://127.0.0.1:5000/plot1", { 
        params: params, 
        responseType: 'blob',
        withCredentials: true
      }).then(response => 
      {
        let imageNode = document.getElementById('image');
        let imgUrl = URL.createObjectURL(response.data);
        imageNode.src = imgUrl;
      });
    }
  
    return <div>
      <button onClick={handleClick} className={properties}>Generate</button>
    </div>
  }

  return(
    <div className="text-center">
      <header className="bg-gunmetal min-h-screen flex flex-col justify-center items-center text-xl text-white">
        <div className="text-3xl font-bold text-blue-400"> TailwindCSS Example Line </div>
        <div className="text-sm text-white"> Example Description of Plot </div>

        <div className="pb-8 pt-4 px-8 mx-auto my-8 bg-battle-grey1 rounded-xl shadow-lg space-y-2">
          <div className="flex flex-row justify-left items-left">
            <div className="px-2 text-center">
              <p>Data Source:</p>
              <Dropdown route="dataSources" onChange={handleDropdownChangeDataSource} loadCondition={[null, null]} properties="rounded-md text-gunmetal"/>
            </div>
            <div className="px-2 text-center">
              <p>Recording:</p>
              <Dropdown route="recordings" onChange={handleDropdownChangeRecording} loadCondition={[selectedDataSource, null]} properties="rounded-md text-gunmetal"/>
            </div>
            <div className="px-2 text-center">
              <p>Channel:</p>
              <Dropdown route="channels" onChange={handleDropdownChangeChannel} loadCondition={[selectedDataSource, selectedRecording]} properties="rounded-md text-gunmetal"/>
            </div>
            <div className="px-2 text-center">
              <label>Start Time:</label>
              <input type="datetime-local" id="lower_bound" className="bg-white border border-white text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-0.5" placeholder="0" required></input>
            </div>
            <div className="px-2 text-center">
              <label>Stop Time:</label>
              <input type="datetime-local" id="upper_bound" className="bg-white border border-white text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-0.5" placeholder="0" required></input>
            </div>
            <div className="flex-grow"></div>
            <div className="px-2 text-center">
              <Generate properties="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"></Generate>
            </div>
          </div>
          <div className="py-3 px-3 max-x-2xl my-1 bg-white rounded-xl shadow-lg space-y-2">
            <img id='image' alt=""></img>
          </div>
        </div>        
      </header>
    </div>
  );
}

export default App;