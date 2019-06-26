import React, { useContext } from "react";
import { Context } from "./App";
import "./App.css";

//const Context = React.createContext();
export default function Navigation({ currentSheet}){
    const dispatch = useContext(Context);
    
    return(
        <div className="navigation">
        {/* <div className= {`navigation-element ${currentSheet==='HOME'?"nav-active":""}`} onClick = {() => dispatch({type: 'changeSheet', payload: 'HOME'})}>HOME</div>         */}
        <div className= {`navigation-element ${currentSheet==='WORLD'?"nav-active":""}`} onClick = {() => dispatch({type: 'changeSheet', payload: 'WORLD'})}>WORLD</div>        
        <div className={`navigation-element ${currentSheet==='TECH'?"nav-active":""}`} onClick = {() => dispatch({type: 'changeSheet', payload: 'TECH'})}>TECH</div>        
        <div className={`navigation-element ${currentSheet==='SPORTS'?"nav-active":""}`} onClick = {() => dispatch({type: 'changeSheet', payload: 'SPORTS'})}>SPORTS</div>        
        <div className={`navigation-element ${currentSheet==='SETTINGS'?"nav-active":""}`} onClick = {() => dispatch({type: 'changeSheet', payload: 'SETTINGS'})}>SETTINGS</div>        
        </div>
    )
}

