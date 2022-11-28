import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
   
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type: String,
        required: true
        
      },
      firstname: {
        type: String,
        
      }, 
      email: {
        type: String,
        
        
      },
      lastname:{
        type:String
      },
      middlename:{
        type:String
      },
      address1:{
        type:String
      },
      address2:{
        type:String
      },
      city:{
        type:String,
        required: true,
      },
      phone: {
      type: String,
      required: true,
      },
      state:{
        type:String
      },
      zipcode:{
        type:Number
      },
      creditcardnum:{
        type:String
      },
      creditname:{
        type:String
      },
      creditexpdate:{
        type:String
      },
      creditcvv:{
        type:String
      },
      creditzip:{
        type:String
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      mileage:{
        type:Number,
       
    },
      flightOrder:{
          type: [
              {
                  flight: { type: String },
                  numPassenger: { type: Number }
              }
          ],
          default: [],
      },
    },
    { timestamps: true }
    
    );

export default mongoose.model("User", UserSchema);