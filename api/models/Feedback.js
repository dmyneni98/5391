import mongoose from 'mongoose';


const feedbackSchema = new mongoose.Schema({
    rating:{
        type: Number,
        min: 0,
        max: 10,
        required: true,
    },
    comment:{
        type: String,
        required: true,
        
    },

})

export default mongoose.model("Feedback", feedbackSchema)