import React, { useState, useContext, useEffect } from "react";
import { Context } from "./App";
import "./settings.css";

export default function Settings({
  offPhraseList,
  getAMP,
  getDescription,
  getImages,
  darkTheme
}) {
  //OP for Off Phrase
  let renderOPList = offPhraseList.map(OPitem => (
    <div key={OPitem} className="OP-button">
      <button
        className="removeOP"
        onClick={() => dispatch({ type: "removeOffPhrase", payload: OPitem })}
      >
        {" "}
        X{" "}
      </button>
      {OPitem}
    </div>
  ));

  const dispatch = useContext(Context);
  const [localState, setLocalState] = useState({
    // local state is used only to handle the on change on OP input. where OP = off phrase
    // other settings are directly sent to global state via dispatch
    newOffPhrase: "",
    offPhraseWarnings: ""
  });

  useEffect(() => {
    console.log(`${JSON.stringify(localState)} 👈 latest settings state`);
  }, [localState]);

  const handleOffPhraseAdd = () => {
    if (localState.newOffPhrase.length < 2) {
      setLocalState({
        ...localState,
        offPhraseWarnings: "Enter a longer phrase"
      });
    } else {
      dispatch({ type: "addOffPhrase", payload: localState.newOffPhrase });
      setLocalState({ ...localState, newOffPhrase: "" });
    }
  };

  const verifyOffPhraseInput = e => {
    let currentInput = e.target.value.toLowerCase();
    if (
      currentInput.split("")[currentInput.length - 1] === " " ||
      /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<0123456789>\?]/g.test(currentInput)
    ) {
      setLocalState({
        ...localState,
        offPhraseWarnings:
          "Special characters, spaces and numbers are not allowed"
      });
    } else {
      setLocalState({
        ...localState,
        newOffPhrase: currentInput,
        offPhraseWarnings: ""
      });
    }

    return currentInput;
  };

  return (
    <div style={{ width: "95%", maxWidth: "600px", margin: "auto" }}>
      <br />
      <div className="setting-box">
        <input
          placeholder="Add phrases to be turned off"
          type="text"
          onChange={e => verifyOffPhraseInput(e)}
          value={localState.newOffPhrase}
        />
        <button onClick={() => handleOffPhraseAdd()}>+</button>
        <br />
        <span className="off-phrase-warnings">
          {localState.offPhraseWarnings}
          {renderOPList}
        </span>
        <div className="setting-desc">
          Use this option if you aren't interested in a particular topic. News
          articles containing the words you enter in titles/description will not
          be shown
        </div>
      </div>
      <div className="setting-box">
        <div className="setting-label">Show Images </div>
        <input
          type="checkbox"
          className="setting-checkbox"
          checked={getImages === "true" ? true : false}
          onChange={() => dispatch({ type: "toggleImages" })}
        />
        <div className="setting-desc">
          Leaving this unchecked will not show images or video previews
        </div>
      </div>
      <div className="setting-box">
        <div className="setting-label">Show descriptions </div>
        <input
          type="checkbox"
          className="setting-checkbox"
          checked={getDescription === "true" ? true : false}
          onChange={() => dispatch({ type: "toggleDescription" })}
        />
      </div>
      <div className="setting-box">
        <div className="setting-label">Get AMP link </div>
        <input
        className="setting-checkbox"
          type="checkbox"
          checked={getAMP === "true" ? true : false}
          onChange={() => dispatch({ type: "toggleAMP" })}
        />
        <div className="setting-desc">
          Checking this will get you the AMP link of the story when available.
          AMP pages tend to load faster. Most browsers provide a way to revert
          to the full page from the AMP page.
        </div>
      </div>
      <div className="setting-box">
        <div className="setting-label">Dark Theme </div>
        <input
          type="checkbox"
          className="setting-checkbox"
          checked={darkTheme === "true" ? true : false}
          onChange={() => dispatch({ type: "toggleDarkTheme" })}
        />
        <div className="setting-desc" />
        <br/><br/><br/><br/>
      </div>
    
    </div>
  );
}
