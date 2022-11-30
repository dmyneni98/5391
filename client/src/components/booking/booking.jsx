import "../flightSearchBar/flightSearchBar.css";

import React, { useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const BookingList  = () => {
    console.log("http://localhost:8800/api/users/booking/"+localStorage.getItem("userid"))
    const { data, loading, error, reFetch } = useFetch(
        "http://localhost:8800/api/users/booking/"+localStorage.getItem("userid")
      );

    const hotelResponse = useFetch(
      "http://localhost:8800/api/users/hotelbooking/"+localStorage.getItem("userid")
    );

    console.log(hotelResponse);

    
     /* if(data.length == 0)
        {
          setMsg("We don't have any reservationa for this user.")
        }
    const [data, setData] = useState([]);    
    try {
        console.log("http://localhost:8800/api/users/booking/"+localStorage.getItem("userid"))
        const res = axios.get("http://localhost:8800/api/users/booking/"+localStorage.getItem("userid"));
        
        if(res == null)
        {
          setMsg("We don't have any reservationa for this user.")
        }
        else
        {
            setData(res.data); 
        }
       
      } catch (err) {
          console.log("Unable to authnticate")
        //dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      }
      */
 return(
    <div class="flightSearchContainer">
        {
         (
          data.length ? <>  
              {data.map((item) => 
                  <span className="flightItemContainer">
                  <span className="partItemContainer">
                  <div className="textInfo">
                     Airlines :{item.airlineCompany} </div>
                  <div className="textInfo">
                  Depart City : {item.departCity}
                  </div>
                  <div className="textInfo">
                  Arrive City : {item.arriveCity}
                  </div>
                  <div className="textInfo">
                     Price : $ {item.price}
                  </div>
                  <div className="textInfo">
                     Departing Time : {item.departDate.substring(0, 10)}
                  </div>
                  <div className="textInfo">
                     Arrival Time : {item.arriveDate.substring(0, 10)}
                  </div>
                  </span>  
                  </span>
              )}
          </>: <div className="sortingText">We don't have any reservationa for this user. </div>
          )

        }
        { (
            hotelResponse.data.length ? <>
              {
                hotelResponse.data.map((item) => 
                <span className="flightItemContainer">
                <span className="partItemContainer">
                <div className="textInfo">
                   Hotel: {item.hotel.name} </div>
                <div className="textInfo">
                Room: {item.room.title}
                </div>
                <div className="textInfo">
                Number of People : {item.numPeople}
                </div>
                <div className="textInfo">
                  Price : $ {item.room.price}
                </div>
                </span>  
                </span>
              )}
            </> : <>
            </>
        )
        }
        </div>

 )   
}
export default  BookingList;