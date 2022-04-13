import { Document } from "mongoose";

export interface Customer extends Document {
    name: string;
    email: string;
    mobile: string;
    organization: string;
    is_collapsed: boolean;
    createdBy: string;
    createdAt: Date;
}