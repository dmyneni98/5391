

import React from "react"
import Header from "../../components/header/Header"

import FlightSearchBar from "../../components/flightSearchBar/FlightSearchBar"
import Footer from "../../components/footer/Footer"
function Home(){
    return(
        <div >
            <Header/>
            
  
            <FlightSearchBar/>
            <Footer/>
        </div>
        
    )
}

export default Home