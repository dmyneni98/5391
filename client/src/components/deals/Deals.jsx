import {

    faPlane,
} 
from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../flightSearchBar/flightSearchBar.css";
import "./Deals";

import React, { useState } from "react";
import axios from "axios";


export const DealsList = ()=>{
    const [searchinput, setSearchinput] = useState({
        destination: undefined,
        min: 1,
        max:2,
    });
    
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState(""); 
 
    const handleChange = (e) => {
        setSearchinput((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };
    
    const handleClick = async (e) => {
        e.preventDefault();
        //dispatch({ type: "LOGIN_START" });
        //console.log("http://localhost:8800/api/deals?min="+searchinput.min.toString()+"&max="+searchinput.max.toString()+"&destination="+searchinput.destination.toString())
        try {
          const res = await axios.get("http://localhost:8800/api/deals?min="+searchinput.min.toString()+"&max="+searchinput.max.toString()+"&destination="+searchinput.destination.toString());
          //dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
          //navigate("/");
          setData(res.data); 
          if(data.length==0)
          {
            setMsg("We don't have any flights matching your search on our site. Try changing some details.")
          }
         
        } catch (err) {
            console.log("Unable to authnticate")
          //dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };  

    return(
       <div>
        <div class="flightSearchContainer">
           <div class="flightSearch">
            <div class="flightSearchItem">
                    <FontAwesomeIcon icon={faPlane} className="searchIcon" />   
                   Destination: <input type="text" placeholder="Where to?" className="searchInput" id="destination" name="destination" onChange={handleChange}/>
            </div>
            
            <div class="flightSearchItem">
            Price: <input type="number" placeholder="Min Price" className="searchInput" id="min" name="min" onChange={handleChange}/>
            </div>
            <div class="flightSearchItem">
                <input type="number" placeholder="Max Price" className="searchInput" id="max" name="min" onChange={handleChange}/>
            </div>
            
            <div className="flightSearchItem">
                    <button className="flight-buttom" onClick={handleClick}>
                    Search
                    </button>
                </div>
                </div>
        
   
        </div> 
        <div class="flightSearchContainer">
        {
         (
          data.length ? <>  
              {data.map((item) => 
                  <span className="flightItemContainer">
                  <span className="partItemContainer">
                  <div className="textInfo">
                     Airlines :{item.name} </div>
                  <div className="textInfo">
                  departAirport : {item.origin}
                  </div>
                  <div className="textInfo">
                  arriveAirport : {item.destination}
                  </div>
                  <div className="textInfo">
                     Price : {item.price}
                  </div>
                  <div className="textInfo">
                     Departing Time : {item.starttime}
                  </div>
                  <div className="textInfo">
                     Arrival Time : {item.endtime}
                  </div>
                  </span>  
                  </span>
              )}
          </>: <div className="sortingText">{msg} </div>
          )

        }
        

        
        </div>
        </div>        
        
        

    );

}

export default DealsList