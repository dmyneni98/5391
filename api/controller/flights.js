import Flight from "../models/Flight.js"



export const createFlight = async (req,res,next)=>{
    try {
      const newFlight = new Flight({
        flightNunber:req.body.flightNunber,
        airlineCompany: req.body.airlineCompany,
        departCity: req.body.departCity,
        departAirport:req.body.departAirport,
        departDate:req.body.departDate,
        departTime:req.body.departTime,
        arriveCity: req.body.arriveCity,
        arriveAirport: req.body.arriveAirport,
        arriveDate:req.body.arriveDate,
        arriveTime:req.body.arriveTime,
        price:req.body.price,
        ifInternational:req.body.ifInternational,
        miles:req.body.miles,
        flightTime:req.body.flightTime,
        gate:"",
        flightStatus:"ON TIME",
        passengers:[],
      })
        const saveFlight = await newFlight.save()
        res.status(200).json(saveFlight)
    } catch (err) {
        next(err)
    }
}

export const updateFlight = async (req,res,next)=>{
    try {
        const updatedFlight = await Flight.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedFlight);
      } catch (err) {
         next(err)
      }
}


export const deleteFlight = async (req,res,next)=>{
    try {
        await Flight.findByIdAndDelete(req.params.id);
        res.status(200).json("Flight has been deleted.");
      } catch (err) {
        next(err)
      }
}


export const getFlight = async (req,res,next)=>{
    try {
        const flight = await Flight.findById(req.params.id);
        res.status(200).json(flight);
      } catch (err) {
        next(err);
      }
}


export const getFlights = async (req,res,next)=>{
    try {
      const flights = await Flight.find(req.query).limit(req.query.limit);
      res.status(200).json(flights);
    } catch (err) {
      next(err);
    }
}


