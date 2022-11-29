import "./navbar.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar () {
  const navigate = useNavigate()
  const handleClick = async (e) => {
    localStorage.setItem("user","")
    localStorage.setItem("userid","")
    navigate("/")
  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="link">
          <span className="logo">Trip Aspire</span>
        </Link>
        <div className="navItems">
        <span>{localStorage.getItem("user")}</span>
          {localStorage.getItem("user") == ""?(<Link to="/login">
            <button className="navButton">Login</button>
            </Link>): (
               <button className="navButton" onClick={handleClick}>Logout</button>
            )
            
          }
          <Link to="/booking" className="navButton" >
            <span >Booking</span>
          </Link> 
          <Link to="/register" className="navButton" >
            <span >Register</span>
          </Link>
    
        </div>

      </div>
    </div>
  );
};

export default Navbar;
