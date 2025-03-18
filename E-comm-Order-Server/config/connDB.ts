import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
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

    isSupported().then((supported) => {
        if (supported) {
            getAnalytics(app);
        } else {
            console.log('Firebase Analytics is not supported in this environment.');
        }
    });
} else {
    app = getApps()[0];
    db = getFirestore(app);
}

console.log("Firebase Connected.........");
export { db };