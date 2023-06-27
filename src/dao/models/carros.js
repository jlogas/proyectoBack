import mongoose from "mongoose";

const carsColletion = "carros"

const cartSchema = new mongoose.Schema({
   productos:{
    type:[
        { 
            productos:{
                type:mongoose.Schema.Types.ObjectId,
                ref: "productos"
            }
        }
    ],
    default:[]
   }
})

export const carroModel = mongoose.model(carsColletion,cartSchema)