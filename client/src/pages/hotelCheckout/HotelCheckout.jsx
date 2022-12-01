import React, { useState, useEffect } from 'react';
import {
    faArrowRight, faFileLines, faLineChart, faPenRuler, faRulerHorizontal, faUmbrellaBeach,
} 
from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import "./hotelCheckout.css";
import { useLocation,useNavigate } from "react-router-dom"

const HotelCheckout = () => {
    const location = useLocation()
    const [selectedRooms, setSelectedRooms] = useState(location.state.selectedRooms);
    const [hotelRooms, setHotelRooms] = useState(location.state.hotelRooms);
    const [dates, setDates] = useState(location.state.dates);
    const [hotelReservation,setHotelReservation] = useState([]);
    const [userId,setUserId] = useState("");
    const [success, setSuccess] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [hotelId, setHotelId] = useState(location.state.hotelId);
    const navigate = useNavigate();
    
    const selectedHotelRooms = selectedRooms.map((roomId) => {
        
        const hotelRoom = hotelRooms.filter((hotelRoom) => hotelRoom._id == roomId);
        if(hotelRoom.length > 0) {
            return hotelRoom[0];
        }
        return {title: null};
    });
    // console.log(hotelRooms);
    // console.log(selectedRooms);
    // console.log(selectedHotelRooms);

    const userName = "John@1234";

    useEffect(()=>{
        Promise.all([
            fetch(`/users?username=${userName}`),
          ]).then(async([aa, bb, cc]) => {
            const a = await aa.json();
            setUserId(a[0]);
            setHotelReservation(a[0].hotelOrder);
          })
    
    },[]);

    const placeHotelOrder = async () => {
        let hotelData = ""
        selectedRooms.map((roomId)=>(
            hotelData = {hotel: hotelId, room:roomId, numPeople : options.adult + options.children },  
            hotelReservation.push(hotelData))) 
        if(hotelData) { 
            fetch(`/users/${userId._id}`,{
                method: 'PUT', // or 'PUT'
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({
                    "hotelOrder":hotelReservation,
                }),
            })
            .then(() => {console.log("userInfo has updated with hotel")})
            .catch((error) => {console.error('Error:', error);
            });
        }
        setSuccess(true);
    };
    
    return (
        <div>
            <Header/>
            <div className="checkoutContainer">
            {success ? (
                <section className="popOutSection">
                    <FontAwesomeIcon icon={faUmbrellaBeach} className="vacation-icon"  /> 
                    <h1 className="register-title">Enjoy Your Stay !</h1>
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
                                {selectedHotelRooms.map((item)=>
                                <div className="flightSummaryBox">
                                    <div className="flightSummaryBox-flightNum">
                                        <div className="flightSubBox">
                                            {item.title}
                                        </div>
                                    </div>
                                    <div className="flightSummaryBox-info">
                                        <h3>
                                            Number of People: {options.adult + options.children}
                                            

                                        </h3>
                                        <br></br>
                                        <h3>
                                            Price: $ {item.price}
                                            

                                        </h3>
                                    </div>
                                </div>
                                )}
                                </>
                            </div>
                        </div>   
                    </div>
                    <div className="orderInfoContainer">
                        <div className="orderInfoWrapper">
                        {/* { (0!=0)&&( */}
                            <div className="paymentContainer">
                                <h3 >Payment Details</h3>
                                <hr />
                                <form className="CreditCard">
                                    <div className="cardInfo-expireDate">
                                        <div> Name on Card</div>
                                        <input type="text" className="cardInput" placeholder="First Name"  name="firstName" id="firstName" />
                                       
                                        <input type="text" className="cardInput" placeholder="Last Name"  name="lastName" id="lastName" />
                                    </div>
                                    <div className="cardInfo">
                                        <div> Card Number</div>
                                        <input type="text" className="cardInput" name="cardNumber" id="cardNumber" />
                                    </div>
                                    <div className="cardInfo-expireDate">
                                        <div> Expiration Date</div>
                                        <input type="text" className="cardInput" placeholder="YYYY" name="expireYear" id="expireYear" />
                                        <input type="text" className="cardInput" placeholder="MM"  name="expireMonth" id="expireMonth" />
                                    </div>
                                    <div className="cardInfo-expireDate">
                                        <div> Security Code (CVV)</div>
                                        <input type="text" className="cardInput" name="CVV" id="CVV" />
                                    </div>
                                </form>
                            
                            </div>                            
                        {/* )} */}
                        </div> 
                    </div>
                    <div className="place-order">
                        <button className="fightOrder-btn" onClick={placeHotelOrder}>Place Order</button>
                    </div>
                </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default HotelCheckout;