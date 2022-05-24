import {writeBatch , serverTimestamp} from 'firebase/firestore'
import { tz} from 'moment-timezone'
import {db} from '../../../firebase'

// postDocument
import {postNewDocument} from '../post/postDocument'

export default async function postDocumentSetupOnSugnUp(user:any,userObject:{firstName:string,lastName:string,createdUserEmail:string | null,createdUidUser:string}){ 

  const {createdUserEmail,firstName,lastName,createdUidUser} = userObject
    
   
    const batch = writeBatch(db); 


     
    await postNewDocument({
      collectionSelected: 'users', documentName: createdUidUser, inputObject: { 
          emailIsVerified: false,
          email: createdUserEmail ,
          firstName,
          lastName
         },useBatch:batch
    }) 

  
        
     let collectionSelectedPath = 'workspaces'


        //////////// 


     // create first workspace 

     const browserDate = tz.guess()//timezone
      const createdWorkSpace =  await postNewDocument({collectionSelected:'workspaces',
        inputObject:{
      
        name:'My First Workspace' ,photoURL:null,identified:'MFW' ,
        labels:[{name:'Feature',icon:'purpleDot',},{name:'Improvement',icon:'blueDot'},{name:'Bug',icon:'redDot'} ]
        ,timezone:browserDate , workspaceURL:'myfirst' , 
        membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}}
      }
        ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc

  
       // // create first team 

       collectionSelectedPath = `workspaces/${createdWorkSpace.id}/teams`
     
      const createdTeam =  await postNewDocument({collectionSelected:collectionSelectedPath,
        inputObject:{membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
      
        name:'My First Team' ,photoURL:null,identified:'MFT' , timezone:browserDate
      }
        ,useAddDocument:true,useBatch:batch}) 
         
        collectionSelectedPath +=  `/${createdTeam.id}/issues`
        // create first Issue 
     
        const createdIssue =  await postNewDocument({collectionSelected:collectionSelectedPath,
        inputObject:{ 
          title:'Wellcome to reduce issues',
          content:{
            pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
            text:'Fell free to explore the app'
          },
          status:{name:'Backlog',icon:'backlog'},
          priority:{name:'Low',icon:'low'},
          label:null,
          dueDate:'',
          blockByIssueId:'',
          blockingIssueId:'',
  
          assignedToUserId:user.uid,
          
          updatedAt:serverTimestamp(),
  
  
        }
        ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc
    
      // create issue activity tracker (with two tipes , comment and action , action for ex User Name created Issue 5 days ago)
      collectionSelectedPath += `/${createdIssue.id}/activites`
      await postNewDocument({collectionSelected:collectionSelectedPath,
      inputObject:{ 
        type:'action',
        actionType:'create',
        creatorId:'app',// if no id then the app has created the issue
        
      },useBatch:batch})
  
   
        // bind team and workspace  to the owner
  
        await postNewDocument({collectionSelected:'users',documentName:user.uid,
        inputObject:{ 
          photoURL:user.photoURL,
          
          workSpaces:{[createdWorkSpace.id]:{ role:'Owner' }},
          workSpaceSelected:{id:createdWorkSpace.id} // maybe add this one too later : tabSelected:{name:'my-issues'} 
        },useBatch:batch})  
     
        //// create second team in first workspace -->


        collectionSelectedPath = `workspaces/${createdWorkSpace.id}/teams`
     
        const secondCreatedTeam =  await postNewDocument({collectionSelected:collectionSelectedPath,
          inputObject:{membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
        
          name:'My Second Team' ,photoURL:null,identified:'MST' , timezone:browserDate
        }
          ,useAddDocument:true,useBatch:batch}) 
           
          collectionSelectedPath +=  `/${secondCreatedTeam.id}/issues`
          // create second  Issue in first workspace 
       
          const createdIssueToSecondTeam  =  await postNewDocument({collectionSelected:collectionSelectedPath,
          inputObject:{ 
            title:'Wellcome , this is your second team',
            content:{
              pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
              text:'Fell free to explore the app'
            },
            status:{name:'Backlog',icon:'backlog'},
            priority:{name:'Low',icon:'low'},
            label:null,
            dueDate:'',
            blockByIssueId:'',
            blockingIssueId:'',
    
            assignedToUserId:user.uid,
            
            updatedAt:serverTimestamp(),
    
    
          }
          ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc
      
        // create issue activity tracker (with two tipes , comment and action , action for ex User Name created Issue 5 days ago)
        collectionSelectedPath += `/${createdIssueToSecondTeam.id}/activites`
        await postNewDocument({collectionSelected:collectionSelectedPath,
        inputObject:{ 
          type:'action',
          actionType:'create',
          creatorId:'app',// if no id then the app has created the issue
          
        },useBatch:batch})
    
   //// create second team in first workspace <--




        /// my second workspace -->
        
        const createdWorkSpaceSec =  await postNewDocument({collectionSelected:'workspaces',
        inputObject:{
      
        name:'My Second Workspace' ,photoURL:null,identified:'MSW' ,
        labels:[{name:'Feature',icon:'purpleDot',},{name:'Improvement',icon:'blueDot'},{name:'Bug',icon:'redDot'} ], timezone:browserDate , workspaceURL:'mysecond' , 
        membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}}
      }
        ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc

  
       // // create second workspace first team 

       collectionSelectedPath = `workspaces/${createdWorkSpaceSec.id}/teams`
     
      const createdTeamSec =  await postNewDocument({collectionSelected:collectionSelectedPath,
        inputObject:{membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
      
        name:'My Second Team' ,photoURL:null,identified:'MST' , timezone:browserDate
      }
        ,useAddDocument:true,useBatch:batch}) 
         
        collectionSelectedPath +=  `/${createdTeamSec.id}/issues`
        // create first Issue in second workspace
     
        const createdIssueSec =  await postNewDocument({collectionSelected:collectionSelectedPath,
        inputObject:{ 
          title:'Wellcome to reduce issues again',
          content:{
            pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
            text:'Fell free to explore the app,..again :)'
          },
          status:{name:'Backlog',icon:'backlog'},
          priority:{name:'Low',icon:'low'},
          label:null,
          dueDate:'',
          blockByIssueId:'',
          blockingIssueId:'',
  
          assignedToUserId:user.uid,
          
          updatedAt:serverTimestamp(),
  
  
        }
        ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc
    
      // create issue activity tracker (with two tipes , comment and action , action for ex User Name created Issue 5 days ago)
      collectionSelectedPath += `/${createdIssueSec.id}/activites`
      await postNewDocument({collectionSelected:collectionSelectedPath,
      inputObject:{ 
        type:'action',
        actionType:'create',
        creatorId:'app',// if no id then the app has created the issue
        
      },useBatch:batch})
  
   
        // bind team and workspace  to the owner
  
        await postNewDocument({collectionSelected:'users',documentName:user.uid,
        inputObject:{ 
          
          workSpaces:{[createdWorkSpaceSec.id]:{ role:'Owner' }},
          
        },useBatch:batch}) 

        /// <--- second workspace

        await batch.commit()
}