import {writeBatch , serverTimestamp,collection, doc } from 'firebase/firestore'
import { tz} from 'moment-timezone'
import {db} from '../../../firebase'

// postDocument
import {postNewDocument} from '../post/postDocument'



export default async function postDocumentSetupOnSignUp(user:any,userObject:{firstName:string,lastName:string,createdUserEmail:string | null,createdUidUser:string}){ 

  const {createdUserEmail,firstName,lastName,createdUidUser} = userObject
    
   
    // const batch = writeBatch(db); 
try{

     
    await postNewDocument({
      collectionSelected: 'users', documentName: createdUidUser, inputObject: { 
          emailIsVerified: false,
          email: createdUserEmail ,
          firstName,
          lastName
         }
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
        ,useAddDocument:true}) //  setDoc does not return the doc only the addDoc

  
       // // create first team 

       collectionSelectedPath = `workspaces/${createdWorkSpace.id}/teams`
     
      const createdTeam =  await postNewDocument({collectionSelected:collectionSelectedPath,
        inputObject:{issuesNumber:1,membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
      
        name:'My First Team' ,photoURL:null,identified:'MFT' , timezone:browserDate
      }
        ,useAddDocument:true}) 
         
        collectionSelectedPath +=  `/${createdTeam.id}/issues`
        // create first Issue 
     
        // const createdIssue =  await postNewDocument({collectionSelected:collectionSelectedPath,
        // inputObject:{ 
        //   title:'Wellcome to reduce issues',
        //   content:{
        //     pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
        //     text:'Fell free to explore the app'
        //   },
        //   status:{name:'Backlog',icon:'backlog'},
        //   priority:{name:'Low',icon:'priorityLow'},
        //   label:null,
        //   dueDate:'',
        //   blockByIssueId:'',
        //   blockingIssueId:'',
  
        //   assignedToUserId:user.uid,
          
        //   updatedAt:serverTimestamp(),
  
  
        // }
        // ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc



        const createdIssue =  await postNewDocument({collectionSelected:collectionSelectedPath,
          inputObject:{ 
            title:'Wellcome to reduce issues',
            content:{
              pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
              text:'Fell free to explore the app'
            },
            status:{name:'Backlog',icon:'backlog'},
            priority:{name:'Low',icon:'priorityLow'},
            label:null,
            dueDate:'',
            blockByIssueId:'',
            blockingIssueId:'',
            identified:"MFT-0",
            assignedToUserId:user.uid,
            
            updatedAt:serverTimestamp(),
            activity:[{
              type:'action',
              actionType:'create',
              creatorId:null,// if no id then the app has created the issue
              registeredAt:new Date(),
              
            }]
    
    
          },useAddDocument:true
          }) //  setDoc does not return the doc only the addDoc
    
      // create issue activity tracker (with two tipes , comment and action , action for ex User Name created Issue 5 days ago)
      collectionSelectedPath += `/${createdIssue.id}/activites`
      // await postNewDocument({collectionSelected:collectionSelectedPath,
      // inputObject:{ 
      //   type:'action',
      //   actionType:'create',
      //   creatorId:null// if no id then the app has created the issue
        
      // }})
  
   
        // bind team and workspace  to the owner
  
        await postNewDocument({collectionSelected:'users',documentName:user.uid,
        inputObject:{ 
          photoURL:user.photoURL,
          
          workSpaces:{[createdWorkSpace.id]:{ role:'Owner' }},
          workSpaceSelected:{id:createdWorkSpace.id} // maybe add this one too later : tabSelected:{name:'my-issues'} 
        }})  
     
        //// create second team in first workspace -->


        collectionSelectedPath = `workspaces/${createdWorkSpace.id}/teams`
     
        const secondCreatedTeam =  await postNewDocument({collectionSelected:collectionSelectedPath,
          inputObject:{issuesNumber:1,membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
        
          name:'My Second Team' ,photoURL:null,identified:'MST' , timezone:browserDate
        }
          ,useAddDocument:true}) 
           
          collectionSelectedPath +=  `/${secondCreatedTeam.id}/issues`
          // create second  Issue in first workspace 
       
          // const createdIssueToSecondTeam  =  await postNewDocument({collectionSelected:collectionSelectedPath,
          // inputObject:{ 
          //   title:'Wellcome , this is your second team',
          //   content:{
          //     pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
          //     text:'Fell free to explore the app'
          //   },
          //   status:{name:'Backlog',icon:'backlog'},
          //   priority:{name:'Low',icon:'priorityLow'},
          //   label:null,
          //   dueDate:'',
          //   blockByIssueId:'',
          //   blockingIssueId:'',
    
          //   assignedToUserId:user.uid,
            
          //   updatedAt:serverTimestamp(),
    
    
          // }
          // ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc 


          const createdIssueToSecondTeam  =  await postNewDocument({collectionSelected:collectionSelectedPath,
            inputObject:{ 
              title:'Wellcome , this is your second team',
              content:{
                pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
                text:'Fell free to explore the app'
              },
              status:{name:'Backlog',icon:'backlog'},
              priority:{name:'Low',icon:'priorityLow'},
              label:null,
              dueDate:'',
              blockByIssueId:'',
              blockingIssueId:'',
              identified:"MST-0",
              assignedToUserId:user.uid,
              
              updatedAt:serverTimestamp(),
              activity:[{
                type:'action',// may be change
                registeredAt:new Date(),
                action:{
                  iconType:'',
                  actionMessage:'created the issue',
                  fromMessage: null, 
                  toMessage:null
                }
              }]
      
            },useAddDocument:true
            }) //  setDoc does not return the doc only the addDoc
      
        // create issue activity tracker (with two tipes , comment and action , action for ex User Name created Issue 5 days ago)
        collectionSelectedPath += `/${createdIssueToSecondTeam.id}/activites`
        // await postNewDocument({collectionSelected:collectionSelectedPath,
        // inputObject:{ 
        //   type:'action',// may be change
        //   action:{
        //     iconType:'',
        //     actionMessage:'created the issue',
        //     fromMessage: null, 
        //     toMessage:null
        //   },
        //   creatorId:null,// if no id then the app has created the issue
          
        // }})
    
   //// create second team in first workspace <--




        /// my second workspace -->
        
        const createdWorkSpaceSec =  await postNewDocument({collectionSelected:'workspaces',
        inputObject:{
      
        name:'My Second Workspace' ,photoURL:null,identified:'MSW' ,
        labels:[{name:'Feature',icon:'labelFeature',},{name:'Improvement',icon:'labelImprovement'},{name:'Bug',icon:'labelBug'} ], timezone:browserDate , workspaceURL:'mysecond' , 
        membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}}
      }
        ,useAddDocument:true}) //  setDoc does not return the doc only the addDoc

  
       // // create second workspace first team 

       collectionSelectedPath = `workspaces/${createdWorkSpaceSec.id}/teams`
     
      const createdTeamSec =  await postNewDocument({collectionSelected:collectionSelectedPath,
        inputObject:{issuesNumber:1,membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
      
        name:'My Second Team' ,photoURL:null,identified:'MST' , timezone:browserDate
      }
        ,useAddDocument:true}) 
         
        collectionSelectedPath +=  `/${createdTeamSec.id}/issues`
        // create first Issue in second workspace
     
        // const createdIssueSec =  await postNewDocument({collectionSelected:collectionSelectedPath,
        // inputObject:{ 
        //   title:'Wellcome to reduce issues again',
        //   content:{
        //     pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
        //     text:'Fell free to explore the app,..again :)'
        //   },
        //   status:{name:'Backlog',icon:'backlog'},
        //   priority:{name:'Low',icon:'priorityLow'},
        //   label:null,
        //   dueDate:'',
        //   blockByIssueId:'',
        //   blockingIssueId:'',
  
        //   assignedToUserId:user.uid,
          
        //   updatedAt:serverTimestamp(),
  
  
        // }
        // ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc
     
        const createdIssueSec =  await postNewDocument({collectionSelected:collectionSelectedPath,
          inputObject:{ 
            title:'Wellcome to reduce issues again',
            content:{
              pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
              text:'Fell free to explore the app,..again :)'
            },
            status:{name:'Backlog',icon:'backlog'},
            priority:{name:'Low',icon:'priorityLow'},
            label:null,
            dueDate:'',
            blockByIssueId:'',
            blockingIssueId:'',
            identified:"MST-0",
            assignedToUserId:user.uid,
            
            updatedAt:serverTimestamp(),
            activity:[{
              type:'action',
              registeredAt:new Date(),
              actionType:'create',
              creatorId:null,// if no id then the app has created the issue
            }]
    
          },useAddDocument:true
          }) //  setDoc does not return the doc only the addDoc


      // create issue activity tracker (with two tipes , comment and action , action for ex User Name created Issue 5 days ago)
      collectionSelectedPath += `/${createdIssueSec.id}/activites`
      // await postNewDocument({collectionSelected:collectionSelectedPath,
      // inputObject:{ 
      //   type:'action',
      //   actionType:'create',
      //   creatorId:null,// if no id then the app has created the issue
        
      // }})
  
   
        // bind team and workspace  to the owner
  
        await postNewDocument({collectionSelected:'users',documentName:user.uid,
        inputObject:{ 
          
          workSpaces:{[createdWorkSpaceSec.id]:{ role:'Owner' }},
          
        }}) 
      }catch(e:any){
        console.log('my error by ',e , 'and this',e.message)
      }
        /// <--- second workspace

        // await batch.commit()





        ///////
} // is gonna work now




