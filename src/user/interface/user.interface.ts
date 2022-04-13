import { Document } from "mongoose";

export interface User extends Document {
    first_name: string;
    last_name: string;
    user_type: string;
    organization: any;
    email_verified: boolean;
    mobile_verified: boolean;
    is_collapsed: boolean;
    createdAt: Date;
}
