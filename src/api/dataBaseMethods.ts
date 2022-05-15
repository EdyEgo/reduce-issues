
import {signUp as signUpFirebase} from '../composables/firebase/auth/useSignUp'
import {watchUserState as watchUserStateFirebase} from '../composables/firebase/auth/useUserState'
import { } from '../composables/firebase/post/postDocument'

// we use firebase as  backend

export async function signUp({ email, firstName,lastName, password }:
    { email:string, firstName:string,lastName:string, password:string }){
   
        try{
            return await signUpFirebase({ email, firstName,lastName, password })
        }catch(e){
          return {error:true,message:'Could not sign up !'}
        }
  
}

export async function userState(setCurrentUser:(user:any)=>void){
    try{
        return  watchUserStateFirebase(setCurrentUser)
    }catch(e:any){
      return {error:true,message:e.message}
    }
}