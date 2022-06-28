
import { signUpFirebase} from '../composables/firebase/auth/useSignUp'
import { signInFirebase} from '../composables/firebase/auth/useSignIn'
import  {signInWithProviderFirebase} from '../composables/firebase/auth/useSignInWithProvider'
import {signOutFirebase} from '../composables/firebase/auth/useSignOut'
import { watchUserStateFirebase} from '../composables/firebase/auth/useUserState'


// we use firebase as  backend

export async function signUp({ email, firstName,lastName, password }:
    { email:string, firstName:string,lastName:string, password:string }){
   
        try{
            return await signUpFirebase({ email, firstName,lastName, password })
        }catch(e:any){
          return {error:true,message:'Could not sign up !'}
        }
  
}

export  function userState(setCurrentUser:(user:any)=>void){
    // try{
        return  watchUserStateFirebase(setCurrentUser)
    // }catch(e:any){
    //   return {error:true,message:e.message}
    // }
}

export async function signIn({email,password,remember}:{email:string,password:string,remember?:string}){
  try{
      return await signInFirebase(email,password,remember)
  }catch(e:any){
    return {error:true,message:e.message}
  }
}

export async function signOut(){
     try{
        return  await signOutFirebase()
     }catch(e:any){
      return {error:true,message:e.message}
     }
}

export async function signInWithProvider(providerName:string,signUp?:boolean){
   
   try{
    return await signInWithProviderFirebase({providerName,signUp}) 
}catch(e:any){
  return {error:true,message:e.message}
}
}