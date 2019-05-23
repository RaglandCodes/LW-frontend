import React from "react";
import "./App.css";

export default function VideoBox({ title, videoID }) {
  
  
  return (
    <div className="video-box">
      <div className="iframe-container">
        <iframe
          className="youtube-iframe"
          src={`https://www.youtube.com/embed/${videoID}`}
          title={videoID}
          allowFullScreen
        />
      </div>
      <div className="word-title"> 📽 {title} 📽📹</div>
    </div>
  );
}
