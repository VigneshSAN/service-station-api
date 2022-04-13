import { Schema } from "mongoose";

export const ServiceListSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: String, required: true },
    organization: { _id: String, name: String },
    is_collapsed: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

ServiceListSchema.index({'$**': 'text'});