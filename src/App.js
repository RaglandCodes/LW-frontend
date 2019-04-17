import React, { useReducer, useContext, useEffect } from "react";
import Navigation from "./Navigation.js";
import Sheet from "./Sheet.js";
import "./App.css";
import { stat } from "fs";

function appReducer(state, action) {
  switch (action.type) {
    case "changeSheet": {
      return { ...state, currentSheet: action.payload };
    }
    case "addOffPhrase": {
      if (state["offPhraseList"].indexOf(action.payload) === -1) {
        return {
          ...state,
          offPhraseList: [...state.offPhraseList, action.payload]
        };
      } else {
        return state;
      }
    }
    case "toggleAMP": {
      if (action.payload === undefined)
        return {
          ...state,
          getAMP: state["getAMP"] === "true" ? "false" : "true"
        };
      else {
        return {
          ...state,
          getAMP: action.payload
        };
      }
    }
    case "toggleImages": {
      if (action.payload === undefined) {
        return {
          ...state,
          getImages: state["getImages"] === "true" ? "false" : "true"
        };
      }
      else{
        return{
          ...state, 
          getImages: action.payload
        }
      }
    }

    default: {
      return state;
    }
  }
}

export const Context = React.createContext();
export default function App() {
  const [state, dispatch] = useReducer(appReducer, {
    currentSheet: " ",
    offPhraseList: [],
    getAMP: "true",
    getImages: "false",
    getDescription: "true"
  });

  useEffect(() => {
    if (localStorage.getItem("currentSheet") === null) {
      dispatch({ type: "changeSheet", payload: "WORLD" });
    } else {
      dispatch({
        type: "changeSheet",
        payload: localStorage.getItem("currentSheet")
      });

      dispatch({
        type: "toggleImages",
        payload: localStorage.getItem("getImages")
      });

      dispatch({
        type: "toggleAMP",
        payload: localStorage.getItem("getAMP")
      });

      if (localStorage.getItem("offPhraseList").length > 0)
        localStorage
          .getItem("offPhraseList")
          .split("&&&")
          .forEach(OP => {
            dispatch({ type: "addOffPhrase", payload: OP });
          });
    }
  }, []);

  useEffect(() => {
    console.log(`${JSON.stringify(state)} 👈 latest global state`);
    localStorage.setItem("currentSheet", state["currentSheet"]);
    localStorage.setItem("getAMP", state["getAMP"]);
    localStorage.setItem("getImages", state["getImages"]);
    localStorage.setItem("getDescription", state["getDescription"]);
    localStorage.setItem("offPhraseList", state["offPhraseList"].join("&&&"));
  }, [state]);

  return (
    <Context.Provider value={dispatch}>
      <div className="App">
        <Sheet
          currentSheet={state["currentSheet"]}
          offPhraseList={state["offPhraseList"]}
          getAMP={state["getAMP"]}
          getDescription={state["getDescription"]}
          getImages={state["getImages"]}
        />
        <Navigation />
      </div>
    </Context.Provider>
  );
}
