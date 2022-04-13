import { Schema } from "mongoose";

export const CustomerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    mobile: { type: String, unique: true, required: true },
    organization: { _id: String, name: String },
    is_collapsed: { type: Boolean, default: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});