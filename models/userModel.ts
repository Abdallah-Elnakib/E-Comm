import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    address: string[];
    password: string;
    position: string;
}

const userSchema: Schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: [String],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>('User', userSchema);