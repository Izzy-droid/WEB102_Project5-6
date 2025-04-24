import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'

function App() {
    const [animals, setAnimals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const API_KEY = import.meta.env.VITE_APP_API_KEY;
    const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

        
          
     useEffect(() => {
        const loadAnimals = async () => {
             const token = await getAccessToken();
            const res = await fetch('https://api.petfinder.com/v2/animals', {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setAnimals(data.animals); // store in state
            console.log(data.animals);
            console.log("Animals:", animals);
           

        };
          
            loadAnimals();
        }, []);
      

        const getAccessToken = async () => {
            const res = await fetch('https://api.petfinder.com/v2/oauth2/token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: API_KEY,
                client_secret: SECRET_KEY,
              }),
            });
          
            const data = await res.json();
            return data.access_token;
            
          };
          
          const filteredAnimals = animals.filter((animal) =>
            animal.name.toLowerCase().includes(searchTerm.toLowerCase())
          );


        const majorityType = Object.entries(
            animals.reduce((acc, animal) => {
              acc[animal.type] = (acc[animal.type] || 0) + 1;
              return acc;
            }, {})
        ).reduce((max, current) => (current[1] > max[1] ? current : max), ["None", 0])[0];
        
        

        const dog_num = animals.slice(0,10).filter((animal) => animal.type === "Dog").length;
  
    return ( 
        <>
        <div className="cols-arrange">
          <div className="left-col">
            <div className="left-col-inner">
                <p id="title"><a href="#"></a>PetCubby</p>
                <p className="left-text">Home</p>  
                <p className="left-text">About</p>
                <p className="left-text">Search</p>
            </div>
         
          </div> 

          <div className="other-col">
            <div className="inner-box" id="top">
                <div className="inner-inner">
                <div className="first-d">Majority type: {majorityType}</div>
                <div className="second-d"># of adoptables:  10</div>
                <div className="third-d"># of dogs: {dog_num}</div>

                <div id="search">
                <form>
                    <input type="text" placeholder="Search for a name..." name="search"
                    onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} className="s-box"></input>
                    
                    <button type="submit">Search</button>
                </form>
                </div>
                </div>

            </div>

            <div className="inner-box" id="list">
                
                <div className="inner-list">
                    <table id="table">
                         
                        <thead className="table-head">
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Location(links)</th>
                            </tr>
                        </thead>
                       
                        <tbody>
                        {filteredAnimals.slice(0,10).map((animal, index) => (
                        <tr key={index}>
                        <td>{animal.name || "Unknown"}</td>
                        <td>{animal.type || "Unknown"}</td>
                        <td>{animal.status || "Unknown"}</td>
                        <td>
                        {animal.contact?.address?.city ? `${animal.contact.address.city}, ${animal.contact.address.state}`
                        : "Unknown Location"}
                        </td>
                        </tr>
                        ))}
        
                        </tbody>
                    </table>
                </div>
            </div>
           
          </div>



        </div>
        </>
    )
}

export default App