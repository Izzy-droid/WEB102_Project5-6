import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';




function layout({children}) {
    
    return(

        <>
         <div className="cols-arrange">
            <div className="left-col">
            <div className="left-col-inner">
            <p id="title"><a href="#"></a>PetCubby</p>
             <p className="left-text"><Link to="/">Home</Link></p>
            <p className="left-text">About</p>
            <p className="left-text">Search</p>
            </div>
        </div>
        <div className="other-col">
        {children} 
      </div>
    </div>
                
     
        
       
        </>
    )

}
export default layout;