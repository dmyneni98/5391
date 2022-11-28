import {
    faPlane,
    faBed,
    faGlobe,
    faPerson,
    faMessage,
    faPiggyBank,    
    faPlaneDeparture
} 
from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../navbar/Navbar";
import "./header.css";
import { Link } from "react-router-dom";

  
 function Header(){
    return (
        <div>
          <Navbar/>
          <div className="header">
            <div class="headerContainer">
              <div className="headerList">
                <div  className="headerListItem">
                  <Link to="/" className="link">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                  </Link>
                </div>
                <div className="headerListItem">
                  <FontAwesomeIcon icon={faBed} />
                  <Link to="/hotelsearch" className="link">
                  <span>Hotels</span>
                  </Link>
                </div>
                <div className="headerListItem">
                  <FontAwesomeIcon icon={faGlobe} />
                  <span>Flight+Hotel</span>
                </div>
                <div className="headerListItem">
                  <FontAwesomeIcon icon={faPiggyBank} />
                  <Link to="/deals" className="link">
                  <span>Find deals</span>
                  </Link>
                </div>
                <div className="headerListItem">
                  <Link to="/flightStatus" className="link">
                    <FontAwesomeIcon icon={faPlaneDeparture} />
                    <span>Flight Status</span>
                  </Link>
                 
                </div>
                <div className="headerListItem ">
                  <Link to="/feedback" className="link">
                    <FontAwesomeIcon icon={faMessage} />
                    <span>Feedback</span>
                 </Link>

                </div>
              </div>
              <div class="headerTitle">
                  <h3 className=" ">Give the winter season a warm welcome with 20% off</h3>
                  <h4 className="headerDesc">when bundling Hotel + Flight</h4>
              </div>
              
            </div>
        </div>
        </div>
      );

 }
export default Header;
  