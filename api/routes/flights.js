import express from "express";
import { 
    createFlight,
    updateFlight,
    deleteFlight, 
    getFlight, 
    getFlights 
} from "../controller/flights.js";


const router  = express.Router();

router.post("/", createFlight);

router.put("/:id", updateFlight) ;

router.delete("/:id",deleteFlight);

router.get("/find/:id",getFlight);

router.get("/",getFlights);

export default router
