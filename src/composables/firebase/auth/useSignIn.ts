

// firebase imports
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence  } from 'firebase/auth';
import {writeBatch} from 'firebase/firestore'
import {postNewDocument } from '../post/postDocument'
import {auth,db} from '../../../firebase'



export const signInFirebase = async (email: string, password: string, rememberMe = 'local') => {
  
 

  try { // is user is not verified , sign out and redirect to info page
    const res = await signInWithEmailAndPassword(auth, email, password);

    if (!res) return{error:true,message:'Could not complete sign in'}
    

    if (rememberMe === 'session') await setPersistence(auth, browserSessionPersistence);
    // post registered userd object to firestore 

   
   
    return {data:res.user,error:false}
  } catch (err: any) {
    
    return{error:true,message:err.message}
  }
};