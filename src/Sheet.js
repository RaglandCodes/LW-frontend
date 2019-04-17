import React from "react";
import "./App.css";
import Settings from "./Settings";

export default function Sheet({
  currentSheet,
  offPhraseList,
  getAMP,
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
    return (
      <div>
        <div className="top-box">
          {currentSheet === undefined ? "Loading !!" : currentSheet}
        </div>
        I am the {currentSheet} sheet
      </div>
    );
  }
}
