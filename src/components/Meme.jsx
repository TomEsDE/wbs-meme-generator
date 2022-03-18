import React, { useEffect, useState, useRef } from 'react';
import domtoimage from 'dom-to-image';
import FileUpload from './FileUpload';

export default function Meme({ memes, upper, lower }) {
  const [meme, setMeme] = useState(null);
  const [showDL, setShowDL] = useState(true);
  const memeNode = useRef();

  useEffect(() => {
    // console.log('memes', memes);
    showRandomMeme();

    return;
  }, [memes]);

  useEffect(() => {
    // console.log('memes', memes);
    setShowDL(false);

    return;
  }, [upper, lower]);

  function showRandomMeme() {
    setShowDL(false);
    if (memes) setMeme(memes[Math.floor(Math.random() * 100)]);
  }

  function handleUpload(file) {
    console.log('uploadMeme', file);
    setShowDL(false);
    if (file) setMeme((prev) => ({ url: file }));

    // setShowDL(true);
    // const img = new Image();
    // img.src = file;
    // img.width = 600;
    // console.log('img', img);
    // document.getElementById('img-dl').innerHTML = '';
    // document.getElementById('img-dl').appendChild(img);
  }

  function exportMeme() {
    // console.log('memeNode', memeNode);

    if (!memeNode.current) return;

    domtoimage
      .toPng(memeNode.current)
      .then(function (dataUrl) {
        setShowDL(true);
        const img = new Image();
        img.src = dataUrl;
        document.getElementById('img-dl').innerHTML = '';
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
        <FileUpload accept={'image/*'} handleUpload={handleUpload} />
        <button onClick={exportMeme}>Export</button>
      </div>
      <div ref={memeNode} className="meme-div">
        {memes && <img width={500} src={meme?.url} alt="bild"></img>}

        <div className="meme-text-upper">{upper}</div>
        <div className="meme-text-lower">{lower}</div>
      </div>
      {true && (
        <div
          className="meme-download"
          style={{ display: `${showDL ? 'block' : 'none'}` }}
        >
          <h2 className="meme-download-header">Download Meme</h2>
          <div id="img-dl"></div>
        </div>
      )}
    </>
  );
}
