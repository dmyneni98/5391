import React from "react"
import Header from "../../components/header/Header"
import FlightStatusBar from "../../components/flightStatusBar/FlightStatusBar"
import Footer from "../../components/footer/Footer"
function FlightStatus(){
    return(
        <div >
            <Header/>
            <FlightStatusBar/>
            <Footer/>
        </div>
        
    )
}

export default FlightStatus