import {
  
    FacebookAuthProvider,
    GoogleAuthProvider,
    TwitterAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    OAuthProvider,
    signInWithRedirect,getRedirectResult
   
  } from 'firebase/auth';
  import {writeBatch} from 'firebase/firestore'
  import {auth,db} from '../../../firebase'
  import {postNewDocument} from '../post/postDocument'
  import setupOnSignUp from '../post/postDocumentSetupOnSignUp'



export async function signInWithProviderFirebase({
    providerName,
   
   signUp
   
   
  }: {
    providerName: string;
 
  signUp?:boolean
   
    
   
  }) {
   
    const redirectOrPopUp = async (provider: any) => {
    

      if (window.screen.width > 768) {
       


      
        const result = await signInWithPopup(auth, provider);

        // The signed-in user info.
        const user = result.user;
   
        if(signUp){
         const splitName:any = user.displayName?.split(' ')

             await setupOnSignUp(user,{createdUidUser:user.uid,createdUserEmail:user.email,firstName:splitName[0] ,lastName:splitName[1]})
         }

        return {data:user,error:false};
      }

  
            await signInWithRedirect(auth, provider);
// This will trigger a full page redirect away from your app

// After returning from the redirect when your app initializes you can obtain the result
            const result = await getRedirectResult(auth);
            if (result) {
            // This is the signed-in user
            const user = result.user;
            // This gives you a Facebook Access Token.
            // const credential = provider.credentialFromResult(auth, result);

            if(signUp){
              

              const splitName:any = user.displayName?.split(' ')

              await setupOnSignUp(user,{createdUidUser:user.uid,createdUserEmail:user.email,firstName:splitName[0] ,lastName:splitName[1]})
             }

            return {data:user,error:false}
           
            } 


    };

    const authCreateFitProvider: { [key: string]: () => void } = {
      google: () => {
        const provider = new GoogleAuthProvider();
        return provider;
      },
      twitter: () => {
        const provider = new TwitterAuthProvider();
        return provider;
      },
      github: () => {
        const provider = new GithubAuthProvider();
        return provider;
      },
      facebook: () => {
        const provider = new FacebookAuthProvider();
        return provider;
      },
      apple: () => {
        const provider = new OAuthProvider('apple.com');
        return provider;
      },
    };

    const fit_provider = authCreateFitProvider[providerName]();

    try{
     const res =  await redirectOrPopUp(fit_provider);

     return res
    }catch(err:any){
      return{error:true,message:err.message}
    } 
  }
