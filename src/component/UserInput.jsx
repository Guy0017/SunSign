import React, { useRef } from 'react';

function UserInput({ setDate }) {
  const userDate = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const emptyDate = userDate.current.valueAsDate === null;

    !emptyDate && setDate(userDate.current.valueAsDate);
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
