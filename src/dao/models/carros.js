import mongoose from "mongoose";

const carsColletion = "carros"

const cartSchema = new mongoose.Schema({
   productos:{
    type:[
        { 
            producto:{
                type:mongoose.Schema.Types.ObjectId,
                ref: "productos"
            }
        }
    ],
    default:[],
   }
})

export const carroModel = mongoose.model(carsColletion,cartSchema)