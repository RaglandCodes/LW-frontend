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
  darkTheme,
  getDescription,
  getImages
}) {
  console.log(`${currentSheet} 👈 currentSheet`);
  

  if (currentSheet === "SETTINGS") {
    return (
      <div>
        {/* <div className="top-box">
          {currentSheet === undefined ? "Loading !!" : currentSheet}
        </div> */}
        <Settings
          offPhraseList={offPhraseList}
          getAMP={getAMP}
          getDescription={getDescription}
          getImages={getImages}
          darkTheme={darkTheme}
        />
      </div>
    );
  } else {
    const [render1, set1] = useState(<div class="lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>);
      const [render2, set2] = useState();


    useEffect(() => {
      console.log("in c mount use effect", currentSheet);
      let boxHeight = "full";
      if (getDescription == "false" && getImages == "false") {
        boxHeight = "title";
      } else if (getImages == "false") {
        boxHeight = "tite-desc";
      } else if (getDescription == "false" && getImages == "true") {
        boxHeight = "title-image";
      }

      if (currentSheet === "WORLD" || currentSheet === "TECH") {
        //let queryString = `https://lw-back.glitch.me/graphql?query=query
        let queryString = `http://localhost:2345/graphql?query=query
        
        {
          articles(offPhrases:${JSON.stringify(offPhraseList)}, domain:"${currentSheet.toLowerCase()}") {
            title
            ${getAMP === "true" ? "ampURL" : "url"}
            ${getImages === "true" ? "image" : ""}
            publisher
            uid
            ${getDescription === "true" ? "description" : ""}
            displayTime
            type
            matchid
          }
        }`;
        console.log(queryString);
        
        
        fetch(queryString)
          .then(res => res.json())
          .then(newsItems => newsItems["data"]["articles"])
          .then(newsArticles => {
            
            if (newsArticles !== undefined) {
              let matchedItems = newsArticles.filter(w => w["matchid"] !== "0");
              let uniqueMatchIDs = [
                ...new Set(matchedItems.map(w => w["matchid"]))
              ];
              let renderMatchedItems = [];
              for (const id of uniqueMatchIDs) {
                let thisItmes = matchedItems.filter(w => w["matchid"] === id);
                renderMatchedItems.push(
                  <MatchBox
                    matchList={thisItmes}
                    getDescription={getDescription}
                    getImages={getImages}
                    darkTheme={darkTheme}
                    boxHeight={boxHeight}
                    key={id}
                  />
                );
              }
              set1(renderMatchedItems);
              return(newsArticles.filter(w => w["matchid"] === "0"))
            }
          }).then(singleItems => {
            let renderSingleItems = singleItems.map(word => {
              if (word["type"] === "text") {
                return (
                  <SingleBox
                    title={word["title"]}
                    image={word["image"]}
                    link={
                      word["url"] === undefined ? word["ampURL"] : word["url"]
                    }
                    description={word["description"]}
                    publisher={word["publisher"]}
                    boxHeight={boxHeight}
                    displayTime={word["displayTime"]}
                    key={word["uid"]}
                  />
                );
              } else {
                return (
                  <VideoBox
                    title={word["title"]}
                    videoID={word["uid"]}
                    getImages={getImages}
                    displayTime={word["displayTime"]}
                    publisher={word["publisher"]}
                    description={word["description"]}
                    boxHeight={boxHeight}
                    key={word["uid"]}
                  />
                );
              }
            });
            set2(renderSingleItems);
          });
      } // end of if (state["currentSheet"] === "WORLD") {
    }, [currentSheet]);


    return (
      <div>
        {render1}
        {render2}
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
