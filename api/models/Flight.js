import mongoose from "mongoose";


const FlightSchema = new mongoose.Schema({
  flightNunber: {
    type: String,
    required: true,
  },
  airlineCompany: {
    type: String,
    required: true,
  },
  departCity: {
    type: String,
    required: true,
  },
  departAirport: {
    type: String,
    required: true,
  },
  departDate:{
    type: Date ,
    required: true,
  },
  departTime:{
    type: String,
    required: true,
  },
  arriveCity: {
    type: String,
    required: true,
  },
  arriveAirport: {
    type: String,
    required: true,
  },
  arriveDate:{
    type: Date ,
    required: true,
  },
  arriveTime:{
    type: String,
    required: true,
  },
  price:{
    type:Number,
    required: true,
  },
  ifInternational:{
    type: Boolean,
    required: true,
  },
  miles:{
    type: Number,
    required: true,
  },
  flightStatus:{
    type: String,
    required: true,
  },
  flightTime: {
    type: String,
    required: true,
  },
  gate: {
    type: String,
  },

  passengers:{
    type: [
      {
          userid: { type: String },
          userEmail:{ type: String },
          numPassenger: { type: Number }
      }
  ],
  default: [],
  },

});

export default mongoose.model("Flight", FlightSchema)