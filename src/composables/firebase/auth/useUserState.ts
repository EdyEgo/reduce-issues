import {auth} from '../../../firebase'
import { onAuthStateChanged } from 'firebase/auth'

export  const watchUserStateFirebase =  ( setCurrentUser:(user:any)=>void)=>{
    
   

    const unsubscribe = onAuthStateChanged(auth,(user)=>{
        setCurrentUser(user)
      })

      
  

      return {data:unsubscribe,error:false}
}