import React, { useReducer, useEffect } from "react";
import Navigation from "./Navigation.js";
import Sheet from "./Sheet.js";
import "./App.css";

function appReducer(state, action) {
  switch (action.type) {
    case "fromLocalStorage": {
      return { ...state, ...action.payload };
    }
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
    getDescription: "false"
  });

  useEffect(() => {
    if (localStorage.getItem("globalState") === null) {
      dispatch({ type: "changeSheet", payload: "WORLD" });
    } else {
      dispatch({
        type:"fromLocalStorage",
        payload:JSON.parse(localStorage.getItem("globalState"))
      })
     
    }
  }, []);

  useEffect(() => {
    console.log(`${JSON.stringify(state)} 👈 latest global state`);
    localStorage.setItem("globalState", JSON.stringify(state))
  }, [state]);
  console.log(`${state['currentSheet']} 👈 state cs`);
  
  return (
    <Context.Provider value={dispatch} style={{height:'100%'}}>
      <div className= {`App ${state['darkTheme'] == 'true'? 'dark-theme-app' : 'light-theme-app'}`}>
      <div className= "top-box" >
          {state['currentSheet']}
        </div>
        {state['currentSheet'] == " "? <div className="lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>: <Sheet
          currentSheet={state["currentSheet"]}
          offPhraseList={state["offPhraseList"]}
          getAMP={state["getAMP"]}
          darkTheme={state["darkTheme"]}
          getDescription={state["getDescription"]}
          getImages={state["getImages"]}
        />}
        
        <Navigation currentSheet={state["currentSheet"]} />
      </div>
    </Context.Provider>
  );
}
