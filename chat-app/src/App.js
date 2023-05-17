import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/submit', {
        input1: inputValue1,
        input2: inputValue2,
        input3: inputValue3,
        input4: inputValue4
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };

  const handleInputChange3 = (event) => {
    setInputValue3(event.target.value);
  };

  const handleInputChange4 = (event) => {
    setInputValue4(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Login Attempt number 1</p>
        <input name='i1' type="text" value={inputValue1} onChange={handleInputChange1} />
        <input name='i2' type="text" value={inputValue2} onChange={handleInputChange2} />
        <input name='i3' type="text" value={inputValue3} onChange={handleInputChange3} />
        <input name='i4' type="text" value={inputValue4} onChange={handleInputChange4} />
        <button onClick={handleSubmit}>Submit</button>
      </header>
    </div>
  );
}

export default App;