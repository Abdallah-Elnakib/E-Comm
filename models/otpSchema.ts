import mongoose, { Schema, Document } from 'mongoose';

interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema: Schema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1m' },
});

export const Otp = mongoose.model<IOtp>('Otp', otpSchema);