import { initializeApp, getApps } from "firebase/app";
import dotenv from 'dotenv';
dotenv.config();

export const connDB = async() => {
    const firebaseConfig = {
        apiKey: process.env.APIKEY,
        authDomain: process.env.AUTHDOMAIN,
        projectId: process.env.PROJECTID,
        storageBucket: process.env.STORAGEBUCKET,
        messagingSenderId: process.env.MESSAGINGSENDERID,
        appId: process.env.APPID,
        measurementId: process.env.MEASUREMENTID
    };

    let app;
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApps()[0];
    }

    console.log("DataBase Firebase Connected.........");
    return app;
}