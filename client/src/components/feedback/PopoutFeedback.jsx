import React from 'react'
import "./popoutFeedback.css"

function PopoutFeedback(props) {
  return (props.trigger)?(
    <div className="popup">
        <div className="pupup-inner">
            <button className="close-btn" onClick={()=>props.setTrigger(false)}>close</button>
            {props.children}
        </div>
    </div>
  ):"";
}

export default PopoutFeedback