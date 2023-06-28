import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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

productSchema.plugin(mongoosePaginate);
export const productoModel = mongoose.model(productosCollection,productSchema);