// async function postDocumentSetupOnSignUpBatchOnly(user:any,userObject:{firstName:string,lastName:string,createdUserEmail:string | null,createdUidUser:string}){ 

//   const {createdUserEmail,firstName,lastName,createdUidUser} = userObject
    
   
//     const batch = writeBatch(db); 
//     const browserDate = tz.guess()//timezone

//     console.log('ce palaria mea ',createdUserEmail,firstName,lastName,createdUidUser,browserDate)
//  // create user object 
//  //  doc(collection(db, firstCollectionName, firstDocumentName,secondCollectionName,secondDocumentName,thirdCollectionName)) 

//  const userDocumentRef = doc(collection(db,"users",createdUidUser))
//    const test =  batch.set(userDocumentRef,{emailIsVerified: false,email: createdUserEmail,firstName,lastName})
//   console.log('maica cum masa',test)
//   // create workspace
  
//  const firstWorspaceRef =   doc(collection(db,"workspaces"))
//  batch.set(firstWorspaceRef,{
      
//   name:'My First Workspace' ,photoURL:null,identified:'MFW' ,
//   labels:[{name:'Feature',icon:'purpleDot',},{name:'Improvement',icon:'blueDot'},{name:'Bug',icon:'redDot'} ]
//   ,timezone:browserDate , workspaceURL:'myfirst' , 
//   membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}}
// })

