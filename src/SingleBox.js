import React, { useEffect } from "react";
import "./App.css";

export default function SingleBox({
  title,
  image,
  link,
  description,
  publisher,
  
  boxHeight,
  displayTime
}) {

  // let pictureBox = React.createRef();
  // let wordBox = React.createRef();
  // let wordTitle = React.createRef();
  // useEffect(() => {
  //   if (boxHeight === "title-image") wordBox.current.scroll(0, 100);
  // }, []);

  // {image === undefined ? null : (
  //   <div
  //     ref={pictureBox}
  //     // className={`picture-box ${image === undefined ? "hidden-box" : null}`}
  //      className="picture-box"
  //   >
  //     <img src={image} className="word-image" alt="📸📸" />
  //   </div>
  // )}
  return (
    <div
      // ref={wordBox}
      className={`single-box ${boxHeight}`}
      onClick={() => window.open(link)}
    >
      {image === undefined ? null : (
          <img src={image} className="word-image" alt={title} />
      )}

      <div className="row-two">
        <div className="word-source">{publisher}</div>
        <div className="word-time">{displayTime}</div>
      </div>
      {/* <div className="row-three"> */}
        <div className="word-title" >
          {title}
        </div>
        <div className="word-description">{description}</div>
      {/* </div> */}
    </div>
  );
}
