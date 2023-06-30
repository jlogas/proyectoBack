import mongoose from "mongoose";

const carsColletion = "carros"

const cartSchema = new mongoose.Schema({
   productos:{
    type:[
        { 
           
                type:mongoose.Schema.Types.ObjectId,
                ref: "productos"
            
        }
    ],
    
   }
})

export const carroModel = mongoose.model(carsColletion,cartSchema)