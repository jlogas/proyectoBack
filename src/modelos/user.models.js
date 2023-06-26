import mongoose from "mongoose";

const userCollection = "usuarios"

const userScheema = new mongoose.Schema({

    firs_name: String,
    last_name: String,
    email: {
        type: String,
        unique:true
    }
})

export const userModel = mongoose.model(userCollection, userScheema)