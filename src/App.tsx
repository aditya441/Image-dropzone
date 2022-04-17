import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropZoneComponent from './Components/FileDropZone';
import { ProgressBar, Button, Alert } from 'react-bootstrap';
import AWS from 'aws-sdk'

const S3_BUCKET ='drop-my-image';
const REGION ='ap-south-1';

AWS.config.update({
    accessKeyId: 'AKIAV7M5EKKGOVBXMXOB',
    secretAccessKey: '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'
});

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
});


function App() {
  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState({ name: ''});
  const [uploadingFile, setUploadingFile] = useState(false);

  const uploadFile = () => {
    const params = {
        ACL: 'public-read',
        Body: selectedFile,
        Bucket: S3_BUCKET,
        Key: selectedFile.name
    };

    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setUploadingFile(true);
            let progressStatus = Math.round((evt.loaded / evt.total) * 100)
            setProgress(progressStatus)
        })
        .send((err) => {
            if (err) {
            } else {
              setUploadingFile(false);
              setSelectedFile({ name: '' })
              setProgress(0);
            }
        })
}

  return (
    <div className="d-flex flex-column align-items-center justify-content-center parent-container">
      <h1 className="my-4 upload-text-styles">
        Upload a file
      </h1>
      <div className="d-flex flex-column align-items-center justify-content-center dropzone-bg">
        <DropZoneComponent setSelectedFile={setSelectedFile} />
          <div className="upload-image-progress">
            <span>
              {selectedFile.name}
            </span>
            {uploadingFile && (
            <div style={{ width: '100%' }}>
              <ProgressBar now={progress} min={0} max={100} label={`${progress}%`} />
            </div>
            )}
            <Button variant="primary" onClick={uploadFile} disabled={selectedFile.name === ''} style={{ marginTop: '8px', marginBottom: '8px' }}>Upload to S3</Button>
          </div>
      </div>
    </div>
  );
}

export default App;
