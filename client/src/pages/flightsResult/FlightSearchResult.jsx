import React, { useState } from "react";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import FlightSearchBar from "../../components/flightSearchBar/FlightSearchBar"
import "./FlightSearchResult.css"
import useFetch from "../../hooks/useFetch"
import {useNavigate, useLocation } from "react-router-dom"
import SearchItem from "../../components/searchFlightItem/SearchFlightItem"



function FlightSearchResult(){
    const navigate = useNavigate()
    const location = useLocation()
    const [roundWay, setRoundWay] = useState(location.state.roundWay);
    const [departCity, setDepartCity] = useState(location.state.departCity);
    const [arrivetCity, setArriveCity] = useState(location.state.arrivetCity);
    const [startDate, setStartDate] = useState(location.state.startDate);
    const [returnDate, setReturntDate] = useState(location.state.returnDate);
    const [number, setNumber] = useState(location.state.number);
    const [flightsOrder, setFlightsOrder] = useState(location.state.flightsOrder)
    const [minPrice, setMinPrice] = useState(undefined);
    const [selected, setSelected] = useState('');
    const [priceSorted,setPriceSorted] = useState(false);
    const [airlineSorted,setAirlineSorted] = useState(false);
//state for hotel
    const [isBundle, setIsBundle] = useState(location.state.isBundle)
    const [destination, setDestination] = useState(location.state.destination)
    const [dates, setDates] = useState(location.state.dates)
    const [options, setOptions] = useState(location.state.options)

    const offset = location.state.startDate.getTimezoneOffset();
    const departDate = new Date(location.state.startDate.getTime() - (offset*60*1000));
    const departDateFormated= departDate.toISOString().split('T')[0]
    const { data, loading, error} = useFetch(`/flights?minPrice=${minPrice||0}&&departCity=${location.state.departCity}&&arriveCity=${location.state.arrivetCity}&&departDate=${departDateFormated}`)



    console.log("search list.jsx")
    console.log(data)
    console.log(destination)
    console.log(dates)
    console.log(options)

    const handlePriceSorting = event =>{

        if(event.target.value =="price"){
            setMinPrice(1);
            setAirlineSorted(false)
            setPriceSorted(true);
            console.log("change sorted value -price )");
            console.log(priceSorted);
            console.log(airlineSorted);
        }
        if(event.target.value =="airline"){

            setPriceSorted(false);
            setAirlineSorted(true)
            console.log("change sorted value -aireline)");
            console.log(priceSorted);
            console.log(airlineSorted);
        }   
    }
    

    return(
        <div>
            <Header/>
            <div >
            <div className="flightListContainer">
                <div className="flightListWrapper">
                    
                    <div className="sorting-flight">
                        <div className="sortingContainer">
                            <select className="sortButton" id="option-select" onChange ={handlePriceSorting}>
                                <option value=""  >--Sort by--</option>
                                <option value="price" >Sort by : Price</option>
                                <option value="airline">Sort by : Airline Name</option>
                            </select>
                            
                        </div>
                    </div>
                    
                    
                    <div className="flightListResult">
              
                        
                        {(!priceSorted)&&(!airlineSorted)&&<div className="flightListResultConatainer">
                            {loading ? (
                            "loading"
                            ) : (
                            data.length ? <>  
                                {data.map((item) => 
                                    <SearchItem 
                                    item={item} 
                                    roundWay={roundWay} setRoundWay={setRoundWay} 
                                    departCity={departCity} setDepartCity={setDepartCity}
                                    arrivetCity={arrivetCity} setArriveCity={setArriveCity}
                                    returnDate={returnDate} setStartDate ={setStartDate}
                                    flightsOrder={flightsOrder} setFlightsOrder={setFlightsOrder}
                                    number={number} setNumber={setNumber}
                                    isBundle={isBundle} setIsBundle={setIsBundle}
                                    destination={destination} setDestination={setDestination}
                                    dates= {dates} setDates={setDates}
                                    options={options} setOptions={setOptions}
                                    key={item._id} />
                                )}
                            </>: <div className="sortingText">We don't have any flights matching your search on our site. Try changing some details.</div>
                            )}  
                        </div>}
                        {priceSorted&&(!airlineSorted)&&<div className="flightListResultConatainer">
                            {loading ? (
                            "loading"
                            ) : (
                            data.length ? <>
                                {data.sort((a,b)=>(a.price-b.price)).map((item) => 
                                    <SearchItem item={item} 
                                    roundWay={roundWay} setRoundWay={setRoundWay} 
                                    departCity={departCity} setDepartCity={setDepartCity}
                                    arrivetCity={arrivetCity} setArriveCity={setArriveCity}
                                    returnDate={returnDate} setStartDate ={setStartDate}
                                    flightsOrder={flightsOrder} setFlightsOrder={setFlightsOrder}
                                    number={number} setNumber={setNumber}
                                    isBundle={isBundle} setIsBundle={setIsBundle}
                                    destination={destination} setDestination={setDestination}
                                    dates= {dates} setDates={setDates}
                                    options={options} setOptions={setOptions}
                                    key={item._id} />
                                )}
                            </>: <div className="sortingText">We don't have any flights matching your search on our site. Try changing some details.</div>
                            )}
                        </div>}
                        {airlineSorted&&(!priceSorted)&&<div className="flightListResultConatainer">
                            {loading ? (
                            "loading"
                            ) : (
                            data.length ? <>
                                {data.sort((a,b)=> a.airlineCompany.localeCompare(b.airlineCompany)).map((item) => 
                                    <SearchItem 
                                    item={item} 
                                    roundWay={roundWay} setRoundWay={setRoundWay} 
                                    departCity={departCity} setDepartCity={setDepartCity}
                                    arrivetCity={arrivetCity} setArriveCity={setArriveCity}
                                    returnDate={returnDate} setStartDate ={setStartDate}
                                    flightsOrder={flightsOrder} setFlightsOrder={setFlightsOrder}
                                    number={number} setNumber={setNumber}
                                    isBundle={isBundle} setIsBundle={setIsBundle}
                                    destination={destination} setDestination={setDestination}
                                    dates= {dates} setDates={setDates}
                                    options={options} setOptions={setOptions}

                                    key={item._id} />
                                )}
                            </>: <div className="sortingText">We don't have any flights matching your search on our site. Try changing some details.</div>
                            )}
                        </div>}
                        
                    </div>

                </div>
            </div>
            
        </div>

            <Footer/>

        </div>
       
    )
}

export default FlightSearchResult
