import './App.css';
import React, { useEffect } from 'react';
import Axios from 'axios';

// Use window.Bokeh due to Bokeh import issues

function App() {

  useEffect(() => {
    Axios.get("http://127.0.0.1:5000/plot1").then(resp => 
    {
      window.Bokeh.embed.embed_item(resp.data, 'testPlot')
    })
  }, [])

  return(
    <div className="App">
      <header className="App-header">
        <div id='testPlot' className="bk-root"></div>
      </header>
    </div>
  );
}

export default App;
