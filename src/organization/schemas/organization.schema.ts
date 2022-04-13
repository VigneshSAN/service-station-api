import { Schema } from "mongoose";

export const OrganizationSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    email_verified: { type: Boolean, default: false },
    mobile: { type: String, unique: true, required: true },
    mobile_verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

OrganizationSchema.index({'$**': 'text'});