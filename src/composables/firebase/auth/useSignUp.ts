


// firebase imports
import {auth} from '../../../firebase'
import { createUserWithEmailAndPassword,updateProfile ,  sendEmailVerification } from 'firebase/auth' 
import setupOnSignUp from '../post/postDocumentSetupOnSignUp'


// postDocument
import {postNewDocument} from '../post/postDocument'










export  const signUpFirebase = async({ email, firstName,lastName, password }: { email: string; password: string; firstName: string, lastName: string }) => {
 

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res)return{error:true,message:'Could not complete sign up'}
      
      
 if(auth.currentUser != null){ // update user display name
  await updateProfile(auth.currentUser,{
    displayName: `${firstName}  ${lastName}`,
  })
 } 
  sendEmailVerification(res.user)

    const createdUidUser = res.user.uid
    const createdUserEmail = res.user.email



  
      // await postNewDocument({
      //   collectionSelected: 'users', documentName: createdUidUser, inputObject: { 
      //       emailIsVerified: false,
      //       email: createdUserEmail ,
      //       firstName,
      //       lastName
      //      },
      // })  

      await setupOnSignUp(res.user,{createdUserEmail,firstName,lastName,createdUidUser})

 
  



 
    return {error:false,data:res.user} // created user return 
  }
  catch (err: any) {
    return{error:true,message:err.message}
   
  }
}