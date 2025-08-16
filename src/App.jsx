import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import UserInput from './component/UserInput';
import { useEffect, useState } from 'react';

function App() {
  const [date, setDate] = useState('');

  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UserInput setDate={setDate} />} />
      </Routes>
    </>
  );
}

export default App;