// // create first team 
 
// const firstTeamRef = doc(collection(db,"workspaces",firstWorspaceRef.id,"teams"))

// batch.set(firstTeamRef,{issuesNumber:1,membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
//       name:'My First Team' ,photoURL:null,identified:'MFT' , timezone:browserDate
// })

// // create first issue to the first team 

// const firstIssueToFirstTeamRef = doc(collection(db,"workspaces",firstWorspaceRef.id,"teams",firstTeamRef.id,"issues"))

// batch.set(firstIssueToFirstTeamRef,{ 
//       title:'Wellcome to reduce issues',
//       content:{
//         pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
//         text:'Fell free to explore the app'
//       },
//       status:{name:'Backlog',icon:'backlog'},
//       priority:{name:'Low',icon:'priorityLow'},
//       label:null,
//       dueDate:'',
//       blockByIssueId:'',
//       blockingIssueId:'',
//       identified:"MFT-0",
//       assignedToUserId:user.uid,
      
//       updatedAt:serverTimestamp(),
//       activity:[{
//         type:'action',
//         actionType:'create',
//         creatorId:null,// if no id then the app has created the issue
//         registeredAt:new Date(),
        
//       }]


//     })
 

//     // bind user workspace

//     batch.set(userDocumentRef,{ 
//       photoURL:user.photoURL,
      
//       workSpaces:{[firstWorspaceRef.id]:{ role:'Owner' }},
//       workSpaceSelected:{id:firstWorspaceRef.id} // maybe add this one too later : tabSelected:{name:'my-issues'} 
//     })


//     try{
//       await batch.commit()
//     }catch(e:any){
//       console.log('bruh branch.commit asta e cam panarama',e,'error message',e.message)
//     }
   

// }




//   async function postDocumentSetupOnSignUpOldOne(user:any,userObject:{firstName:string,lastName:string,createdUserEmail:string | null,createdUidUser:string}){ 

//   const {createdUserEmail,firstName,lastName,createdUidUser} = userObject
    
   
//     const batch = writeBatch(db); 


     
//     await postNewDocument({
//       collectionSelected: 'users', documentName: createdUidUser, inputObject: { 
//           emailIsVerified: false,
//           email: createdUserEmail ,
//           firstName,
//           lastName
//          },useBatch:batch
//     }) 

  
        
//      let collectionSelectedPath = 'workspaces'


//         //////////// 


//      // create first workspace 

//      const browserDate = tz.guess()//timezone
//       const createdWorkSpace =  await postNewDocument({collectionSelected:'workspaces',
//         inputObject:{
      
