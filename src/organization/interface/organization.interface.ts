import { Document } from "mongoose";

export interface Organization extends Document {
    name: string;
    email: string;
    email_verified: boolean;
    mobile: string;
    mobile_verified: boolean;
    createdAt: Date;
}