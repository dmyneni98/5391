import mongoose from 'mongoose';

const dealsSchema = new mongoose.Schema({
    name: {
       type:String
    },
    origin: {
        type:String
     },
     destination: {
        type:String
     },
     starttime: {
        type:Date
     },
     endtime:{
        type: Date
     },
     price:{
        type:Number
     },
     duration:{
        type:String
     },
     type:{
        type: String
     }
  });

  export default mongoose.model("deals",dealsSchema);