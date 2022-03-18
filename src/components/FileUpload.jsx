import React, { useState, useEffect } from 'react';

export default function FileUpload({ accept, handleUpload }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    // console.log('selectedFile', selectedFile);
    console.log('before handleUpload');
    if (selectedFile) handleUpload(URL.createObjectURL(selectedFile));

    return;
  }, [selectedFile]);

  const changeHandler = (event) => {
    setSelectedFile((prev) => event.target.files[0]);
    setIsFilePicked(true);
  };

  return (
    <div className="file-upload">
      <button>
        <label htmlFor="upload-photo">Upload...</label>
      </button>
      <input
        type="file"
        name="file"
        accept={accept}
        onChange={changeHandler}
        id="upload-photo"
      />
      {/* <div>
        <button onClick={handleSubmission}>Submit</button>
      </div> */}
    </div>
  );
}