//         name:'My First Workspace' ,photoURL:null,identified:'MFW' ,
//         labels:[{name:'Feature',icon:'purpleDot',},{name:'Improvement',icon:'blueDot'},{name:'Bug',icon:'redDot'} ]
//         ,timezone:browserDate , workspaceURL:'myfirst' , 
//         membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}}
//       }
//         ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc

  
//        // // create first team 

//        collectionSelectedPath = `workspaces/${createdWorkSpace.id}/teams`
     
//       const createdTeam =  await postNewDocument({collectionSelected:collectionSelectedPath,
//         inputObject:{issuesNumber:1,membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
      
//         name:'My First Team' ,photoURL:null,identified:'MFT' , timezone:browserDate
//       }
//         ,useAddDocument:true,useBatch:batch}) 
         
//         collectionSelectedPath +=  `/${createdTeam.id}/issues`
//         // create first Issue 
     
//         // const createdIssue =  await postNewDocument({collectionSelected:collectionSelectedPath,
//         // inputObject:{ 
//         //   title:'Wellcome to reduce issues',
//         //   content:{
//         //     pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
//         //     text:'Fell free to explore the app'
//         //   },
//         //   status:{name:'Backlog',icon:'backlog'},
//         //   priority:{name:'Low',icon:'priorityLow'},
//         //   label:null,
//         //   dueDate:'',
//         //   blockByIssueId:'',
//         //   blockingIssueId:'',
  
//         //   assignedToUserId:user.uid,
          
//         //   updatedAt:serverTimestamp(),
  
  
//         // }
//         // ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc



//         const createdIssue =  await postNewDocument({collectionSelected:collectionSelectedPath,
//           inputObject:{ 
//             title:'Wellcome to reduce issues',
//             content:{
//               pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
//               text:'Fell free to explore the app'
//             },
//             status:{name:'Backlog',icon:'backlog'},
//             priority:{name:'Low',icon:'priorityLow'},
//             label:null,
//             dueDate:'',
//             blockByIssueId:'',
//             blockingIssueId:'',
//             identified:"MFT-0",
//             assignedToUserId:user.uid,
            
//             updatedAt:serverTimestamp(),
//             activity:[{
//               type:'action',
//               actionType:'create',
//               creatorId:null,// if no id then the app has created the issue
//               registeredAt:serverTimestamp(),
              
//             }]
    
    
//           }
//           ,useBatch:batch}) //  setDoc does not return the doc only the addDoc
    
//       // create issue activity tracker (with two tipes , comment and action , action for ex User Name created Issue 5 days ago)
//       collectionSelectedPath += `/${createdIssue.id}/activites`
//       await postNewDocument({collectionSelected:collectionSelectedPath,
//       inputObject:{ 
//         type:'action',
//         actionType:'create',
//         creatorId:null// if no id then the app has created the issue
        
//       },useBatch:batch})
  
   
//         // bind team and workspace  to the owner
  
//         await postNewDocument({collectionSelected:'users',documentName:user.uid,
//         inputObject:{ 
//           photoURL:user.photoURL,
          
//           workSpaces:{[createdWorkSpace.id]:{ role:'Owner' }},
//           workSpaceSelected:{id:createdWorkSpace.id} // maybe add this one too later : tabSelected:{name:'my-issues'} 
//         },useBatch:batch})  
     
//         //// create second team in first workspace -->


//         collectionSelectedPath = `workspaces/${createdWorkSpace.id}/teams`
     
//         const secondCreatedTeam =  await postNewDocument({collectionSelected:collectionSelectedPath,
//           inputObject:{issuesNumber:1,membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
        
//           name:'My Second Team' ,photoURL:null,identified:'MST' , timezone:browserDate
//         }
//           ,useAddDocument:true,useBatch:batch}) 
           
//           collectionSelectedPath +=  `/${secondCreatedTeam.id}/issues`
//           // create second  Issue in first workspace 
       
//           // const createdIssueToSecondTeam  =  await postNewDocument({collectionSelected:collectionSelectedPath,
//           // inputObject:{ 
//           //   title:'Wellcome , this is your second team',
//           //   content:{
//           //     pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
//           //     text:'Fell free to explore the app'
//           //   },
//           //   status:{name:'Backlog',icon:'backlog'},
//           //   priority:{name:'Low',icon:'priorityLow'},
//           //   label:null,
//           //   dueDate:'',
//           //   blockByIssueId:'',
//           //   blockingIssueId:'',
    
//           //   assignedToUserId:user.uid,
            
//           //   updatedAt:serverTimestamp(),
    
    
//           // }
//           // ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc 


