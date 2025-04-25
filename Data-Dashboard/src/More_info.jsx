import './App.css';
import { useState } from 'react';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

import {useParams} from 'react-router-dom';

function More_info({animals}) {
    const {id } = useParams();
    
   
    const animal = animals.find((animal) => animal.id === parseInt(id)); 
    if (!animal) {
        return <p>Animal not found</p>; // Handle the case where the animal is not found
    }
    return(

        <>
         
            <div className="more" style={{marginLeft:'3em', fontWeight:'bold', fontFamily:"'font-family:'Courier New', Courier, monospace'" }}>
    
                
                 <p>Name: {animal.name || "Unknown"}</p>
                <p>Type: {animal.type || "Unknown"}</p>
                <p>Gender: {animal.gender}</p>
                <p>Approx. life stage: {animal.age}</p>
                <p> Current status: {animal.status || "Unknown"}</p>
                <p>Location: {animal.contact?.address?.city || "Unknown"}</p>
                <p>Where to find them: {animal.url || "Unknown"}</p>

                
            </div>
       
        </>
    )

}
export default More_info;