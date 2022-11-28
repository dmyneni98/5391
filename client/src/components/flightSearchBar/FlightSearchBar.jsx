

import {
    faCalendar,
    faPerson,
    faPlane,
} 
from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./flightSearchBar.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate} from "react-router-dom";




function FlightSearchBar(){
    const [roundWay, setRoundWay] = useState(true);
    const [departCity, setDepartCity] = useState("");
    const [arrivetCity, setArriveCity] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [returnDate, setReturntDate] = useState(new Date());
    const [flightsOrder, setFlightsOrder] = useState([])

    const [openNumber, setOpenNumber] = useState(false);
    const [number, setNumber] = useState({
        passenger:1,
    });



    const navigate = useNavigate()

    const handleNumber =(name, operation)=>{
        setNumber((prev) => {
            return{
            ...prev,
             [name] : operation === "i" ? number[name] + 1: number[name] - 1,
             };
         });
    };

    const handleSearch =()=> {
        navigate("/flightList",{state:{flightsOrder,roundWay,departCity,arrivetCity,startDate,returnDate,number}});
    }
    
    return(
    
        <div className="flightSearchContainer">
            <div className="tripTypeSelect">
            <div className="tripTypeContainer">
                <div className="tripType">
                    <input className="option" type="radio" name="tripType" value = "roundTrip"  
                    onClick={() => setRoundWay(true)}/>
                    <div className="optionText">Round-trip</div>  
                </div>
                <div className="tripType">
                    <input className="option" type="radio" name="tripType" value = "oneTrip"
                    onClick={() => setRoundWay(false)} />
                    <div className="optionText">One-trip</div>  
                </div>
            </div>
            
            </div>
            <div className="flightSearchWrapper">
                <div className="flightSearch">
                
                <div className="flightSearchItem">
                    <FontAwesomeIcon icon={faPlane} className="searchIcon" />   
                    <input 
                        type="text" 
                        placeholder="Where from?" 
                        className="searchInput"
                        onChange={e=>setDepartCity(e.target.value.toLowerCase())}/>
                </div>
                <div className="flightSearchItem">
                    <FontAwesomeIcon icon={faPlane} className="searchIcon" />   
                    <input 
                        type="text" 
                        placeholder="Where to?" 
                        className="searchInput"
                        onChange={e=>setArriveCity(e.target.value.toLowerCase())}/>
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
                { roundWay&&<div className="flightSearchItem" >
                    <FontAwesomeIcon icon={faCalendar} className="searchIcon" />   
                    <DatePicker 
                        selected={returnDate} 
                        onChange={(date) =>  setReturntDate(date)}
                        dateFormat="yyyy/MM/dd"
                        minDate={startDate}
                        showYearDropdown
                        scrollableMonthYearDropdown
                        className="dateSytle"
                        />
                </div>}
                <div className="flightSearchItem">
                    <FontAwesomeIcon icon={faPerson} className="searchIcon" />
                    
                    <span
                    onClick={() => setOpenNumber(!openNumber)}
                    className="searchText"
                    >{`${number.passenger} Passenger `}</span>
                    {openNumber && (
                    <div className="options">
                        <div className="optionItem">
                        
                        <div className="optionCounter">
                            <button
                            disabled={number.passenger <= 1}
                            className="optionCounterButton"
                            onClick={() => handleNumber("passenger","d")}
                            >
                            -
                            </button>
                            <span className="optionCounterNumber">
                            {number.passenger}
                            </span>
                            <button
                            className="optionCounterButton"
                            onClick={() => handleNumber("passenger","i")}
                            >
                            +
                            </button>
                        </div>
                        </div>
                        
                    </div>
                    )}
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

export default FlightSearchBar