import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},   // password is hashed by bcrypt
    favorites: [{ duelTitle: String, duelName: String }],
    history: [{ duelTitle: String, duelName: String }],
    attempts: Number,
    last: Date,
    idForResettingPwd: {type: String, required: true}
}, { timestamps: true });

export default mongoose.models.UsersNextJS || mongoose.model("UsersNextJS", userSchema);