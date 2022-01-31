import React, { useState, useEffect } from 'react';
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
        <p>
          API-Version: {version.version}
        </p>
    </div>
  );
}

export default App;
