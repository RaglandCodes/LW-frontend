import React, { useEffect } from "react";
import "./App.css";

export default function SingleBox({
  title,
  image,
  link,
  description,
  publisher,
  minutesPassed
}) {
  //console.log(`${description === undefined? title.concat(publisher):"" } 👈 descs sb undefined`);

  let displayTime = "";

  minutesPassed = parseInt(minutesPassed);
  if (!(minutesPassed > 0)) {
  } else if (minutesPassed < 60) {
    displayTime = `${minutesPassed} minutes ago`;
  } else if (minutesPassed < 1440) {
    displayTime = `${Math.floor(minutesPassed / 60)} ${
      minutesPassed < 121 ? "hour" : "hours"
    } ago`;
  } else {
    displayTime = `${Math.floor(minutesPassed / 1440)} ${
      minutesPassed < 2881 ? "day" : "days"
    } ago`;
  }

  console.log(`${displayTime} 👈 displaytome sb`);

  return (
    <div className="single-box" onClick={() => window.open(link)}>
      {image === undefined ? null : (
        <div
          className={`picture-box ${image === undefined ? "hidden-box" : null}`}
        >
          <img src={image} className="word-image" alt="📸📸" />
        </div>
      )}

      <div className="row-two">
        <div className="word-source">{publisher}</div>
        <div className="word-time">{displayTime}</div>
      </div>
      <div className="row-three">
        <div className="word-title">{title}</div>
        <div className="word-description">{description}</div>
      </div>
    </div>
  );
}
