import React, { useReducer, useContext, useEffect } from "react";
import Navigation from "./Navigation.js";
import Sheet from "./Sheet.js";
import "./App.css";
//import { stat } from "fs";

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
    case "removeOffPhrase": {
      return {
        ...state,
        offPhraseList: state.offPhraseList.filter(p => p !== action["payload"])
      };
    }
    case "changeSheetItems": {
      if (action.payload["sheet"] === "WORLD") {
        return {
          ...state,
          worldItems: action.payload.items
        };
      } else {
        return state;
      }
    }
    case "toggleDescription": {
      if (action.payload === undefined)
        return {
          ...state,
          getDescription: state["getDescription"] === "true" ? "false" : "true"
        };
      else {
        return {
          ...state,
          getDescription: action.payload
        };
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
    case "toggleDarkTheme": {
      if (action.payload === undefined)
        return {
          ...state,
          darkTheme: state["darkTheme"] === "true" ? "false" : "true"
        };
      else {
        return {
          ...state,
          darkTheme: action.payload
        };
      }
    }
    case "toggleImages": {
      if (action.payload === undefined) {
        return {
          ...state,
          getImages: state["getImages"] === "true" ? "false" : "true"
        };
      } else {
        return {
          ...state,
          getImages: action.payload
        };
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
    darkTheme: "false",
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
        type: "toggleDescription",
        payload: localStorage.getItem("getDescription")
      });

      dispatch({
        type: "toggleAMP",
        payload: localStorage.getItem("getAMP")
      });

      dispatch({
        type: "toggleDarkTheme",
        payload: localStorage.getItem("darkTheme")
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
    if (state["currentSheet"] === "WORLD") {
      //let queryString = `http://localhost:2345/graphql?query=query
      let queryString = `https://lw-back.glitch.me/graphql?query=query
      {
        articles(offPhrases:${JSON.stringify(state["offPhraseList"])}) {
          title
          ${state["getAMP"] === "true" ? "ampURL" : "url"}
          ${state["getImages"] === "true" ? "image" : ""}
          publisher
          uid
          minutesPassed
          publisher
          ${state["getDescription"] === "true" ? "description" : ""}
          displayTime
          type
          matchid
        }
      }`;
      console.log(queryString);

      fetch(queryString)
        .then(res => res.json())
        .then(worldItems => {
          dispatch({
            type: "changeSheetItems",
            payload: {
              sheet: "WORLD",
              items: worldItems["data"]["articles"]
            }
          });
        });
    } // end of if (state["currentSheet"] === "WORLD") {
  }, [state["currentSheet"]]);

  useEffect(() => {
    console.log(`${JSON.stringify(state)} 👈 latest global state`);
    localStorage.setItem("currentSheet", state["currentSheet"]);
    localStorage.setItem("getAMP", state["getAMP"]);
    localStorage.setItem("darkTheme", state["darkTheme"]);
    localStorage.setItem("getImages", state["getImages"]);
    localStorage.setItem("getDescription", state["getDescription"]);
    localStorage.setItem("offPhraseList", state["offPhraseList"].join("&&&"));
  }, [state]);

  return (
    <Context.Provider value={dispatch}>
      <div className= {`App ${state['darkTheme'] == 'true'? 'dark-theme-app' : 'light-theme-app'}`}>
        <Sheet
          currentSheet={state["currentSheet"]}
          offPhraseList={state["offPhraseList"]}
          getAMP={state["getAMP"]}
          darkTheme={state["darkTheme"]}
          worldItems={state["worldItems"]}
          getDescription={state["getDescription"]}
          getImages={state["getImages"]}
          
        />
        <Navigation currentSheet={state["currentSheet"]} />
      </div>
    </Context.Provider>
  );
}
