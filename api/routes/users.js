import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getBooking,
  getHotelBooking
} from "../controller/user.js";



const router = express.Router();

router.get("/booking/:id", getBooking);

router.get("/hotelbooking/:id", getHotelBooking);
//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", getUsers);

export default router;