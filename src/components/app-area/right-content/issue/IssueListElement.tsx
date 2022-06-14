import moment from 'moment'
import NoPriority from '@mui/icons-material/MoreHorizSharp';
import extractFitIconNoDinamic from '../../../selectors/helpers/extractFitIconNoDinamic'
import NoAssignee from '@mui/icons-material/AccountCircleSharp';
import Avatar from '@mui/material/Avatar';



 export default function returnIssueListElement({index,issue,teamMembersObject}:{issue:any,index:number,teamMembersObject:{id:string,photoURL:string | null}[]}){




       function returnFoundedWorkspaceMemberById(searchedId:string){
        return teamMembersObject.find((member)=>member.id === searchedId)
       } 

       
    const createdAtDate = issue.registeredAt.toDate()
    const yearDiffCreatedAt  =moment().diff(createdAtDate, 'years');
   const momentFormatForCreatedAt = yearDiffCreatedAt >= 1 ? 'MMMM d, YYYY' : 'MMMM d' // show year if the at least one year has passed
    const createdAtHumanizeDate = moment(createdAtDate).format(momentFormatForCreatedAt);
 
    const updatedAtExists = issue.updatedAt != null
 
    let updatedAtHumanize;
 
    if(updatedAtExists){
        const updatedAtDate = issue.updatedAt.toDate()
     const yearDiffUpdatedAtAt  =moment().diff(updatedAtDate, 'years');
     const momentFormatForUpdatedAt = yearDiffUpdatedAtAt >= 1 ? 'MMMM d, YYYY' : 'MMMM d' // show year if the at least one year has passed
      updatedAtHumanize = moment(updatedAtDate).format(momentFormatForUpdatedAt)
    }

    // const dueDateExists = issue.dueDate != null 

    // let humanizeDueDate;

    // if(dueDateExists){
    //     const dueDate = issue.dueDate.toDate()
    //     const yearDiffDueDate =moment().diff(dueDate, 'years');
    //     const momentFormatForUpdatedAt = yearDiffDueDate >= 1 ? 'MMMM d, YYYY' : 'MMMM d' // show year if the at least one year has passed
    //     humanizeDueDate = moment(dueDate).format(momentFormatForUpdatedAt)

    // }

    const assigneeUserObject =issue.assignedToUserId != null ?  returnFoundedWorkspaceMemberById(issue.assignedToUserId) : null
  

       return (
           <div className="issue-list-item flex justify-between font-serif items-center p-4 hover:bg-gray-50 cursor-default" key={index}>
               <div className="issue-list-item__left-half flex items-center gap-2">
                   <div className="priority-container">
                      {issue?.priority != null  && extractFitIconNoDinamic({iconName:issue.priority.icon ,index:index+1 })}
                      {issue?.priority == null &&  <NoPriority/>}
                   </div>
 
                   <div className="identifier-contianer">
                      {issue.identified}
                   </div>
 
                   <div className="status-container">
                     {issue?.status != null && issue.status?.icon != null && extractFitIconNoDinamic({iconName:issue.status.icon ,index:index+2 })}
                   </div>
 
                   <div className="issue-title-container">
                     {issue.title.length > 50 ? issue.title.slice(0,50) + '...' : issue.title}
                   </div>
               </div>
 
               <div className="issue-list-item__right-half flex items-center gap-2">

                    {/* {dueDateExists != null &&
                        <div className="issue-due-date border p-1 rounded-md">
                            {humanizeDueDate }
                        </div>
                    } */}

                    {issue?.label != null && issue.label?.icon != null && <div className="issue-label-type-container border p-1 rounded-md" title={issue.label?.name || ""}>
                        {/* bug , improvement , etc */}
                        { extractFitIconNoDinamic({iconName:issue.label.icon ,index:index+3 })}
                    </div>}
 
                    <div className="issue-created-at">
                         {createdAtHumanizeDate}
                    </div>

                   
                    
 
                    <div className="issue-updated-at">
                           {updatedAtExists && updatedAtHumanize}
                    </div>
 
 
                    <div className="issue-assignee">
                       
                     {assigneeUserObject != null && assigneeUserObject?.photoURL != null && 
                       <Avatar src={assigneeUserObject.photoURL}   sx={{ width: 20, height: 20 }}  alt=""/>
                     }
                     {assigneeUserObject?.photoURL == null && 
                         <NoAssignee/> 
                     }
                    </div>
               </div>
           </div>
       )
   }