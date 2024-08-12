import 'bootstrap/dist/css/bootstrap.css';
import Header from './Components/Header';
import Card from './Components/Card';
import './App.css'
import { useState } from 'react';
import Dashboard from './Components/Dashboard';

function App() {
 
  const [flag, setFlag] = useState(true);
  const [questions, setQuestions] = useState([]);
  const toggleFlag1 = () => {
      setFlag(true);
  };
  const toggleFlag2 = () => {
    setFlag(false);
};

  return (
    <>
      <Header flag={flag} toggleFlag1={toggleFlag1} toggleFlag2={toggleFlag2} />
      {flag ? <Card questions={questions} setQuestions={setQuestions}/> : <Dashboard questions={questions} setQuestions={setQuestions}/>}
      


    </>
  )
}

export default App
