import React, { useReducer, useContext, useEffect } from "react";
//import logo from './logo.svg';
import Navigation from "./Navigation.js";
import Sheet from "./Sheet.js";
import "./App.css";

function appReducer(state, action) {
  switch (action.type) {
    case 'changeSheet': return {currentSheet: action.payload}
    default: {
      return state;
    }
  }
}



export const Context = React.createContext();
export default function App() {
  const [state, dispatch] = useReducer(appReducer, []);
 
  useEffect(() => {
    dispatch({ type: 'changeSheet', payload: "HOME"});
    
  }, []);

  useEffect(() => {
    console.log(`${JSON.stringify(state)} 👈 latest state`);
  }, [state])

  return (
    <Context.Provider value={dispatch}>
      <div className="App">
        <Sheet currentSheet={state['currentSheet']}/>
        <Navigation />
      </div>
    </Context.Provider>
  );
}


