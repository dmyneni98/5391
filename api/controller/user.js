import User from "../models/User.js";
import Flight from "../models/Flight.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
export const updateUser = async (req,res,next)=>{
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
  export const deleteUser = async (req,res,next)=>{
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  }
  export const getUser = async (req,res,next)=>{
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
  export const getUsers = async (req,res,next)=>{
    try {
       const users = await User.find(req.query).limit(req.query.limit);
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  export const getBooking = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      console.log(user.flightOrder);
      const list = await Promise.all(
        user.flightOrder.map((flightOrder) => {
          return Flight.findById(flightOrder.flight);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };

  export const getHotelBooking = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      const roomList = await Promise.all(
        user.hotelOrder.map((hotelOrder) => {
          return Room.findById(hotelOrder.room);
        })
      );

      const hotelList = await Promise.all(
        user.hotelOrder.map((hotelOrder) => { 
          return Hotel.findById(hotelOrder.hotel);
        })
      );

      console.log(roomList);
      console.log(hotelList);

      const list = user.hotelOrder.map((hotelOrder, i) => {
        return {
          hotel: hotelList[i],
          room: roomList[i],
          numPeople: hotelOrder.numPeople
        }
      });

      console.log(list);

      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };
