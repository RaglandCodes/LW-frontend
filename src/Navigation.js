import React, { useContext } from "react";
import { Context } from "./App";
import "./App.css";

//const Context = React.createContext();
export default function Navigation(){
    const dispatch = useContext(Context);
    
    
    return(
        <div className="navigation">
        <div className="navigation-element" onClick = {() => dispatch({type: 'changeSheet', payload: 'HOME'})}>HOME</div>        
        <div className="navigation-element" onClick = {() => dispatch({type: 'changeSheet', payload: 'WORLD'})}>WORLD</div>        
        <div className="navigation-element" onClick = {() => dispatch({type: 'changeSheet', payload: 'TECH'})}>TECH</div>        
        <div className="navigation-element" onClick = {() => dispatch({type: 'changeSheet', payload: 'SPORTS'})}>SPORTS</div>        
        <div className="navigation-element" onClick = {() => dispatch({type: 'changeSheet', payload: 'SETTINGS'})}>SETTINGS</div>        
        </div>
    )
}

