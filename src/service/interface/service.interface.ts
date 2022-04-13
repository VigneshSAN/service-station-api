import { Document } from "mongoose";

export interface Service extends Document {
    customer: string;
    vehicle: string;
    organization: string;
    service_list: any;
    bill_amount: string;
    discount: string;
    bill_total: string;
    bill_status: string;
    bill_mode: string;
    is_collapsed: boolean;
    createdAt: Date;
}

