import mongoose from "mongoose";


const ticketsCollection = "tickets"

const ticketsSchema = new mongoose.Schema({
 code: String,
 purchase_date:{type: Date, default: Date.now },
 amount: Number,
 email: String

})

export const ticketsModel = mongoose.model(ticketsCollection,ticketsSchema);
