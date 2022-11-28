import express from "express";
import Feedback from "../models/Feedback.js"

const router  = express.Router();


router.post("/", async(req, res)=>{
    const newFeedback = new Feedback(req.body)

    try {
    
        const saveFeedback = await newFeedback.save()
        res.status(200).json(saveFeedback)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router
