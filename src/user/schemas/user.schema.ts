import { Schema } from "mongoose";

export const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    user_type: { type: String, required: true },
    organization: { _id: String, name: String },
    email: { type: String, unique: true, required: true },
    email_verified: { type: Boolean, default: false },
    mobile: { type: String, unique: true, required: true },
    mobile_verified: { type: Boolean, default: false },
    is_collapsed: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

UserSchema.index({'$**': 'text'});