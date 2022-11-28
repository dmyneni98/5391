import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import feedbackRouter from "./routes/feedback.js"
import flightRouter from "./routes/flights.js"
import authRouter from "./routes/auth.js"
import userRouter from "./routes/users.js"
import dealsRoute from "./routes/deals.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB")
      } catch (error) {
        throw error;
      }
    
};
mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected")
})



app.use(cors());
app.use(cookieParser());
app.use(express.json())

app.use("/api/flights",flightRouter)
app.use("/api/feedback",feedbackRouter)



app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)

app.use("/api/deals", dealsRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);  



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, ()=>{
    connect();
    console.log("connected to backend!")
})