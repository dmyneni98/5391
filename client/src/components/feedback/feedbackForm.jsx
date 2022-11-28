




import "./feedbackform.css";
import PopoutFeedback from "./PopoutFeedback";
import React, { useEffect,useState } from "react";


import { FaStar } from "react-icons/fa";


function FeedbackForm(){
    const [comment,setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [bottonPopup, setBottonPopup] = useState(false)
    console.log(rating);
    console.log(comment);

    function handleClick (){
        const data = { 
            rating: rating,
            comment: comment
        }
        fetch(`/feedback`,{
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            setBottonPopup(true)
            console.log("feedback sended")
            console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    return (

        <div className="feedback">
            <div className="feedbackContainer">
                <div >
                    <div className="title"> Thanks for visiting Trip Aspire! We hope you had a great time 
                        and would live your feedback, so please tell us: </div>
                    
                    <div>  How satisfied were you with our website? </div>
                    
                </div>

                <div className="ratingContainer">
                    <div className="ratingTypeContainer">
                        <div className="ratingExplan">
                            Not likely
                        </div>
                    </div>
                    <div className="ratingTypeContainer">
                        <button  className="rating" name="ratingType" value = "rating"  
                        onClick={() =>  setRating(1)}>1</button>
                    </div>
                    <div className="ratingTypeContainer">
                        <button className="rating" name="ratingType" value = "rating"  
                        onClick={() =>  setRating(2)}>2</button>
                    </div>
                    <div className="ratingTypeContainer">
                        <button className="rating" name="ratingType" value = "rating"  
                        onClick={() =>  setRating(3)}>3</button>
                    </div>
                    <div className="ratingTypeContainer">
                        <button className="rating" name="ratingType" value = "rating"  
                        onClick={() =>  setRating(4)}>4</button>
                    </div>
                    <div className="ratingTypeContainer">
                        <button className="rating" name="ratingType" value = "rating"  
                        onClick={() =>  setRating(5)}>5</button>
                    </div>
                    <div className="ratingTypeContainer">
                        <button className="rating" name="ratingType" value = "rating"  
                        onClick={() =>  setRating(6)}>6</button>
                    </div>
                    <div className="ratingTypeContainer">
                        <button className="rating" name="ratingType" value = "rating"  
                        onClick={() =>  setRating(7)}>7</button>
                    </div>
                    <div className="ratingTypeContainer">
                        <button className="rating" name="ratingType" value = "rating"  
                        onClick={() =>  setRating(8)}>8</button>
                    </div>
                    <div className="ratingTypeContainer">
                        <button className="rating" name="ratingType" value = "rating"  
                        onClick={() =>  setRating(9)}>9</button>
                    </div>
                    <div className="ratingTypeContainer">
                        <button className="rating" name="ratingType" value = "rating"  
                        onClick={() =>  setRating(10)}>10</button>
                    </div>
                    <div className="ratingTypeContainer">
                        <div className="ratingExplan">
                            Not likely
                        </div>
                    </div>

                </div>
                  <div className="title">
                        <div className="title">
                            You choose: {rating}
                        </div>
                    </div>

                    <div className="commentbox">
                        <textarea 
                            className="comment" 
                            name ="comment" 
                            placeholder="Let us know why you feel this way (optional)"
                            onChange={(e) => setComment(e.target.value)}
                            >
                        </textarea>
                        
                    </div>
                    <button className="feedback-submit" type="submit" onClick={handleClick}>Submit</button>
                
            </div>   
            <div className="popoutContainer">
            <PopoutFeedback className="popouBox" trigger={bottonPopup} setTrigger={setBottonPopup}>
                <h1>Thank you for helping us to be better</h1>
            </PopoutFeedback>
            </div>            
    </div>

    )

}

export default FeedbackForm
















