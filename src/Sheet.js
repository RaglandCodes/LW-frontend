import React from "react";
import "./App.css";

export default function Sheet({ currentSheet }){
    console.log(`${JSON.stringify(currentSheet)} 👈 currentSheet`);
        
    return(
        <div>
            <div className = "top-box">
                {currentSheet == undefined ? "Loading !!": currentSheet}
            </div>
            I am the {currentSheet} sheet
            </div>
    )
}