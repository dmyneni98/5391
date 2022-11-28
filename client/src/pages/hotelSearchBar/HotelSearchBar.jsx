import React from "react"
import Header from "../../components/header/Header";
import SearchBar from "../../components/searchBar/SearchBar";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./hotelSearchBar.css"

const HotelSearchBar = () => {
    return(
        <div>
            <div>
                <Header/>
                <SearchBar/>
            </div>
            <div className="homeContainer">
                <Featured/>
                {/* <h1 className="homeTitle">Browse by property type</h1>
                <PropertyList/> */}
                <h1 className="homeTitle">Homes guests love</h1>
                <FeaturedProperties/>
                {/* <MailList/>
                <Footer/> */}
            </div>
        </div>
    );
};

export default HotelSearchBar;