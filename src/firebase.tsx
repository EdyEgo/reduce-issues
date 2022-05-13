import { initializeApp } from 'firebase/app';
import { getFirestore ,serverTimestamp } from 'firebase/firestore';
// import { getAnalytics, logEvent } from 'firebase/analytics'// later
import { getAuth } from 'firebase/auth';
// import {getFunctions} from 'firebase/functions' // nope no need for you 

//import { isPropertyAccessChain } from "typescript";
// dot env local must be in  your root folder
const firebaseConfig = { 
    apiKey: "AIzaSyBL1mUPzkwEBewJY_hb3JJQH_PHSjMg8Bo",
    authDomain: "reduce-issues.firebaseapp.com",
    projectId: "reduce-issues",
    storageBucket: "reduce-issues.appspot.com",
    messagingSenderId: "855370941752",
    appId: "1:855370941752:web:4e1f16ecb678badd9badcd",
    measurementId: "G-G97Q0K6K7G"
}



initializeApp(firebaseConfig);

// init services
const db = getFirestore()
// const functions_instance = getFunctions() // no ,no, no, no 
// const analytics = getAnalytics()
const auth = getAuth()

// logEvent(analytics, 'notification_received')
export { db, auth ,  serverTimestamp };



