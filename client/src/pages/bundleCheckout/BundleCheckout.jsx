import {
    faArrowRight, faFileLines, faLineChart, faPenRuler, faRulerHorizontal, faUmbrellaBeach,
} 
from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import useFetch from "../../hooks/useFetch"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import "./bundleCheckout.css"
import { useLocation,useNavigate } from "react-router-dom"
import _ from 'lodash';


function OrderFlight(){

    const location = useLocation()
    const [flightsOrder, setFlightsOrder] = useState(location.state.flightsOrder)
    const [number, setNumber] = useState(location.state.number);        //number of passenger
    const [flightsList,setFlightsList] = useState([])               //store the flights user chose
    const [mileage, setMileage] =useState(0)
    const [ifRedeem, setIfRedeem] =useState(false)
    const [ifInternational, setIfInternational] =useState(false)
    const [userId,setUserId] = useState("")                             // store user info
    const [flightReservation,setFlightReservation] = useState([])       // store user.flightOrder
    const [hotelReservation,setHotelReservation] = useState([]);
    const [success, setSuccess] = useState(false);

    const [hotelRooms, setHotelRooms] = useState(location.state.hotelRooms);
    const [selectedRooms, setSelectedRooms] = useState(location.state.selectedRooms);
    const [hotelId, setHotelId] = useState(location.state.hotelId);
    const [options, setOptions] = useState(location.state.options);
    const [hotelList, setHotelList] = useState()

    const selectedHotelRooms = selectedRooms.map((roomId) => {
        const hotelRoom = hotelRooms.filter((hotelRoom) => hotelRoom._id == roomId);
        if(hotelRoom.length > 0) {
            return hotelRooms[0];
        }
        return {title: null};
    });

    const mileageRate = 1
    const taxRate = 0.15
    const discountRate = 0.2

    //const userName = "Myles"  //wait to change. after get authentication
    // const userName=localStorage.getItem("user")
    const userName=localStorage.getItem("user")
    console.log(userName)
   // const userName = "John@1234";

    useEffect(()=>{
        Promise.all([
            fetch(`/flights?_id=${flightsOrder[0]}`),
            fetch(`/flights?_id=${flightsOrder[1]}`),
            fetch(`/users?username=${userName}`),
            fetch(`/hotels?_id=${hotelId}`),     //   <- fetch hotel info
          ]).then(async([aa, bb, cc, dd]) => {
            const a = await aa.json();
            const b = await bb.json();
            const c = await cc.json();
            const d = await dd.json();

            console.log(a[0])
            console.log(b[0])
            console.log(c[0])
            console.log(d[0])   // <- hotel info
            
            setUserId(c[0])
            setMileage(c[0].mileage)
            setIfInternational(a[0].ifInternational)
            setFlightReservation(c[0].flightOrder) 
            setHotelReservation(c[0].hotelOrder);

            setHotelList(d[0])

            console.log(_.isEqual(flightsList[0],(a[0])))
            if(!_.isEqual(flightsList[0],(a[0]))){
                flightsList.push(a[0])
                console.log("add a  ")
                console.log(a[0])
            }
            if (b.success != false && !_.isEqual(flightsList[1],(b[0]))){         
                flightsList.push(b[0]) 
                console.log("add b ") 
            }
          })
    },[]);
    
    
    const flightType = ifInternational ? "International flight" : "Domestic flight"    
    const noRedeem =  Math.floor(mileage /(ifInternational? 50000:25000))           // how many flights the user can redeem
    const placeFlightOrder =()=>{
        //compute the updated mileage
        let mileageChange = 0
        const redeemedFlight = (numflights <= noRedeem)? numflights : noRedeem
        if (ifRedeem && noRedeem > 0){          //if the user want to redeem and he has enought miles to redeem
            mileageChange -= (redeemedFlight * (ifInternational? 50000 :25000))         //calculate the mileage the user use
        }
        const newMileage = ((totalPrice * (1+taxRate))*(1-discountRate) * mileageRate).toFixed(0)        //calculate the mileage the new flights generated
        mileageChange = Number(mileageChange) + Number(newMileage) 
        const updatedMileage = mileage + mileageChange

        // store flights to user
        let flightData = ""
        flightsList.map((flight)=>(
            flightData = {flight:flight._id, numPassenger : number.passenger },  
            flightReservation.push(flightData)))  

        let hotelData = "";
        selectedRooms.map((roomId)=>(
            hotelData = {hotel: hotelId, room:roomId, numPeople : options.adult + options.children },  
            hotelReservation.push(hotelData)))

        if(hotelData) {
            fetch(`/users/${userId._id}`,{
                method: 'PUT', // or 'PUT'
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                    "hotelOrder":hotelReservation
                }),
            })
            .then(() => {console.log("userInfo has updated with hotel")})
            .catch((error) => {console.error('Error:', error);
            });
        }

        fetch(`/users/${userId._id}`,{
            method: 'PUT', // or 'PUT'
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                "mileage": updatedMileage,
                "flightOrder":flightReservation
            }),
        })
        .then(() => {console.log("userInfo has updated")})
        .catch((error) => {console.error('Error:', error);
        });

        //store user to flight
        let userInfo = ""
        let passengerList = []
        flightsList.map((flight)=>(
            userInfo = { 
                userId : userId._id, 
                userEmail:userId.email,
                numPassenger : number.passenger },
            passengerList = flight.passengers,
            passengerList.push(userInfo),
            fetch(`/flights/${flight._id}`,{
                method: 'PUT', // or 'PUT'
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({ "passengers": passengerList, }),
            })
            .then((data) => {console.log("flight info has updated")})
            .catch((error) => { console.error('Error:', error);})
            ))

        setSuccess(true);
    }
      
    let totalPrice = 0
    let totalHotelPrice=0
    let priceList = []
    const getTotalPrice = ()=>{
        totalPrice = 0
        priceList.map(itemprice=>totalPrice += itemprice)
        totalPrice = totalPrice.toFixed(2)
    }
    const getTotalHotelPrice = () => {
        totalHotelPrice=0;
        selectedHotelRooms.map(({price}) => totalHotelPrice += price);
        totalHotelPrice = totalHotelPrice.toFixed(2)
    }
    const removeLargest = ()=>{
        const noFlightCanRedeem =  Math.floor(mileage /(ifInternational? 50000:25000))
        for(let i = 0; i < noFlightCanRedeem; i++){
            const max = Math.max(...priceList)
            for (let j = 0; j< priceList.length; j++){
                if (priceList[j] == max){
                    priceList[j] =priceList[0];
                    priceList.shift() ;
                    break;
                }
            }
        }
        const max = Math.max(...priceList)
        priceList.filter(number => number != max)
    }

    let numflights = 0
    const generatePriceList = (itemprice, numberPassenger) =>{
        for(let i = 0; i<numberPassenger;i++){
            priceList.push(itemprice)
        }
        numflights = priceList.length
    }
    const reset = ()=>{
        totalPrice = 0
        priceList = []
    }

    return(
        <div>
            <Header/>
            <div className="checkoutContainer">

                {success ? (
                <section className="popOutSection">
                    <FontAwesomeIcon icon={faUmbrellaBeach} className="vacation-icon"  /> 
                    <h1 className="register-title">Enjoy Your Trip !</h1>
                    <h3 className="register-title">Your order is complete</h3>
                    <p>
                    <Link to="/" className="link-home-btn" >
                        Return to Home
                        </Link>
                    </p>
                </section>
                ) : (
                
                <div className="checkoutWrapper">
                    <div className="orderInfoContainer">
                        <div className="orderInfoWrapper">
                            <div className="flightOrderTitle">
                                <h2>Order Summary</h2>
                            </div>
                            <div className="flightSummary">
                                <>
                                {flightsList.map((item)=>
                                <div className="flightSummaryBox">
                                    {reset}
                            
                                    {generatePriceList(item.price, number.passenger)}
                                    <div className="flightSummaryBox-flightNum">
                                    {item.flightNunber}
                                    </div>
                                    <div className="flightSummaryBox-info">
                                    <div className="flightSubBox">
                                        {item.departAirport}
                                        <FontAwesomeIcon icon={faArrowRight} className="arrowIcon"  /> 
                                        {item.arriveAirport}

                                    </div>
                                    <div className="flightSubBox-time">
                                        {item.departDate.substring(0, 10)}{" "}
                                        {item.departTime}
                                        <div className="hrWrapper">
                                            <hr className="hrLine" />
                                        </div>    
                                        <div className="flightSubBox-time-arrive">
                                        {item.arriveDate.substring(0, 10)}{" "}                       
                                        {item.arriveTime}   
                                        </div> 
                                    </div>
                                    </div>
                                    
                                </div>
                                )}
                                </>

                            </div>
                            <div className="flightSummary">
                            <>
                                {selectedHotelRooms.map((item)=>
                                <div className="flightSummaryBox">
                                    <h4>Hotel Summary</h4>
                                    <div className="flightSummaryBox-flightNum">
                                        {item.title}
                                    </div>
                                    <div className="flightSummaryBox-info">
                                        <div className="flightSubBox">
                                            <FontAwesomeIcon icon={faArrowRight} className="arrowIcon"  /> 
                                            {options.adult + options.children} people
                                            

                                        </div>
                                        <div className="flightSubBox">
                                            <FontAwesomeIcon icon={faArrowRight} className="arrowIcon"  /> 
                                            $ {item.price}
                                            

                                        </div>
                                    </div>
                                </div>
                                )}
                                </>
                            </div>
                            <div className="flightOrderTitle">
                            <h3 className="paymentTitle">Trip Summary</h3>
                            <div>{number.passenger} passenger</div>
               
                            <div className="flightAndPrice">
                                <h4>Flights</h4>

                               {!ifRedeem&&  <>
                                {getTotalPrice()}
                                <h4>$ {totalPrice} </h4>
                                </>}
                               {ifRedeem&& <>
                                {removeLargest()}
                                {getTotalPrice()}
                         
                               <h4>$ {totalPrice}</h4></> }
                            </div>
                            <div className="flightAndPrice">
                                <h4>Hotel</h4>
                                {getTotalHotelPrice()}
                                <h4>$ {totalHotelPrice} </h4>
                            </div>
                            <div className="flightAndPrice">
                                <h4>Discount (20%)</h4>
                                <h4> - $ {((totalPrice * discountRate) + (totalHotelPrice * discountRate)).toFixed(2)} </h4>
                            </div>
                            <div className="flightAndPrice">
                                <h4>Taxes and Fees (15%)</h4>
                                <h4>$ {((totalPrice * taxRate*(1-discountRate)) + (totalHotelPrice * taxRate)*(1-discountRate)).toFixed(2)} </h4>
                            </div>
                            <div className="mileageRedeem">
                                <hr />
                                Redeem Mileage
                                <input type="checkbox" className="mileageRedeemCheckbox" onClick={() => setIfRedeem(!ifRedeem)} />
                                 {ifRedeem && <div className="mileageRedeemContainer">
                                    <div className="displayMileage">
                                        Total Miles: {mileage}
                                    </div>
                                    {(noRedeem != 0 && (numflights <= noRedeem))&&  <h5>You can redeem your mileage for {numflights} {flightType} </h5>}
                                    {(noRedeem != 0 && (numflights > noRedeem))&&  <h5>You can redeem your mileage for {noRedeem} {flightType}</h5>}
                                    {(noRedeem == 0)&&  <h5>Sorry, you don't have enough mileage</h5>}
                                    <hr />
                                 </div>}

                            <div className="paymentContainer">
                                <div className="flightAndPrice">
                                    <h3>Total</h3>
                                    <h3>$ {(totalPrice *(1-discountRate)* (1+taxRate) + totalHotelPrice * (1-discountRate) * (1+taxRate)).toFixed(2)} </h3>
                                </div>
                                <h5 className="mileageInfo">You can accumulate {((totalPrice*mileageRate*(1-discountRate)).toFixed(0))} miles</h5>
                            </div>                                                                  
                            </div>
                            </div>
                        </div>   
                    </div>

                    <div className="orderInfoContainer">
                        <div className="orderInfoWrapper">
                        { (totalPrice!=0)&&(
                            <div className="paymentContainer">
                                <h3 >Payment Detais</h3>
                                <hr />
                                <form className="CreditCard">
                                    <div className="cardInfo-expireDate">
                                        <div> Name On Card</div>
                                        <input type="text" className="cardInput" placeholder="Fisrt Name"  name="firstName" id="firstName" />
                                       
                                        <input type="text" className="cardInput" placeholder="Last Name"  name="lastName" id="lastName" />
                                    </div>
                                    <div className="cardInfo">
                                        <div> Card Number</div>
                                        <input type="text" className="cardInput" name="cardNumber" id="cardNumber" />
                                    </div>
                                    <div className="cardInfo-expireDate">
                                        <div>Expiration Date</div>
                                        <input type="text" className="cardInput" placeholder="YYYY" name="expireYear" id="expireYear" />
                                        <input type="text" className="cardInput" placeholder="MM"  name="expireMonth" id="expireMonth" />
                                    </div>
                                    <div className="cardInfo-expireDate">
                                        <div> Security Code (CVV)</div>
                                        <input type="text" className="cardInput" name="CVV" id="CVV" />
                                    </div>
                                    <button className="fightOrderBTN" onClick={placeFlightOrder}>Place Order</button>
                                </form>
                                
                            </div>                            
                            )}
                            
                        <div>          
                                      
                    </div>
                    
                    </div>
                </div>    
                </div>
                )}
            </div>
            <Footer/>
        </div>
    )

}
export default OrderFlight