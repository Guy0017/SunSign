import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ZodiacSign({ date, setHeading }) {
  const [renderDate, setRenderDate] = useState('');
  const [zodiac, setZodiac] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!date) navigate('/');
    date && setRenderDate(formattedDate());
    date && findZodiacDegree();
  }, [date]);

  useEffect(() => {
    zodiac && setHeading(zodiac['sign']);
  }, [zodiac]);

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

    const sunSign = createSunSign();

    let i = 0;
    let start = 0;
    let end = 30;

    while (i < 12) {
      if (moduloSunSignDegree >= start && moduloSunSignDegree < end)
        return setZodiac(sunSign[i]);

      start += 30;
      end += 30;
      i++;
    }
  }

  function createSunSign() {
    const sunSign = [
      {
        sign: 'Aries',
        rulingPlanet: 'Mars',
        oppositeSign: 'Libra',
        myth: 'The winged ram, Chrysomallos, had a golden fleece. It was sacrificed to Zeus. Aries is that ram.',
      },
      {
        sign: 'Taurus',
        rulingPlanet: 'Venus',
        oppositeSign: 'Scorpio',
        myth: 'The sacred white bull, a transformation of Zeus, seduced Princess Europa and abducted her to the island of Crete. Princess Europa later bore the children of Zeus. The Taurus is that bull.',
      },
      {
        sign: 'Gemini',
        rulingPlanet: 'Mercury',
        oppositeSign: 'Sagittarius',
        myth: 'The transformation of dizygotic twins Castor and Pollux into shared immortality. Castor was mortal, and Pollux was immortal. Castor was fatally wounded when he called out to save Pollux from imminent danger. Pollux decided to share his immortality with Castor to save him.  Gemini is their transformation.',
      },
      {
        sign: 'Cancer',
        rulingPlanet: 'Moon',
        oppositeSign: 'Capricorn',
        myth: 'The Giant Crab, Carcinos, was the second of the twelve labours of Heracles. The crab was killed by Heracles. Hera transformed the crab into a constellation as a reward for its efforts. Cancer is that crab.',
      },
      {
        sign: 'Leo',
        rulingPlanet: 'Sun',
        oppositeSign: 'Aquarius',
        myth: 'The Nemean Lion, with golden fur impervious to mortal weapons and claws so sharp they could cut through any mortal armour, was the first of the twelve labours of Heracles. The lion was strangled to death by Heracles. Zeus transformed the lion into a constellation to commemorate the feat. Leo is that lion.',
      },
      {
        sign: 'Virgo',
        rulingPlanet: 'Mercury',
        oppositeSign: 'Pisces',
        myth: 'Virgo is Astraea, the goddess of justice, innocence, and purity. Astraea lived among humans until humanity became cruel and corrupt. Astraea was the last immortal to leave Earth and ascended. Virgo is that goddess.',
      },
      {
        sign: 'Libra',
        rulingPlanet: 'Venus',
        oppositeSign: 'Aries',
        myth: 'The scales of justice, held by Astraea, the goddess of justice, innocence, and purity, ascended with Astraea and remained by her side. Libra is that scale.',
      },
      {
        sign: 'Scorpio',
        rulingPlanet: 'Pluto',
        oppositeSign: 'Taurus',
        myth: 'The scorpion that stung Orion to death was immortalised by Zeus on opposite sides of the sky; when Scorpio rises, Orion sets. Scorpio is that scorpion.',
      },
      {
        sign: 'Sagittarius',
        rulingPlanet: 'Jupiter',
        oppositeSign: 'Gemini',
        myth: 'Chiron, the wisest and justest of all centaurs, was a master of the healing arts and a renowned teacher and mentor of heroes. Chiron was pierced by a poison arrow. Unable to heal himself, he willingly gave up his immortality. Sagittarius is that centaur.',
      },
      {
        sign: 'Capricorn',
        rulingPlanet: 'Saturn',
        oppositeSign: 'Cancer',
        myth: 'Pan, the god of the wilderness, was rewarded by Zeus for healing him. While trying to escape the monster Typhon, Pan only managed to transform his lower body into a fish while his upper body remained a goat. Zeus continued to fighting Typhon while injured. Pan healed injuries sustained by Zeus. Zeus won the fight and rewarded Pan with a constellation. Capricorn is Pan transformed.',
      },
      {
        sign: 'Aquarius',
        rulingPlanet: 'Uranus',
        oppositeSign: 'Leo',
        myth: 'Prince Ganymede was a handsome youth, abducted by Zeus to serve as cupbearer to the gods at Olympus. Zeus made a constellation for him. Aquarius os that prince.',
      },
      {
        sign: 'Pisces',
        rulingPlanet: 'Neptune',
        oppositeSign: 'Virgo',
        myth: 'Aphrodite and her son, Eros, transformed into fish to escape from the monster Typhon. The form of that fish was made into a constellation by Aphrodite. Pisces is Aphrodite and Eros transformed into fish.',
      },
    ];

    const element = {
      fire: ['Aries', 'Leo', 'Sagittarius'],
      earth: ['Taurus', 'Virgo', 'Capricorn'],
      air: ['Gemini', 'Libra', 'Aquarius'],
      water: ['Cancer', 'Scorpio', 'Pisces'],
    };

    const quality = {
      cardinal: ['Aries', 'Cancer', 'Libra', 'Capricorn'],
      fixed: ['Taurus', 'Leo', 'Scorpio', 'Aquarius'],
      mutable: ['Gemini', 'Virgo', 'Sagittarius', 'Pisces'],
    };

    sunSign.forEach((signObj, index) => {
      const sign = signObj.sign;
      const houseNumber = index + 1;

      if (element.fire.includes(sign)) signObj.element = 'Fire';
      if (element.earth.includes(sign)) signObj.element = 'Earth';
      if (element.air.includes(sign)) signObj.element = 'Air';
      if (element.water.includes(sign)) signObj.element = 'Water';

      if (quality.cardinal.includes(sign)) signObj.quality = 'Cardinal';
      if (quality.fixed.includes(sign)) signObj.quality = 'Fixed';
      if (quality.mutable.includes(sign)) signObj.quality = 'Mutable';

      signObj.polarity = houseNumber % 2 === 0 ? 'Positive' : 'Negative';

      signObj.house = houseNumber;
    });

    return sunSign;
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
        <h3>Myth: {zodiac.myth}</h3>
        <h3>Element: {zodiac.element}</h3>
        <h3>Quality: {zodiac.quality}</h3>
        <h3>House: {zodiac.house}</h3>
        <h3>Ruling Planet: {zodiac.rulingPlanet}</h3>
        <h3>Opposite Sign: {zodiac.oppositeSign}</h3>
        <h3>Polarity: {zodiac.polarity}</h3>
      </section>
    </>
  );
}

export default ZodiacSign;
