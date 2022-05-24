export interface Issue { 
    title:string,
    content:{
      pictureListURL:string[] | null,// here are the urls that are gonna be stored in firebase ,
      text:string
    },
    status:{name:string,icon:string},
    priority:{name:string,icon:string},
    label: any,
    dueDate:any,
    blockByIssueId:string,
    blockingIssueId:string,
    parentIssueId?:string,
    assignedToUserId:string,
    
    updatedAt:any,


  }