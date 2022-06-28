import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics, logEvent } from 'firebase/analytics'// later
import { getAuth } from "firebase/auth";
// import {getFunctions} from 'firebase/functions' // nope no need for you

//import { isPropertyAccessChain } from "typescript";
// dot env local must be in  your root folder
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDERID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
};

initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const storage = getStorage();
// const functions_instance = getFunctions() // no ,no, no, no
// const analytics = getAnalytics()
const auth = getAuth();

// logEvent(analytics, 'notification_received')
export { db, storage, auth, serverTimestamp };
