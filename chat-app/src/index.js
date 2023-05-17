import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Test from './test';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

function AppWrapper() {
  const [showTest, setShowTest] = useState(false);

  const handleButtonClick = () => {
    setShowTest(true);
  };

  return (
    <React.StrictMode>
      <App />
      {!showTest && <button onClick={handleButtonClick}>Switch to Test</button>}
      {showTest && <Test />}
    </React.StrictMode>
  );
}

root.render(<AppWrapper />);

reportWebVitals();
