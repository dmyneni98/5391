import React from 'react'
import { useLocation,useNavigate } from "react-router-dom"
import "./popoutFeedback.css"

function PopoutFeedback(props) {

  const navigate = useNavigate()
  return (props.trigger)?(
    <div className="popup">
        <div className="pupup-inner">
            <button className="close-btn" onClick={()=>(
              props.setTrigger(false),
              navigate("/")
              )}>close</button>
            {props.children}
        </div>
    </div>
  ):"";
}

export default PopoutFeedback