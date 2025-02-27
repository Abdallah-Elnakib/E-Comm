import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connDB = async (): Promise<void> => {
    try {
        const dbUrl: string | undefined = process.env.DATABASEURL;
        if (!dbUrl) {
            throw new Error("DATABASEURL is not defined in the environment variables");
        }
        await mongoose.connect(dbUrl);
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

export { connDB };