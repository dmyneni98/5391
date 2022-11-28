import "./navbar.css"
import { Link } from "react-router-dom";


function Navbar () {

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="link">
          <span className="logo">Trip Aspire</span>
        </Link>
        <div className="navItems">
          <Link to="/login" className="navButton" >
            <span >Sign in</span>
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
