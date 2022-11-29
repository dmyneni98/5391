import React, { useState } from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import "./flightReserve.css"
import { useLocation,useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFetch"

function FlightReserveRW(){
    const navigate = useNavigate()
    const location = useLocation()
    const [flightsOrder, setFlightsOrder] = useState(location.state.flightsOrder)
    const [number, setNumber] = useState(location.state.number);

    const [isBundle, setIsBundle] = useState(location.state.isBundle)
    const [destination, setDestination] = useState(location.state.destination)
    const [dates, setDates] = useState(location.state.dates)
    const [options, setOptions] = useState(location.state.options)


    console.log("search reserve.jsx")
    console.log(isBundle)
    console.log(destination)
    console.log(dates)
    console.log(options)
    
    const { data, loading, error} = useFetch(`/flights?_id=${flightsOrder[0]}&_id=${flightsOrder[1]}`)

    let totalPrice = 0
    const getTotalPrice = (itemprice)=>{
        totalPrice += itemprice
    }

    const handleReserve = ()=>{
        isBundle? navigate("/hotels",{state:{destination,dates,options,flightsOrder,number}})
        :navigate("/flightCheckout",{state:{flightsOrder,number}});
    }
  
    return (
        <div>
        <Header/>

        <div className="orderInfo">
           
            <div className="flightReserve">
                <div className="flightReserveContainer">

                    <div className="flightDetailTitle">
                        <div>Your Flight : </div>
                    </div>
           
                    <div >
                    {loading ? (
                    "loading"
                    ) : (
                    <>
                        {data.map((item) => 
                        
                            <div className="flightDetailInfo">
                            <div className="flightInfoBox">
                                <div className="flightTimeBox">
                                    <ul>
                                        <li className="flightTime" key={"item._id"+"1"}>
                                            <div className="flightDataAndTime">
                                                Depart: 
                                            </div>
                                            <div className="airport">
                                            {item.departDate.split('T')[0]}  {item.departTime}
                                            </div>
                                            <div className="airport">
                                                {item.departAirport}
                                        
                                            </div>
    
                                        </li>
                                        <li className="flightTime" key={"item._id"+"2"}>
                                        <div className="flightDataAndTime">
                                                Arrive: 
                                            </div>
                                            <div className="airport">
                                            {item.arriveDate.split('T')[0]} {item.arriveTime}
                                            </div>
                                            <div className="airport">
                                                {item.arriveAirport}
                                            </div> 
                                        </li>
                                    </ul>
                                </div>
                                <div className="airline">
                                    <div className="airlineContainer">
                                        <div></div>
                                        <div className="flightText">
                                            {item.airlineCompany}
                                        </div>
                                        <div className="flightText">
                                            {item.flightNunber}
                                        </div>
                                        <div className="flightText">
                                            Flight Time {item.flightTime}
                                            {getTotalPrice(item.price)}
                                           
                                        </div>
                                    </div>
                                </div>
    
                            </div>
                        </div>

                        )}
                    </>
                    )}  
                </div>
                <hr/>

                <div className="flightPrice">
                    
                    <div className="flightPriceContainer">
                        <div >
                            <ul className="priceList" key={"item._id"+"3"}>
                                <li>Ticket</li>
                                <li>Taxes and airline fees</li>
                                <li>Passengers </li>
                                <li className="flightTotalPrise">
                                    Total
                                </li>
                            </ul>
                        </div>
                        <div className="priceNumber" key={"item._id"+"4"}>
                            <ul className="priceList">
                                <li>$ {totalPrice.toFixed(2)}</li>
                                <li>$ {(totalPrice*0.15).toFixed(2)} </li>
                                <li> x {number.passenger} </li>
                                <hr/>
                                <li className="flightTotalPrise">
                                    $ {(totalPrice*number.passenger*1.15).toFixed(2)}
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
                <div className="flightDetailButtonContainer">
                    <button className="flightDetailButton" onClick={handleReserve}>Select</button>
                </div>
            </div>
            
            </div>
            </div>
          
            
        <Footer/>
        </div>
        )
}

export default FlightReserveRW
