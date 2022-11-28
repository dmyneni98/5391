import "./feedback.css"
import React from "react"
import Header from "../../components/header/Header"
import FeedbackForm from "../../components/feedback/feedbackForm"
import Footer from "../../components/footer/Footer"

function Feedback(){
    return(
        <div >
            <Header/>
            <FeedbackForm/>
            <Footer/>

        </div>
        
    )
}

export default Feedback