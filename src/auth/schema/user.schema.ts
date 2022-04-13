import * as mongoose from 'mongoose';

export const UserAuthSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
});