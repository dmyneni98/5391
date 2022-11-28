import Deal from "../models/deals.js";

export const createDeal = async (req,res,next) => {
    const newDeal = new Deal(req.body)
    try{
     const savedDeal = await newDeal.save()
     res.status(200).json(savedDeal)
    }catch(err){
        next(err)
    }

}

export const deleteDeal = async (req,res,next) => {
    try{
        await Deal.findByIdAndDelete(req.params.id)
       res.status(200).json("record deleted")
      }catch(err){
          next(err)
      }

}

export const updateDeal = async (req,res,next) => {
    try{
        const updatedDeal = await Deal.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedDeal)
       }catch(err){
           next(err)
       }
}

export const getDeal = async (req,res,next) => {
    try{
        const deals = await Deal.findById(req.params.id)
        res.status(200).json(deals)
       }catch(err){
           next(err)
       }

}

export const getDeals = async (req,res,next) => {
    const { min, max, ...others } = req.query;
    try{
        const dealslist = await Deal.find(
            {
             ...others,
            price: { $gt: min | 1, $lt: max || 999 },})
        res.status(200).json(dealslist)
       }catch(err){
          next(err)
       }

}



