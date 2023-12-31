import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./App.css";
import AWS from "aws-sdk";




const App = () => {
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);
  const [labels, setLabels] = useState([]);
  const [image, setImage] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // Define a state variable to keep track of the last uploaded image key

  const apiBaseUrl = process.env.REACT_APP_API_URL  || 'http://localhost:5000/upload';

// Now, you can use the apiBaseUrl variable in your component


  const captureImage = async () => {
    setCapturing(true);
    // Capture logic here
    setCapturing(false); // Reset capturing state when done
  };

  const handleUploadImage = async () => {
    setUploading(true);
    // Upload logic here
    setUploading(false); // Reset uploading state when done
  };

  async function sendImageToServer(data) {

      
    fetch(apiBaseUrl, {
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

  
  const captureNew = async () => {
    setIsCapturing(true); // Set isCapturing to true while capturing

    const screenshot = webcamRef.current.getScreenshot();

    if (screenshot) {
      setImage(screenshot);

      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Invalid image format. Please capture a PNG or JPEG image.");
    }

    setIsCapturing(false); // Reset isCapturing when done capturing
  };



  const handleUploadNew = () => {
    setIsUploading(true); // Set isUploading to true while uploading

     console.log( {base64Data: image});
    const data = {base64Data: image, coordinates: JSON.stringify(location)}
    
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

    setIsUploading(false); // Reset isUploading when done uploading
  };

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
    <h3>Image </h3>
    <h3>Classification </h3>
    <div className="container">
      <div className="webcam-container">
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          height={200}
          width={200}
          ref={webcamRef}
        />

        <button onClick={captureNew} disabled={isCapturing || isUploading}>
          Capture
        </button>
        <button onClick={handleUploadNew} disabled={isCapturing || isUploading}>
          Upload
        </button>
      </div>
    </div>

        <div className="image-container">
            {/* Display the last captured image */}
            {/* {isCapturing ? (
          // Show a spinner while capturing
          <div className="spinner"></div>
        ) : (
          // Display the last captured image when not capturing
          image && (
            <div className="image-card">
              <img src={image} alt={`Last Captured`} />
            </div>
          )
        )} */}

        {isUploading && (
          // Show a spinner while uploading
          <div className="spinner"></div>
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
