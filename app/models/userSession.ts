import mongoose from "mongoose";

const userSessionSchema = new mongoose.Schema({
    id: String,
    expires: Date,
    session: String
}, {timestamps: true});

export default mongoose.models.UserSession || mongoose.model("UserSession", userSessionSchema);