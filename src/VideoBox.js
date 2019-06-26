import React, { useState } from "react";
import "./App.css";
import playIcon from "./play_icon.png";

// const FontAwesome = require('react-fontawesome');

export default function VideoBox({
  title,
  videoID,
  getImages,
  displayTime,
  publisher,
  description,
  boxHeight
}) {
  function getNeatDescription(description) {
    if (description === null || !description) return "";
    description = description.split(/\n|\n\n/);
    let renderDescripion = description.map(p => <p> {p}</p>);
    return renderDescripion;
  }
  let [thumbnailState, toggleThumbnailState] = useState({
    showThumbnail: true
  });

  return (
    <div className= {`video-box ${boxHeight}`}>
      {getImages == "true" ? (
        !thumbnailState.showThumbnail ? (
          <div className="iframe-container">
            <iframe
              className="youtube-iframe"
              src={`https://www.youtube.com/embed/${videoID}`}
              title={videoID}
              allowFullScreen
              allow='autoplay'
            />
          </div>
        ) : (
          <div
            className="youtube-thumbnail-div"
            onClick={() => toggleThumbnailState({ showThumbnail: false })}
          >
            <img src={`https://img.youtube.com/vi/${videoID}/mqdefault.jpg`} className='thumbnail-pic' alt={`title`}/>
            <img src={playIcon} className="play-icon" alt="▶" />
            
          </div>
        )
      ) : null}
      <div className="row-two">
        <div className="word-source">{publisher}</div>
        <div className="word-time">{displayTime}</div>
      </div>

      <div className="row-three">
        <div
          className="word-title"
          onClick={() =>
            window.open(`https://www.youtube.com/watch?v=${videoID}`)
          }
        >
          ▶ {title}
        </div>
        <div className="word-description">
          {getNeatDescription(description)}
        </div>
      </div>
    </div>
  );
}
