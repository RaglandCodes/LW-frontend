import React, { useEffect, useState } from "react";
import "./App.css";
import SingleBox from "./SingleBox";
import Settings from "./Settings";

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
        //console.log(JSON.stringify(worldItems));

        let renderWorldItems = worldItems.map(word => {
          return (
            <SingleBox
              title={word["title"]}
              image={word["image"]}
              link={word["url"] === undefined ? word["ampURL"] : word["url"]}
              key={word["uid"]}
            />
          );
        });
        setNewsArticles(renderWorldItems);
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
