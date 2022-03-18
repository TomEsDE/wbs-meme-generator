import React, { useEffect, useState } from 'react';

export default function Meme({ memes, upper, lower }) {
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    // console.log('memes', memes);
    showRandomMeme();

    return;
  }, [memes]);

  function showRandomMeme() {
    if (memes) setMeme(memes[Math.floor(Math.random() * 100)]);
  }

  return (
    <>
      <div style={{ paddingBottom: '1rem' }}>
        <button onClick={showRandomMeme}>New</button>
      </div>
      <div className="meme-div">
        {memes && <img width={600} src={meme?.url} alt="bild"></img>}

        <div className="meme-text-upper">{upper}</div>
        <div className="meme-text-lower">{lower}</div>
      </div>
    </>
  );
}
