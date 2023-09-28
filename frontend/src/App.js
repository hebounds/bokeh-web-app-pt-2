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
        <div className="text-3xl font-bold text-coral"> TailwindCSS Example Line </div>

        <div class="py-8 px-8 max-w-2xl mx-auto my-8 bg-battle-grey1 rounded-xl shadow-lg space-y-2">
          <div class="py-3 px-3 max-x-2xl my-1 bg-white rounded-xl shadow-lg space-y-2">
            <div id='testPlot' className="bk-root"></div>
          </div>
        </div>        
      </header>
    </div>
  );
}

export default App;
