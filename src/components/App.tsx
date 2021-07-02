import React,{useState} from 'react';
import logo from '../logo.svg';
import {tranformedPytania} from '../utils/transformToList'
import './App.css';

function App() {
  const [question, setQuestion] = useState('Tutaj pojawi się pytanie po kliknięciu przycisku losuj');

  const getRandomQuestion = () => {
    return tranformedPytania[Math.floor(Math.random()*tranformedPytania.length)].question;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {question}
        </p>
        <button
          className="App-link"
          onClick={()=>setQuestion(getRandomQuestion())}
        >
          Losuj
        </button>
      </header>
    </div>
  );
}

export default App;
