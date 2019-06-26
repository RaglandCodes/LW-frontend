import React from "react";
import SingleBox from "./SingleBox";
import VideoBox from "./VideoBox";
import "./App.css";

export default function MatchBox({ matchList, getDescription, getImages, darkTheme, boxHeight }) {
  
  let renderItems = matchList.map(word => {
    if (word["type"] === "text") {
      return (
        <SingleBox
          title={word["title"]}
          image={word["image"]}
          link={word["url"] === undefined ? word["ampURL"] : word["url"]}
          description={word["description"]}
          publisher={word["publisher"]}
          minutesPassed={word["minutesPassed"]}
          boxHeight={boxHeight}
          key={word["uid"]}
        />
      );
    } else {
      return (
        <VideoBox
          title={word["title"]}
          videoID={word["uid"]}
          getImages={getImages}
          displayTime = {word['displayTime']}
          publisher = {word['publisher']}
          description={word["description"]}
          boxHeight={boxHeight}
          key={word["uid"]}
        />
      );
    }
  });

  return <div className="match-box">{renderItems}</div>;
}
