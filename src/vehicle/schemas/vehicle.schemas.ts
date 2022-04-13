import { Schema } from "mongoose";

export const VehicleSchema = new Schema({
    vehicle_type: { type: String, required: true, default: '2 Wheeler' },
    vehicle_name: { type: String, required: true },
    vehicle_number: { type: String, unique: true, required: true },
    organization: { _id: String, name: String },
    customer: { _id: String, name: String },
    is_collapsed: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});