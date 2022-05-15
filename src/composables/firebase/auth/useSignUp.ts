


// firebase imports
import {auth} from '../../../firebase'
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth'

// postDocument
import {postNewDocument} from '../post/postDocument'









export  const signUp = async({ email, firstName,lastName, password }: { email: string; password: string; firstName: string, lastName: string }) => {
 

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res)return{error:true,message:'Could not complete signup'}
      
      
 if(auth.currentUser != null){ // update user display name
  await updateProfile(auth.currentUser,{
    displayName: `${firstName}  ${lastName}`,
  })
 }

    const created_uid_user = res.user.uid
    const created_user_email = res.user.email


// this one is working but was adding a member role , we don t need that really--->
    if (res) {
      await postNewDocument({
        collectionSelected: 'users', documentName: created_uid_user, inputObject: { email: created_user_email ,displayName:`${firstName} ${lastName[0]}.`},
      })
       

    }



 
    return res.user // created user return 
  }
  catch (err: any) {
    return{error:true,message:err.message}
   
  }
}