//           const createdIssueToSecondTeam  =  await postNewDocument({collectionSelected:collectionSelectedPath,
//             inputObject:{ 
//               title:'Wellcome , this is your second team',
//               content:{
//                 pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
//                 text:'Fell free to explore the app'
//               },
//               status:{name:'Backlog',icon:'backlog'},
//               priority:{name:'Low',icon:'priorityLow'},
//               label:null,
//               dueDate:'',
//               blockByIssueId:'',
//               blockingIssueId:'',
//               identified:"MST-0",
//               assignedToUserId:user.uid,
              
//               updatedAt:serverTimestamp(),
//               activity:[{
//                 type:'action',// may be change
//                 registeredAt:serverTimestamp(),
//                 action:{
//                   iconType:'',
//                   actionMessage:'created the issue',
//                   fromMessage: null, 
//                   toMessage:null
//                 }
//               }]
      
//             }
//             ,useBatch:batch}) //  setDoc does not return the doc only the addDoc
      
//         // create issue activity tracker (with two tipes , comment and action , action for ex User Name created Issue 5 days ago)
//         collectionSelectedPath += `/${createdIssueToSecondTeam.id}/activites`
//         await postNewDocument({collectionSelected:collectionSelectedPath,
//         inputObject:{ 
//           type:'action',// may be change
//           action:{
//             iconType:'',
//             actionMessage:'created the issue',
//             fromMessage: null, 
//             toMessage:null
//           },
//           creatorId:null,// if no id then the app has created the issue
          
//         },useBatch:batch})
    
//    //// create second team in first workspace <--




//         /// my second workspace -->
        
//         const createdWorkSpaceSec =  await postNewDocument({collectionSelected:'workspaces',
//         inputObject:{
      
//         name:'My Second Workspace' ,photoURL:null,identified:'MSW' ,
//         labels:[{name:'Feature',icon:'labelFeature',},{name:'Improvement',icon:'labelImprovement'},{name:'Bug',icon:'labelBug'} ], timezone:browserDate , workspaceURL:'mysecond' , 
//         membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}}
//       }
//         ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc

  
//        // // create second workspace first team 

//        collectionSelectedPath = `workspaces/${createdWorkSpaceSec.id}/teams`
     
//       const createdTeamSec =  await postNewDocument({collectionSelected:collectionSelectedPath,
//         inputObject:{issuesNumber:1,membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
      
//         name:'My Second Team' ,photoURL:null,identified:'MST' , timezone:browserDate
//       }
//         ,useAddDocument:true,useBatch:batch}) 
         
//         collectionSelectedPath +=  `/${createdTeamSec.id}/issues`
//         // create first Issue in second workspace
     
//         // const createdIssueSec =  await postNewDocument({collectionSelected:collectionSelectedPath,
//         // inputObject:{ 
//         //   title:'Wellcome to reduce issues again',
//         //   content:{
//         //     pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
//         //     text:'Fell free to explore the app,..again :)'
//         //   },
//         //   status:{name:'Backlog',icon:'backlog'},
//         //   priority:{name:'Low',icon:'priorityLow'},
//         //   label:null,
//         //   dueDate:'',
//         //   blockByIssueId:'',
//         //   blockingIssueId:'',
  
//         //   assignedToUserId:user.uid,
          
//         //   updatedAt:serverTimestamp(),
  
  
//         // }
//         // ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc
     
//         const createdIssueSec =  await postNewDocument({collectionSelected:collectionSelectedPath,
//           inputObject:{ 
//             title:'Wellcome to reduce issues again',
//             content:{
//               pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
//               text:'Fell free to explore the app,..again :)'
//             },
//             status:{name:'Backlog',icon:'backlog'},
//             priority:{name:'Low',icon:'priorityLow'},
//             label:null,
//             dueDate:'',
//             blockByIssueId:'',
//             blockingIssueId:'',
//             identified:"MST-0",
//             assignedToUserId:user.uid,
            
//             updatedAt:serverTimestamp(),
//             activity:[{
//               type:'action',
//               registeredAt:serverTimestamp(),
//               actionType:'create',
//               creatorId:null,// if no id then the app has created the issue
//             }]
    
//           }
//           ,useBatch:batch}) //  setDoc does not return the doc only the addDoc


//       // create issue activity tracker (with two tipes , comment and action , action for ex User Name created Issue 5 days ago)
//       collectionSelectedPath += `/${createdIssueSec.id}/activites`
//       await postNewDocument({collectionSelected:collectionSelectedPath,
//       inputObject:{ 
//         type:'action',
//         actionType:'create',
//         creatorId:null,// if no id then the app has created the issue
        
//       },useBatch:batch})
  
   
//         // bind team and workspace  to the owner
  
