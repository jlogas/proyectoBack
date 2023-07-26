import mongoose from "mongoose";

const collection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    rol:{type: String, default:"use"},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
})

const userModel = mongoose.model(collection,userSchema);

export default userModel;
 