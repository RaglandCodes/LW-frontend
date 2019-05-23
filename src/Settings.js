import React, { useState, useContext, useEffect } from "react";
import { Context } from "./App";
import "./App.css";

export default function Settings({
  offPhraseList,
  getAMP,
  getDescription,
  getImages
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
    <div>
      This is the settings page
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
      </div>
      <div className="setting-box">
        Show Images{" "}
        <input
          type="checkbox"
          checked={getImages === "true" ? true : false}
          onChange={() => dispatch({ type: "toggleImages" })}
        />
      </div>
      <div className="setting-box">
        Show descriptions{" "}
        <input
          type="checkbox"
          checked={getDescription === "true" ? true : false}
          onChange={() => dispatch({ type: "toggleDescription" })}
        />
      </div>
      <div className="setting-box">
        Get AMP link{" "}
        <input
          type="checkbox"
          checked={getAMP === "true" ? true : false}
          onChange={() => dispatch({ type: "toggleAMP" })}
        />
      </div>
    </div>
  );
}
