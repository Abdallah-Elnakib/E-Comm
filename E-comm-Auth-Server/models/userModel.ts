import mongoose, { Document, Schema } from "mongoose";

interface IAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    address: IAddress[];
    password: string;
    position: string;
    resetPasswordToken?: string;
}

const addressSchema: Schema = new mongoose.Schema({
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,    
    },
    zip: {
        type: String,
    }
});

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
        type: [addressSchema],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true,
    },
    resetPasswordToken: {
        type: String,
    }
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>('User', userSchema);