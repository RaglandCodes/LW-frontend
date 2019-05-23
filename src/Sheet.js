import React, { useEffect, useState } from "react";
import "./App.css";
import SingleBox from "./SingleBox";
import MatchBox from "./MatchBox";
import Settings from "./Settings";
import VideoBox from "./VideoBox";

export default function Sheet({
  currentSheet,
  offPhraseList,
  getAMP,
  worldItems,
  getDescription,
  getImages
}) {
  if (currentSheet === "SETTINGS") {
    return (
      <div>
        <div className="top-box">
          {currentSheet === undefined ? "Loading !!" : currentSheet}
        </div>
        <Settings
          offPhraseList={offPhraseList}
          getAMP={getAMP}
          getDescription={getDescription}
          getImages={getImages}
        />
      </div>
    );
  } else {
    const [renderNewsArticles, setNewsArticles] = useState(
      <div>Loading please wait </div>
    );

    //setNewsArticles(<div>Loading please wait</div>);

    useEffect(() => {
      //renderWorldItems = worldItems.map(word => <div>{word["title"]}</div>);
      if (worldItems !== undefined) {
        let matchedItems = worldItems.filter(w => w["matchid"] !== "0");
        let singleItems = worldItems.filter(w => w["matchid"] == "0");
        let matchIDs = matchedItems.map(w => w["matchid"]);
        let uniqueMatchIDs = [...new Set(matchIDs)];

        let renderMatchedItems = [];

        for (const id of uniqueMatchIDs) {
          let thisItmes = matchedItems.filter(w => w["matchid"] === id);
          

          renderMatchedItems.push(<MatchBox matchList={thisItmes} key={id} />);
        }

        let renderSingleItems = singleItems.map(word => {
          if (word["type"] === "text") {
            
            
            return (
              <SingleBox
                title={word["title"]}
                image={word["image"]}
                link={word["url"] === undefined ? word["ampURL"] : word["url"]}
                description={word['description']}
                publisher={word['publisher']}
                minutesPassed={word['minutesPassed']}
                key={word["uid"]}
              />
            );
          } else {
            return (
              <VideoBox
                title={word["title"]}
                videoID={word["uid"]}
                key={word["uid"]}
              />
            );
          }
        });
        setNewsArticles(renderMatchedItems.concat(renderSingleItems));
      }
    }, [worldItems]);

    return (
      <div>
        <div className="top-box">
          {currentSheet === undefined ? "Loading !!" : currentSheet}
        </div>
        {renderNewsArticles}
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
