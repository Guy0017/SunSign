import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ZodiacSign({ date, setHeading }) {
  const [renderDate, setRenderDate] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    if (!date) navigate('/');
    date && setRenderDate(formattedDate());
    date && findZodiacDegree();
  }, [date]);

  function findZodiacDegree() {
    const vernalEquinox = new Date(Date.UTC(2025, 2, 20, 9, 1));
    const birthdate = new Date(date.getTime());
    const cycle = {
      solar: 365.24217,
      calendar: 365.2425,
      sunSign: 360,
    };

    const solarOrbitPerDay = cycle.solar / cycle.calendar;
    const zodiacDegreePerSolarDay = cycle.sunSign / cycle.solar;

    const days = (birthdate - vernalEquinox) / 86400000;
    const years = days / cycle.calendar;

    let moduloSunSignDegree =
      (days * solarOrbitPerDay * zodiacDegreePerSolarDay) % cycle.sunSign;

    if (moduloSunSignDegree < 0) moduloSunSignDegree += 360;

    const sunSignZodiac = [
      { sign: 'Aries' },
      { sign: 'Taurus' },
      { sign: 'Gemini' },
      { sign: 'Cancer' },
      { sign: 'Leo' },
      { sign: 'Virgo' },
      { sign: 'Libra' },
      { sign: 'Scorpio' },
      { sign: 'Sagittarius' },
      { sign: 'Capricorn' },
      { sign: 'Aquarius' },
      { sign: 'Pisces' },
    ];

    let i = 0;
    let start = 0;
    let end = 30;

    while (i < 12) {
      if (moduloSunSignDegree >= start && moduloSunSignDegree < end)
        return setHeading(sunSignZodiac[i]['sign']);

      start += 30;
      end += 30;
      i++;
    }
  }

  function formattedDate() {
    const locale = 'en-GB';

    const option = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return Intl.DateTimeFormat(locale, option).format(date);
  }

  return (
    <>
      <section>
        <h2>{renderDate}</h2>
        <div className="aeries">♈</div>
      </section>
    </>
  );
}

export default ZodiacSign;
