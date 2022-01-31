import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {

  const [version, setVersion] = useState({});

  useEffect(() => {
    
    fetch('/api')
      .then(res => res.json())
      .then(data => setVersion(data));
  }, []);
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          API-Version: {version.version}
        </p>
      </header>
    </div>
  );
}

export default App;
