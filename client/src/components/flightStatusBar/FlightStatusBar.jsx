import {
    faCalendar,
    faPerson,
    faPlane,
} 
from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./flightStatusBar.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate} from "react-router-dom";




function FlightStatus(){
   
    const [startDate, setStartDate] = useState(new Date());
    const [flightsOrder, setFlightsOrder] = useState([])

    



    const navigate = useNavigate()

    

    const handleSearch =()=> {
        navigate("/flightList",{state:{flightsOrder,startDate}});
    }
    
    return(
    
        <div className="flightSearchContainer">
           
            <div className="flightSearchWrapper">
                <div className="flightSearch">
                
                <div className="flightSearchItem">
                    <FontAwesomeIcon icon={faPlane} className="searchIcon" />   
                    <input 
                        type="text" 
                        placeholder="Flight Number" 
                        className="searchInput"
                        onChange={e=>flightsOrder(e.target.value.toLowerCase())}/>
                </div>
                
                <div className="flightSearchItem">
                    <FontAwesomeIcon icon={faCalendar} className="searchIcon" />   
                    <DatePicker 
        
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy/MM/dd"
                        minDate={new Date()}
                        showYearDropdown
                        scrollableMonthYearDropdown
                        className="dateSytle"
                        />
                </div>
                
                
                <div className="flightSearchItem">
            
            <button className="flight-buttom" onClick={handleSearch}>
            Search
            </button>
        
        </div>
            </div>
   </div>
           
        </div>

    )

}

export default FlightStatus