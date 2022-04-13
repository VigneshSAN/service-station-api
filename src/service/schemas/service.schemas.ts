import { Schema } from "mongoose";

export const ServiceSchema = new Schema({
    organization: { _id: String, name: String },
    customer: { _id: String, name: String },
    vehicle: { _id: String, vehicle_number: String },
    service_list: { type: Array },
    bill_amount: { type: Number, required: true },
    discount: { type: Number, required: true },
    bill_total: { type: Number, required: true },
    bill_status: { type: String, default: 'Unpaid' },
    bill_mode: { type: String, default: 'Cash' },
    is_collapsed: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});