//         await postNewDocument({collectionSelected:'users',documentName:user.uid,
//         inputObject:{ 
          
//           workSpaces:{[createdWorkSpaceSec.id]:{ role:'Owner' }},
          
//         },useBatch:batch}) 

//         /// <--- second workspace

//         await batch.commit()





//         ///////
// }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


















// import {writeBatch , serverTimestamp} from 'firebase/firestore'
// import { tz} from 'moment-timezone'
// import {db} from '../../../firebase'

// // postDocument
// import {postNewDocument,postNewNestedLevelTwoDocumentNoDocumentName} from '../post/postDocument'

// export default async function postDocumentSetupOnSignUp(user:any,userObject:{firstName:string,lastName:string,createdUserEmail:string | null,createdUidUser:string}){ 

//   const {createdUserEmail,firstName,lastName,createdUidUser} = userObject
    
//    console.log('setup is crazy mate wtf , is one of those days',userObject,'bruh',user)
//     const batch = writeBatch(db); 


     
//  const createdUserObject =   await postNewDocument({
//       collectionSelected: 'users', documentName: user.uid, inputObject: { 
//           emailIsVerified: false,
//           email: createdUserEmail ,
//           firstName,
//           lastName
//          },useAddDocument:true,useBatch:batch
//     }) 

  
//         console.log('i have creted za uzer :}',createdUserObject)
//      let collectionSelectedPath = 'workspaces'


//         //////////// 


//      // create first workspace 

//      const browserDate = tz.guess()//timezone
//       const createdWorkSpace =  await postNewDocument({collectionSelected:'workspaces',
//         inputObject:{
      
//         name:'My First Workspace' ,photoURL:null,identified:'MFW' ,
//         labels:[{name:'Feature',icon:'purpleDot',},{name:'Improvement',icon:'blueDot'},{name:'Bug',icon:'redDot'} ]
//         ,timezone:browserDate , workspaceURL:'myfirst' , 
//         membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}}
//       }
//         ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc

  
//        // // create first team 

//        collectionSelectedPath = `workspaces/${createdWorkSpace.id}/teams`
     
//       const createdTeam =  await postNewDocument({collectionSelected:collectionSelectedPath,
//         inputObject:{issuesNumber:1,membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
      
//         name:'My First Team' ,photoURL:null,identified:'MFT' , timezone:browserDate
//       }
//         ,useAddDocument:true,useBatch:batch}) 

//         console.log('ma ce1 createdTeam',createdTeam,'ce workspace',createdWorkSpace)
         
//         collectionSelectedPath +=  `/${createdTeam.id}/issues`

//         console.log('cum  de aci',collectionSelectedPath)
//         // create first Issue 
     
        // const createdIssue =  await postNewDocument({collectionSelected:collectionSelectedPath,
        // inputObject:{ 
        //   title:'Wellcome to reduce issues',
        //   content:{
        //     pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
        //     text:'Fell free to explore the app'
        //   },
        //   status:{name:'Backlog',icon:'backlog'},
        //   priority:{name:'Low',icon:'priorityLow'},
        //   label:null,
        //   dueDate:'',
        //   blockByIssueId:'',
        //   blockingIssueId:'',
        //   identified:"MFT-0",
        //   assignedToUserId:user.uid,
          
        //   updatedAt:serverTimestamp(),
        //   activity:[{
        //     type:'action',
        //     actionType:'create',
        //     creatorId:null,// if no id then the app has created the issue
        //     registeredAt:serverTimestamp(),
            
        //   }]
  
  
        // }
        // ,useBatch:batch}) //  setDoc does not return the doc only the addDoc

//         // const createdIssue = await postNewNestedLevelTwoDocumentNoDocumentName({
//         //   firstCollectionName:"workspaces",firstDocumentName:createdWorkSpace.id,secondCollectionName:"teams",
//         //    secondDocumentName:createdTeam.id,thirdCollectionName:"issues",useBatch:batch,inputObject:{ 
//         //     title:'Wellcome to reduce issues',
//         //     content:{
//         //       pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
//         //       text:'Fell free to explore the app'
//         //     },
//         //     status:{name:'Backlog',icon:'backlog'},
//         //     priority:{name:'Low',icon:'priorityLow'},
//         //     label:null,
//         //     dueDate:'',
//         //     blockByIssueId:'',
//         //     blockingIssueId:'',
//         //     identified:"MFT-0",
//         //     assignedToUserId:user.uid,
            
