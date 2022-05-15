import { signOut } from 'firebase/auth';
import {auth} from '../../../firebase'

export const signOutFirebase = async ()=>{
  await  signOut(auth)
  return {error:false,data:null}
}