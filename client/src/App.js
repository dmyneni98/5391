import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import FlightSearchResult from "./pages/flightsResult/FlightSearchResult";
import Feedback from "./pages/Feedback/Feedback";

import FlightReserveRW from "./pages/flightResearve/FlightReserveRW"
import FlightReserveOW from "./pages/flightResearve/FlightReserveOW";
import OrderFlight from "./pages/orderFlight/OrderFlight";

import Login from "./pages/login/Login"
import Signme from "./pages/signup/Signup";
import DealList from "./pages/deals/Deals";

import HotelSearchBar from "./pages/hotelSearchBar/HotelSearchBar";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>    
        <Route path="/flightList" element={<FlightSearchResult />} />
        <Route path="/flightCheckout" element={<OrderFlight/>}/>   
        <Route path="/flightReserve-roundway" element={<FlightReserveRW />} />
        <Route path="/flightReserve-onedway" element={<FlightReserveOW/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signme/>} />
        <Route path="/deals" element={<DealList/>} />
        <Route path="/hotelsearch" element={<HotelSearchBar/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
