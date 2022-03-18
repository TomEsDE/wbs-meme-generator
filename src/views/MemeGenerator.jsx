import React, { useEffect, useState } from 'react';
import Generate from '../components/Generate';
import Meme from '../components/Meme';
import axios from 'axios';

export default function MemeGenerator() {
  const [memes, setMemes] = useState(null);
  const [upper, setUpper] = useState('');
  const [lower, setLower] = useState('');

  async function fetchMemes() {
    try {
      const resp = await axios.get(
        `https://api.imgflip.com/get_memes`
        // `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_APIKEY_GEOIPIFY}&ipAddress=31.16.248.249`
      );
      // console.log('resp', resp);

      if (resp.status === 200) {
        const data = await resp.data;
        if (data.data.memes) {
          setMemes(data.data.memes);
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  useEffect(() => {
    fetchMemes();
    return;
  }, []);

  return (
    <div>
      <Generate setUpperText={setUpper} setLowerText={setLower} />
      <Meme memes={memes} upper={upper} lower={lower} />
    </div>
  );
}
