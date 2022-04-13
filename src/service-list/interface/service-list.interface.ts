import { Document } from "mongoose";

export interface ServiceList extends Document {
    name: string;
    amount: string;
    organization: any;
    is_collapsed: boolean;
    createdAt: Date;
}
