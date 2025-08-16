import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function UserInput({ setDate, setHeading }) {
  const userDate = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setHeading('Welcome');
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const userDateObj = userDate.current.valueAsDate;

    if (userDateObj) {
      const year = userDateObj.getUTCFullYear();
      const month = userDateObj.getUTCMonth();
      const date = userDateObj.getUTCDate();

      const dateUTC = new Date(Date.UTC(year, month, date));

      setDate(dateUTC);
      navigate('/home');
    }
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Enter Date of Birth</label>
        <input ref={userDate} name="date" id="date" type="date" />
        <button type="submit">ENTER</button>
      </form>
    </section>
  );
}

export default UserInput;
