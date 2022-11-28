import "./footer.css"
import { Link } from "react-router-dom";

function Footer(){
    return(
        <div className="footerContainer">
            <Link to="/" className="HPlink">
                <div className="footerText">Return to HomePage</div>
            </Link>
           
        </div>
    )
}

export default Footer