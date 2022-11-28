import "./searchFlightItem.css"
import React, { useState } from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLuggageCart, faPersonWalkingLuggage } from "@fortawesome/free-solid-svg-icons";
import { format } from 'date-fns'



const SearchItem = ( props) => {
    const navigate = useNavigate()

    const [roundWay, setRoundWay] = useState(props.roundWay);
    const [departCity, setDepartCity] = useState(props.arrivetCity);
    const [arrivetCity, setArriveCity] = useState(props.departCity);
    const [startDate, setStartDate] = useState(props.returnDate);
    const [returnDate, setReturntDate] = useState(props.returnDate);
    const [number, setNumber] = useState(props.number);
    const [flightsOrder, setFlightsOrder] = useState(props.flightsOrder)
    
    const handleClick=()=>{
        if (props.roundWay){
            props.setRoundWay(false);
            props.flightsOrder.push(props.item._id)
            navigate("/flightList",{state:{roundWay,departCity,arrivetCity,startDate,returnDate,number}});
        }
        else{
            props.flightsOrder.push(props.item._id)
            if(flightsOrder.length ==2 ){
                navigate("/flightReserve-roundway",{state:{flightsOrder,number}});
            }
            if(flightsOrder.length ==1 ){
                navigate("/flightReserve-onedway",{state:{flightsOrder,number}});
            }
   
        }
    }


  return (
    <div className="flightItemContainer">
        <span className="flightItenWrapper">
            <span className="flightInfoContainer">
                <span className="partItemContainer">
                    <div className="flightTime">
                        {props.item.departTime}
                    </div>
                    <div className="textInfo">
                        {props.item.departAirport}
                    </div>
                    <div className="textInfo">
                        {props.item.departDate.substring(0, 10)}
                    </div>

                </span>
                <span className="partItemContainer">
                    <div className="textInfor">
                        duration time
                    </div>
                    <hr />
                </span>
                <span className="partItemContainer">
                    <div className="flightTime">
                       {props.item.arriveTime}
                    </div>
                    <div className="textInfo">
                        {props.item.arriveAirport}
                    </div>
                    <div className="textInfo">
                        {props.item.arriveDate.substring(0, 10)}
                    </div>
                </span>
            </span>
            <span className="flightCompany">
                {props.item.airlineCompany}
            </span>


        </span>
        
        <span className="priceItemContainer">
            <div className="flightpriceWrapper">
                <FontAwesomeIcon icon={faLuggageCart} className="luggageIcon" />
                <div className="flightPrice">
                    Included: personal item, carry-on bag
                </div>
                <div className="flightTime">
                    {props.item.price}
                </div>
                <div className="flightPrice">
                    Total price for all travelers
                </div>

            </div>

    
                <button className="seeFlightButton" onClick={handleClick}>SELECT</button>

        </span>
    </div>
  )
};

export default SearchItem;