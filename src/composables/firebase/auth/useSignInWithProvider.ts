import {
  
    FacebookAuthProvider,
    GoogleAuthProvider,
    TwitterAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    OAuthProvider,
    signInWithRedirect,getRedirectResult
   
  } from 'firebase/auth';

  import {auth} from '../../../firebase'
 



export async function signInWithProviderFirebase({
    providerName,
   
   
   
   
  }: {
    providerName: string;
 
  
   
    
   
  }) {
   
    const redirectOrPopUp = async (provider: any) => {
    

      if (window.screen.width > 768) {
        // signInWithPopup(auth, provider)
        //   .then(async (result: any) => {
        //     const credential = Get_credentials_from_diffrent_providers(provider_name, result);
        //     if (credential) {
        //       const accessToken = credential.accessToken;
        //       const idToken = credential.idToken;
        //       const user_login_providerId = credential.providerId;
        //       const index_of_providerId = user_login_providerId.indexOf('.');
        //       this.sign_in_with_provider =
        //         index_of_providerId !== -1
        //           ? user_login_providerId.slice(0, index_of_providerId)
        //           : user_login_providerId;
        //       console.log(
        //         'my credentials are in pop up ',
        //         credential,
        //         'oooooo',
        //         auth.currentUser,
        //         'sound ',
        //         user_login_providerId
        //       );
        //       callBackUserUpdate();
        //       this.Remember_auth_user_info({ user: true });

        //       // return true
        //     }

        //     // update cookies here
        //     // firebase.auth().setPersistence(remember_me)
        //     // this.Remember_auth_user_info({ credential })
        //     // const currentUser: any | null = auth.currentUser
        //     await this.set_auth_session_length_custom_claims(); // set sign in session
        //     // if (typeof callbackOnUserLogedWithProviderWindow === 'function')callbackOnUserLogedWithProviderWindow({ currentUser })
        //     return true;
        //   })
        //   .catch((Error) => {
        //     // if (typeof callbackOnUserLogedWithProviderWindow === 'function')callbackOnUserLogedWithProviderWindow({ currentUser: null })
       
        //     return false;
        //   }); 


      
        const result = await signInWithPopup(auth, provider);

        // The signed-in user info.
        const user = result.user;


        return {data:user,error:false};
      }

    //   signInWithRedirect(auth, provider)
    //     .then(async (result: any) => {
    //       const credential:any = Get_credentials_from_diffrent_providers(provider_name, result);
    //       if (credential) {
            
          
    //         // set persistence here if you want
    //         callBackUserUpdate(credential);
            
         
           
           

          
    //       }

          
    //       return true;
    //     })
    //     .catch((Error: Error) => {
    //       // if (typeof callbackOnUserLogedWithProviderWindow === 'function')callbackOnUserLogedWithProviderWindow({ currentUser: null })
    //       Handle_Console_Errors_From_Pop_Up_And_redirect(Error, provider_name); // placeholder error console.log handler
    //       console.log(`place holder sign in with ${provider_name} provider Error!! , and the error:::`, Error);
    //       return false;
    //     });
 ////     
         
            await signInWithRedirect(auth, provider);
// This will trigger a full page redirect away from your app

// After returning from the redirect when your app initializes you can obtain the result
            const result = await getRedirectResult(auth);
            if (result) {
            // This is the signed-in user
            const user = result.user;
            // This gives you a Facebook Access Token.
            // const credential = provider.credentialFromResult(auth, result);
            return {data:user,error:false}
            //   const token = credential.accessToken;
            } 

//////
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
     const result =  await redirectOrPopUp(fit_provider);
     return result
    }catch(err:any){
      return{error:true,message:err.message}
    } 
  }
    // return {data:res.user,error:false}
 




// un used
//   async function   getProviderCredentials(providerName: string, resultCredentialFromParameter: any) {
//     let resultedCredentials: any;
//     const credentialsProvidersListPopUpMethod: {
//       [key: string]: () => void;
//     } = {
//       google: () => {
//         resultedCredentials = GoogleAuthProvider.credentialFromResult(resultCredentialFromParameter);
//       },
//       twitter: () => {
//         resultedCredentials = TwitterAuthProvider.credentialFromResult(resultCredentialFromParameter);
//       },
//       github: () => {
//         resultedCredentials = GithubAuthProvider.credentialFromResult(resultCredentialFromParameter);
//       },
//       facebook: () => {
//         resultedCredentials = FacebookAuthProvider.credentialFromResult(resultCredentialFromParameter);
//       },
//       apple: () => {
//         resultedCredentials = OAuthProvider.credentialFromResult(resultCredentialFromParameter);
//       },
//     };
//     credentialsProvidersListPopUpMethod[providerName]();

//     return resultedCredentials;
//   }