//         //     updatedAt:serverTimestamp(),
//         //     activity:[{
//         //       type:'action',
//         //       actionType:'create',
//         //       creatorId:null,// if no id then the app has created the issue
//         //       registeredAt:serverTimestamp(),
              
//         //     }]
    
    
//         //   }
//         // })
//         console.log('my issue2',createdIssue)
//       // create issue activity tracker (with two tipes , comment and action , action for ex User Name created Issue 5 days ago)
//       collectionSelectedPath += `/${createdIssue.id}/activites`
//       await postNewDocument({collectionSelected:collectionSelectedPath,
//       inputObject:{ 
//         type:'action',
//         actionType:'create',
//         creatorId:null// if no id then the app has created the issue
        
//       },useBatch:batch})
 
   
//         // bind team and workspace  to the owner
  
//         await postNewDocument({collectionSelected:'users',documentName:user.uid,
//         inputObject:{ 
//           photoURL:user.photoURL,
          
//           workSpaces:{[createdWorkSpace.id]:{ role:'Owner' }},
//           workSpaceSelected:{id:createdWorkSpace.id} // maybe add this one too later : tabSelected:{name:'my-issues'} 
//         },useBatch:batch})  
     
//         //// create second team in first workspace -->


//         collectionSelectedPath = `workspaces/${createdWorkSpace.id}/teams`
     
//         const secondCreatedTeam =  await postNewDocument({collectionSelected:collectionSelectedPath,
//           inputObject:{issuesNumber:1,membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
        
//           name:'My Second Team' ,photoURL:null,identified:'MST' , timezone:browserDate
//         }
//           ,useAddDocument:true,useBatch:batch}) 

//           console.log('ma ce1 secondCreatedTeam',secondCreatedTeam)
           
//           collectionSelectedPath +=  `/${secondCreatedTeam.id}/issues`
//           // create second  Issue in first workspace 
       
          // const createdIssueToSecondTeam  =  await postNewDocument({collectionSelected:collectionSelectedPath,
          // inputObject:{ 
          //   title:'Wellcome , this is your second team',
          //   content:{
          //     pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
          //     text:'Fell free to explore the app'
          //   },
          //   status:{name:'Backlog',icon:'backlog'},
          //   priority:{name:'Low',icon:'priorityLow'},
          //   label:null,
          //   dueDate:'',
          //   blockByIssueId:'',
          //   blockingIssueId:'',
          //   identified:"MST-0",
          //   assignedToUserId:user.uid,
            
          //   updatedAt:serverTimestamp(),
          //   activity:[{
          //     type:'action',// may be change
          //     registeredAt:serverTimestamp(),
          //     action:{
          //       iconType:'',
          //       actionMessage:'created the issue',
          //       fromMessage: null, 
          //       toMessage:null
          //     }
          //   }]
    
          // }
          // ,useBatch:batch}) //  setDoc does not return the doc only the addDoc



//           // const createdIssueToSecondTeam = await postNewNestedLevelTwoDocumentNoDocumentName({
//           //   firstCollectionName:"workspaces",firstDocumentName:createdWorkSpace.id,secondCollectionName:"teams",
//           //    secondDocumentName:secondCreatedTeam.id,thirdCollectionName:"issues",useBatch:batch,inputObject:{ 
//           //     title:'Wellcome , this is your second team',
//           //     content:{
//           //       pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
//           //       text:'Fell free to explore the app'
//           //     },
//           //     status:{name:'Backlog',icon:'backlog'},
//           //     priority:{name:'Low',icon:'priorityLow'},
//           //     label:null,
//           //     dueDate:'',
//           //     blockByIssueId:'',
//           //     blockingIssueId:'',
//           //     identified:"MST-0",
//           //     assignedToUserId:user.uid,
              
//           //     updatedAt:serverTimestamp(),
//           //     activity:[{
//           //       type:'action',// may be change
//           //       registeredAt:serverTimestamp(),
//           //       action:{
//           //         iconType:'',
//           //         actionMessage:'created the issue',
//           //         fromMessage: null, 
//           //         toMessage:null
//           //       }
//           //     }]
      
//           //   }
//           // })
//       console.log('my issue3',createdIssueToSecondTeam)
//         // create issue activity tracker (with two tipes , comment and action , action for ex User Name created Issue 5 days ago)
//         collectionSelectedPath += `/${createdIssueToSecondTeam.id}/activites`
//         await postNewDocument({collectionSelected:collectionSelectedPath,
//         inputObject:{ 
//           type:'action',// may be change
//           action:{
//             iconType:'',
//             actionMessage:'created the issue',
//             fromMessage: null, 
//             toMessage:null
//           },
//           creatorId:null,// if no id then the app has created the issue
          
