import React, { useEffect, useState, useRef } from 'react';
import domtoimage from 'dom-to-image';

export default function Meme({ memes, upper, lower }) {
  const [meme, setMeme] = useState(null);
  const [showDL, setShowDL] = useState(false);
  const memeNode = useRef();

  useEffect(() => {
    // console.log('memes', memes);
    showRandomMeme();

    return;
  }, [memes]);

  function showRandomMeme() {
    setShowDL(false);
    if (memes) setMeme(memes[Math.floor(Math.random() * 100)]);
  }

  function uploadMeme() {
    console.log('uploadMeme');
  }

  function exportMeme() {
    // console.log('memeNode', memeNode);

    if (!memeNode.current) return;

    domtoimage
      .toPng(memeNode.current)
      .then(function (dataUrl) {
        setShowDL(true);
        var img = new Image();
        img.src = dataUrl;
        document.getElementById('img-dl').appendChild(img);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  return (
    <>
      <div className="meme-buttons">
        <button onClick={showRandomMeme}>New</button>
        <button onClick={uploadMeme}>Upload</button>
        <button onClick={exportMeme}>Export</button>
      </div>
      <div ref={memeNode} className="meme-div">
        {memes && <img width={500} src={meme?.url} alt="bild"></img>}

        <div className="meme-text-upper">{upper}</div>
        <div className="meme-text-lower">{lower}</div>
      </div>
      {showDL && (
        <div className="meme-download">
          <h2 className="meme-download-header">Download Meme</h2>
          <div id="img-dl"></div>
        </div>
      )}
    </>
  );
}
