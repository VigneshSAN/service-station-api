import { Document } from "mongoose";

export interface Vehicle extends Document {
    vehicle_type: string;
    vehicle_name: string;
    vehicle_number: string;
    organization: string;
    customer: string;
    is_collapsed: boolean;
    createdAt: Date;
}