//         },useBatch:batch})
    
//    //// create second team in first workspace <--




//         /// my second workspace -->
        
//         const createdWorkSpaceSec =  await postNewDocument({collectionSelected:'workspaces',
//         inputObject:{
      
//         name:'My Second Workspace' ,photoURL:null,identified:'MSW' ,
//         labels:[{name:'Feature',icon:'labelFeature',},{name:'Improvement',icon:'labelImprovement'},{name:'Bug',icon:'labelBug'} ], timezone:browserDate , workspaceURL:'mysecond' , 
//         membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}}
//       }
//         ,useAddDocument:true,useBatch:batch}) //  setDoc does not return the doc only the addDoc

  
//        // // create second workspace first team 

//        collectionSelectedPath = `workspaces/${createdWorkSpaceSec.id}/teams`
     
//       const createdTeamSec =  await postNewDocument({collectionSelected:collectionSelectedPath,
//         inputObject:{issuesNumber:1,membersId:{[user.uid]:{role:'Owner',invitedAt:serverTimestamp()}},
      
//         name:'My Second Team' ,photoURL:null,identified:'MST' , timezone:browserDate
//       }
//         ,useAddDocument:true,useBatch:batch}) 
//         console.log('ma ce1 createdTeamSec',createdTeamSec)
//         collectionSelectedPath +=  `/${createdTeamSec.id}/issues`
//         // create first Issue in second workspace
     
        // const createdIssueSec =  await postNewDocument({collectionSelected:collectionSelectedPath,
        // inputObject:{ 
        //   title:'Wellcome to reduce issues again',
        //   content:{
        //     pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
        //     text:'Fell free to explore the app,..again :)'
        //   },
        //   status:{name:'Backlog',icon:'backlog'},
        //   priority:{name:'Low',icon:'priorityLow'},
        //   label:null,
        //   dueDate:'',
        //   blockByIssueId:'',
        //   blockingIssueId:'',
        //   identified:"MST-0",
        //   assignedToUserId:user.uid,
          
        //   updatedAt:serverTimestamp(),
        //   activity:[{
        //     type:'action',
        //     registeredAt:serverTimestamp(),
        //     actionType:'create',
        //     creatorId:null,// if no id then the app has created the issue
        //   }]
  
        // }
        // ,useBatch:batch}) //  setDoc does not return the doc only the addDoc



//         // const createdIssueSec = await postNewNestedLevelTwoDocumentNoDocumentName({
//         //   firstCollectionName:"workspaces",firstDocumentName:createdWorkSpaceSec.id,secondCollectionName:"teams",
//         //    secondDocumentName:createdTeamSec.id,thirdCollectionName:"issues",useBatch:batch,inputObject:{ 
//         //     title:'Wellcome to reduce issues again',
//         //     content:{
//         //       pictureListURL:[],// here are the urls that are gonna be stored in firebase ,
//         //       text:'Fell free to explore the app,..again :)'
//         //     },
//         //     status:{name:'Backlog',icon:'backlog'},
//         //     priority:{name:'Low',icon:'priorityLow'},
//         //     label:null,
//         //     dueDate:'',
//         //     blockByIssueId:'',
//         //     blockingIssueId:'',
//         //     identified:"MST-0",
//         //     assignedToUserId:user.uid,
            
//         //     updatedAt:serverTimestamp(),
//         //     activity:[{
//         //       type:'action',
//         //       registeredAt:serverTimestamp(),
//         //       actionType:'create',
//         //       creatorId:null,// if no id then the app has created the issue
//         //     }]
    
//         //   }
//         // })
//         console.log('my issue4',createdIssueToSecondTeam)
//       // create issue activity tracker (with two tipes , comment and action , action for ex User Name created Issue 5 days ago)
//       collectionSelectedPath += `/${createdIssueSec.id}/activites`
//       // await postNewDocument({collectionSelected:collectionSelectedPath,
//       // inputObject:{ 
//       //   type:'action',
//       //   actionType:'create',
//       //   creatorId:null,// if no id then the app has created the issue
        
//       // },useBatch:batch})
  
   
//         // bind team and workspace  to the owner
  
//         await postNewDocument({collectionSelected:'users',documentName:user.uid,
//         inputObject:{ 
          
//           workSpaces:{[createdWorkSpaceSec.id]:{ role:'Owner' }},
          
//         },useBatch:batch}) 

//         /// <--- second workspace

//         console.log("my batch is ",batch)

//         await batch.commit()
// }

// // and please add MFT-0 to the created issue , please dang it