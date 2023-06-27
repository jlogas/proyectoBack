import mongoose from "mongoose";

const productosCollection = "productos"

const productSchema = new mongoose.Schema({
 title: String,
 description:String,  
 code: String,
 price: Number,
 status: Boolean,
 stock:Number,
 category:String  
})

export const productoModel = mongoose.model(productosCollection,productSchema)