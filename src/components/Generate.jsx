import React, { useEffect, useState } from 'react';

export default function Generate({ setUpperText, setLowerText }) {
  const [upper, setUpper] = useState('');
  const [lower, setLower] = useState('');

  useEffect(() => {
    setUpperText(upper);
    setLowerText(lower);
    return;
  }, [upper, lower]);

  return (
    <div className="generate-div">
      <h1>Meme Generator</h1>
      <div className="generate-input-div">
        <div className="generate-label-upper">Upper Text </div>
        <input
          type="text"
          name="upper"
          value={upper}
          onChange={({ target }) => setUpper(target.value)}
        />
      </div>
      <div className="generate-input-div">
        <div className="generate-label-lower">Lower Text </div>
        <input
          type="text"
          name="lower"
          value={lower}
          onChange={({ target }) => setLower(target.value)}
        />
      </div>
    </div>
  );
}
