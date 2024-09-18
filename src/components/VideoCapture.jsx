
import React, { useRef, useState, useEffect } from 'react';

const VideoCapture = () => {
  const videoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!isStreaming) {
      startVideoStream();
    }
  }, [isStreaming]);

  const startVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsStreaming(true);
    } catch (err) {
      console.error("Error accessing webcam: ", err);
    }
  };

  const captureFrame = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/jpeg');
    return imageData;
  };

  const sendFramesToBackend = async (frames) => {
    try {
      const response = await fetch('http://localhost:8080/api/video/frame', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frames }),
      });
      
      const data = await response.json();
      console.log('Prediction:', data.prediction);
    } catch (err) {
      console.error('Error sending frames:', err);
    }
  };

  const captureAndSendFrames = () => {
    const frames = [];
    for (let i = 0; i < 10; i++) { // Capture 10 frames as a batch
      frames.push(captureFrame());
    }
    sendFramesToBackend(frames);
  };

  return (
    <div>
      <h2>Real-Time Sign Language Detection</h2>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
      <button onClick={captureAndSendFrames}>Capture and Send Frames</button>
    </div>
  );
};

export default VideoCapture;
