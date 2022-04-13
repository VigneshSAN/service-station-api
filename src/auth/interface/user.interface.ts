import { Document } from 'mongoose';

export interface UserAuth extends Document {
  readonly username: string;
  readonly password: string;
}