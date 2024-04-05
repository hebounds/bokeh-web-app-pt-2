import './App.css';

import Plus from './components/Plus'

import React from 'react';

function App() {

  return(
    <div className="text-center">
      <header className="bg-gunmetal min-h-screen flex flex-col justify-center items-center text-xl text-white">
        <div className="text-3xl font-bold text-blue-400"> TailwindCSS Example Line </div>
        <div className="mb-4 text-sm text-white"> Example Description of Plot </div>

        <Plus></Plus>
      </header>
    </div>
  );
}

export default App;