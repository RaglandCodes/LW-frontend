import React from "react";
import "./App.css";

export default function Sheet({title, image, link})
{
    console.log(image);
    
return(
    <div className="single-box"> 
    {image === undefined?null:<img src={image} className="box-image" alt="📸📸"/>}
        
        {title}
    </div>
)
}