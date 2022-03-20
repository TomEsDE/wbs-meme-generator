import React, { useEffect, useState, useRef } from 'react';
import domtoimage from 'dom-to-image';
import FileUpload from './FileUpload';

export default function Meme({ memes, upper, lower }) {
  const [meme, setMeme] = useState(null);
  const [showDL, setShowDL] = useState(true);
  const [fontSizeUpper, setFontSizeUpper] = useState(30);
  const [fontSizeLower, setFontSizeLower] = useState(30);
  const [imageSize, setImageSize] = useState(500);
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

  function inDecreaseFontsizeUpper(num) {
    setFontSizeUpper((prev) => prev + num);
  }

  function inDecreaseFontsizeLower(num) {
    setFontSizeLower((prev) => prev + num);
  }

  function inDecreaseImagesize(num) {
    setImageSize((prev) => prev + num);
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

        const el = document.createElement('a');
        el.setAttribute('href', dataUrl);
        el.setAttribute('download', 'meme');
        document.getElementById('meme-div').appendChild(el);
        el.click();
        el.remove();
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
      <div className="adjust-div">
        <div className="meme-buttons">
          <button
            className="button-fs"
            onClick={() => inDecreaseImagesize(-50)}
          >
            -
          </button>
          <div>Image Size</div>
          <button className="button-fs" onClick={() => inDecreaseImagesize(50)}>
            +
          </button>
        </div>
        <div className="meme-buttons">
          <button
            className="button-fs"
            onClick={() => inDecreaseFontsizeUpper(-2)}
          >
            -
          </button>
          <div>Font Size</div>
          <button
            className="button-fs"
            onClick={() => inDecreaseFontsizeUpper(2)}
          >
            +
          </button>
        </div>
      </div>
      <div ref={memeNode} className="meme-div" id="meme-div">
        {memes && <img width={imageSize} src={meme?.url} alt="bild"></img>}

        <div
          style={{ fontSize: `${fontSizeUpper}pt` }}
          className="meme-text-upper"
        >
          {upper}
        </div>
        <div
          style={{ fontSize: `${fontSizeLower}pt` }}
          className="meme-text-lower"
        >
          {lower}
        </div>
      </div>
      <div className="meme-buttons">
        <button
          className="button-fs"
          onClick={() => inDecreaseFontsizeLower(-2)}
        >
          -
        </button>
        <div>Font Size</div>
        <button
          className="button-fs"
          onClick={() => inDecreaseFontsizeLower(2)}
        >
          +
        </button>
      </div>
      {true && (
        <div
          className="meme-download"
          style={{ display: `${showDL ? 'block' : 'none'}` }}
        >
          <h2 className="meme-download-header">Download Meme</h2>
          <div className="meme-download-header-descr">
            <em>left click on the picture and save picture...</em>
          </div>
          <div id="img-dl"></div>
        </div>
      )}
    </>
  );
}
