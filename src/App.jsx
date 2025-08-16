import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import UserInput from './component/UserInput';
import { useEffect, useState } from 'react';
import ZodiacSign from './component/ZodiacSign';

function App() {
  const [date, setDate] = useState('');
  const [heading, setHeading] = useState('Welcome');

  useEffect(() => {}, [date, heading]);
  return (
    <>
      <Header heading={heading} />
      <Routes>
        <Route
          path="/"
          element={<UserInput setDate={setDate} setHeading={setHeading} />}
        />
        <Route
          path="/home"
          element={<ZodiacSign date={date} setHeading={setHeading} />}
        />
      </Routes>
    </>
  );
}

export default App;
