import React from 'react';
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bundleSearchBar.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const BundleSearchBar = () => {
    
    const [isBundle, setIsBundle] = useState(true)
    const [roundWay, setRoundWay] = useState(true);
    const [destination, setDestination] = useState("");
    const [departCity, setDepartCity] = useState("");
    const [arrivetCity, setArriveCity] = useState("");
    const [flightsOrder, setFlightsOrder] = useState([])
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
        },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const [startDate, setStartDate] = useState(new Date());
    const [returnDate, setReturntDate] = useState(new Date());
    const [number, setNumber] = useState({
        passenger:1,
    });

    const handleNumber =(name, operation)=>{
        setNumber((prev) => {
            return{
            ...prev,
             [name] : operation === "i" ? number[name] + 1: number[name] - 1,
             };
         });
    };

    const handleOption = (name, operation) => {
        setOptions((prev) => {
        return {
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        };
        });
    };
    const navigate = useNavigate();
    const handleSearch = () => {
        console.log("departCity")
        console.log(departCity)
        console.log("arrivetCity")
        console.log(arrivetCity)
        console.log("passenger")
        console.log(number.passenger)
        console.log("startDate")
        console.log(startDate)
        console.log("returnDate")
        console.log("isBundle")
        console.log(isBundle)

        navigate("/flightList", { state: { destination, dates, options,isBundle,flightsOrder,roundWay,departCity,arrivetCity,startDate,returnDate,number } });
    };

    return (
        <div className="bundleSearchWrapper">
        <div className="bundleheaderSearch">
        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faPlane} className="searchIcon" />   
        <input
            type="text"
            placeholder="Where from?"
            className="headerSearchInput"
            onChange={(e) => setDepartCity(e.target.value)}
        />
        </div>
        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faPlane} className="searchIcon" />   
        <input
            type="text"
            placeholder="Where to?"
            className="headerSearchInput"
            onChange={(e) => (
                setDestination(e.target.value),
                setArriveCity(e.target.value)
                )}
        />
        </div>
        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
        <span
            onClick={() => (
                setOpenDate(!openDate),
                console.log(dates[0].startDate),
                console.log(dates[0].endDate),
                setStartDate(dates[0].startDate),
                setReturntDate(dates[0].endDate)
                )}
            className="headerSearchText"
        >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
            dates[0].endDate,
            "MM/dd/yyyy"
        )}`}</span>
        {openDate && (
            <DateRange
            editableDateInputs={true}
            onChange={(item) => (
                setDates([item.selection])


                )}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            className="date"
            minDate={new Date()}
            />
        )}
    
        </div>
        <div className="headerSearchItem">
        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
        <span
            onClick={() => setOpenOptions(!openOptions)}
            className="headerSearchText"
        >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
        {openOptions && (
            <div className="options">
            <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                <button
                    disabled={(options.adult <= 1)||(number.passenger <=1 )}
                    className="optionCounterButton"
                    onClick={() => (
                        handleOption("adult", "d"),
                        handleNumber("passenger","d")
                        )}
                >
                    -
                </button>
                <span className="optionCounterNumber">
                    {options.adult}
                </span>
                <button
                    className="optionCounterButton"
                    onClick={() => (
                        handleOption("adult", "i"),
                        handleNumber("passenger","i")
                        )}
                >
                    +
                </button>
                </div>
            </div>
            <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                <button
                    disabled={(options.children) <= 0||(number.passenger <=1 )}
                    className="optionCounterButton"
                    onClick={() => (
                        handleOption("children", "d"),
                        handleNumber("passenger","d")
                        )}
                >
                    -
                </button>
                <span className="optionCounterNumber">
                    {options.children}
                </span>
                <button
                    className="optionCounterButton"
                    onClick={() =>( 
                        handleOption("children", "i"),
                        handleNumber("passenger","i")
                        )}
                >
                    +
                </button>
                </div>
            </div>
            <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                <button
                    disabled={options.room <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("room", "d")}
                >
                    -
                </button>
                <span className="optionCounterNumber">
                    {options.room}
                </span>
                <button
                    className="optionCounterButton"
                    onClick={() => handleOption("room", "i")}
                >
                    +
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
        <div className="headerSearchItem">
        <button className="bundleheaderBtn" onClick={handleSearch}>
            Search
        </button>
        </div>
    </div>
    </div>
    )
    };
    export default BundleSearchBar;