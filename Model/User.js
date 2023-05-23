import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    createAt:String

});

const User= mongoose.model('User',userSchema);

export default User;

