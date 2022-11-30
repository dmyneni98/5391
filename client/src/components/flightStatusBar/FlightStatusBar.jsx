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
   
    const [departDate, setDepartDate] = useState(new Date());
    const [flightNum, setFlightsNum] = useState("")
    
    const navigate = useNavigate()
    const handleSearchStatus =()=> {
        navigate("/flightStatus/Result",{state:{flightNum,departDate}});
    }
    
    return(
    
        <div className="flightSearchContainer">
        
            <div className="flightSearchWrapper">
                <div className="flightStatus">
                
                <div className="flightStatusSearchItem">
                    <FontAwesomeIcon icon={faPlane} className="searchIcon" />   
                    <input 
                        type="text" 
                        placeholder="Flight Number" 
                        className="searchInput"
                        onChange={e=>(setFlightsNum(e.target.value))}/>
                </div>
                
                <div className="flightStatusDate">

                    <FontAwesomeIcon icon={faCalendar} className="searchIcon" />   
                    <div className="status-date">Depart Date</div>
                    <DatePicker 
        
                        selected={departDate} 
                        onChange={(date) => setDepartDate(date)}
                        dateFormat="yyyy/MM/dd"
                        minDate={new Date()}
                        showYearDropdown
                        scrollableMonthYearDropdown
                        className="dateSytle"
                        />
                </div>
                
                
                <div className="flightStatusSearchItem">
            
            <button className="flightStatusSearch-buttom" onClick={handleSearchStatus}>
            Search
            </button>
        
            </div>
            </div>



             </div>
           
        </div>

    )

}

export default FlightStatus