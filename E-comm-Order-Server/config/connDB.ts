import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID,
};

let app: FirebaseApp;
let db: Firestore;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);

    
} else {
    app = getApps()[0];
    db = getFirestore(app);
}

console.log("Firebase Connected.........");
export { db };