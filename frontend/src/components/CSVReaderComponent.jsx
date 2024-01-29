// CSVReaderComponent.js
import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import axios from 'axios';

const CSVReaderComponent = () => {
  const handleFile = (data, fileInfo) => {
    // Send data to Node.js server
    console.log(data)
    axios.post('http://localhost:5000/upload-csv', { data })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <CSVReader onFileLoaded={handleFile} cssClass="csv-reader-input" label="Import CSV"  />
  );
};

export default CSVReaderComponent;
