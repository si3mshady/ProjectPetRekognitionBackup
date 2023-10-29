import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./App.css";
import AWS from "aws-sdk";




const App = () => {
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);
  const [labels, setLabels] = useState([]);
  const [image, setImage] = useState(null);
  // Define a state variable to keep track of the last uploaded image key

  async function sendImageToServer(data) {

      
    fetch('http://localhost:5000/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})

  }

  
  const handleUpload = () => {

    console.log( {base64Data: image});
    const data = {base64Data: image}
    
    fetch('http://localhost:5000/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
  if (data.success) {
    console.log( data.labels,
      setLabels(data.labels));
  } else {
    console.error('Upload failed: ' + data.message);
  }})
  .catch((error) => {
    console.error('An error occurred:', error);});


  }

  const capture = async () => {
    const screenshot = webcamRef.current.getScreenshot();
 

    if (screenshot) {
      setImage(screenshot)

      setImages([...images, screenshot]);


      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });

      
    } else {
      console.log("Invalid image format. Please capture a PNG or JPEG image.");
    }
  };

 

  const webcamRef = React.useRef(null);

  return (
    <div className="app-container">
        <h1>Photo Capture App</h1>
        <div className="container">
            <div className="webcam-container">
                <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    height={100}
                    width={100}
                    ref={webcamRef}
                />

                <button onClick={capture}>Capture</button>
                <button onClick={handleUpload}>Upload</button>
              
            </div>
        </div>
        <div className="image-container">
            {/* Display the last captured image */}
            {image && (
                <div className="image-card">
                    <img src={image} alt={`Last Captured`} />
                </div>
            )}
            {labels.length > 0 && (
          <div className="labels">
            <h2>Labels:</h2>
            <ul>
              {labels.map((label, index) => (
                <li key={index}>{label.Name}</li>
              ))}
            </ul>
          </div>
        )}
            {/* ... (rest of your code for displaying analysis results) */}
        </div>
        {location && (
          <div className="gps">
          <p>
                Latitude: {location.latitude}
            </p>

            <p>
             Longitude: {location.longitude}
            </p>
          
          </div>
           
            
        )}
       
    </div>
  );
};
export default App;
