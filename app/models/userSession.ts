import mongoose from "mongoose";

// I dont think I ever use this model, but I will keep it for now
// I think this is used for the session cookie, but I am not sure

const userSessionSchema = new mongoose.Schema({
    id: String,
    expires: Date,
    session: String
}, {timestamps: true});

export default mongoose.models.UserSession || mongoose.model("UserSession", userSessionSchema);