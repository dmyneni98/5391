import React, { useState,useEffect} from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import {useLocation } from "react-router-dom"
import "./statusList.css"
import useFetch from "../../hooks/useFetch"

function FlightStatusResult(){

    const location = useLocation()
    const [departDate, setDepartDate] = useState(location.state.departDate);
    const [flightNum, setFlightsNum] = useState(location.state.flightNum)
    const [searchWithFN, setSearchWithFN]=useState(flightNum!="")
    console.log("in status list")
    console.log(departDate)
    console.log(flightNum)
    console.log(searchWithFN)

    const offset = location.state.departDate.getTimezoneOffset();
    const leaveDate = new Date(location.state.departDate.getTime() - (offset*60*1000));
    const departDateFormated= leaveDate.toISOString().split('T')[0]

    const { data, loading, error} = useFetch(`/flights?departDate=${departDateFormated}`)


    console.log("data")
    console.log(data)
    console.log(data.length==0)
    
    function checkFlight(flight) {

        return flight.flightNunber == flightNum
        }

    return(
        <div >
            <Header/>
            <div>
            <div className="statusContainer">
                <div className="statusWrapper">
                    <div className="statusTitle">
                        Flights Status{searchWithFN}
                    </div>
                    <div className="flightIndividualTitel">
                         
                            <div className="flightIndividualItemInfo">
                            Flight 
                            </div>
                            <div className="flightIndividualItemInfo">
                            Airline 
                            </div>
                            <div className="flightIndividualItemInfo">
                            Departs
                            </div>
                            <div className="flightIndividualItemInfo">
                            Route
                            </div>
                            <div className="flightIndividualItemInfo">
                            Status
                            </div>
                        </div>
                

                    {!searchWithFN&&data.map((item) => 
                        <div className="flightIndividualItem">
                            <div className="flightIndividualItemInfo">
                            {item.flightNunber}
                            </div>
                            <div className="flightIndividualItemInfo">
                            {item.airlineCompany}
                            </div>
                            <div className="flightIndividualItemInfo">
                            {item.departTime}
                            </div>
                            <div className="flightIndividualItemInfo">
                            {item.departCity}
                            </div>
                            <div className="flightIndividualItemInfo">
                            <hr className="flightStatusArrow" />
                            </div>
                            <div className="flightIndividualItemInfo">
                            {item.arriveCity}
                            </div>
                            <div className="flightIndividualItemInfo">
                            {item.flightStatus}
                            </div>
                        </div>)}
                        {searchWithFN && data.filter(checkFlight).map((item) => 
                        <div className="flightIndividualItem">
                         
                            <div className="flightIndividualItemInfo">
                            {item.flightNunber} 
                            </div>
                            <div className="flightIndividualItemInfo">
                            {item.airlineCompany}
                            </div>
                            <div className="flightIndividualItemInfo">
                            {item.departTime}
                            </div>
                            <div className="flightIndividualItemInfo">
                            {item.departCity}
                            </div>
                            <div className="flightIndividualItemInfo">
                            <hr className="flightStatusArrow" /> 
                            </div>
                            <div className="flightIndividualItemInfo">
                            {item.arriveCity}
                            </div>
                            <div className="flightIndividualItemInfo">
                            {item.flightStatus}
                            </div>
                        </div>)}
                        {(searchWithFN && data.filter(checkFlight).length==0)&&
                        <div className="statusError">
                        We don't have any flights matching your search on our site. Try changing some details. 
                        </div>}
                        {(!data.length)&&
                        <div className="statusError">
                        We don't have any flights matching your search on our site. Try changing some details. 
                        </div>}
                           
                           
                </div>
            </div>

            </div>
            

   
            <Footer/>
        </div>
        
    )
}

export default FlightStatusResult