import {writeBatch , serverTimestamp} from 'firebase/firestore'
import { tz} from 'moment-timezone'
import {db} from '../../../firebase'

// postDocument
import {postNewDocument} from '../post/postDocument'

export default async function postDocumentSetupOnSugnUp(user:any){ 


    
   
    const batch = writeBatch(db); 


    
 
     // in providers too man
     // add type signend up on provider so you add the document onece
        await postNewDocument({collectionSelected:'users',documentName:user.uid,
        inputObject:{email:user.email,verifiedEmail:user.emailVerified},useBatch:batch})
      
  
        // create first team
        const browserDate = tz.guess()
      const createdTeam =  await postNewDocument({collectionSelected:'teams',
        inputObject:{memebersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
      
        name:'My First Team' ,logoUrl:'',identified:'MFT' , timezone:browserDate
      }
        ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc
         
   
        // create first Issue 
     
        const createdIssue =  await postNewDocument({collectionSelected:`teams/${createdTeam.id}/issues`,
        inputObject:{ 
          title:'Wellcome to reduce issues',
          content:{
            pictureListUrl:[],// here are the urls that are gonna be stored in firebase ,
            text:'Fell free to explore the app'
          },
          status:{name:'Backlog',icon:'backlog'},
          priority:{name:'Low',icon:'low'},
          label:{name:'Feature',icon:'blueDot'},
          dueDate:'',
          blockByIssueId:'',
          blockingIssueId:'',
  
          assigneeToId:user.uid,
          
          updatedAt:serverTimestamp(),
  
  
        }
        ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc
    
      // create issue activity tracker (with two tipes , comment and action , action for ex User Name created Issue 5 days ago)
    
      await postNewDocument({collectionSelected:`teams/${createdTeam.id}/issues/${createdIssue.id}/activites`,
      inputObject:{ 
        type:'action',
        actionType:'create',
        creatorId:'app',// if no id then the app has created the issue
        
      },useBatch:batch})
  
   
        // bind team to the owner
  
        await postNewDocument({collectionSelected:'users',documentName:user.uid,
        inputObject:{ 
          teams:{[createdTeam.id]:{ role:'Owner' ,invitedAt:serverTimestamp(),acceptedAt:serverTimestamp()
           }
          }
        },useBatch:batch}) 

        await batch.commit()
}