





export default function filterIssues(filtersListOrder:{[key:string]:any[]},selectedTeamIssues:any[]){
   let filteredTeamIssues:any[] = []; 
 
   if(filtersListOrder.status.length === 0 && filtersListOrder.labels.length === 0 && 
    filtersListOrder.assignee.length === 0 && filtersListOrder.priority.length === 0 
    && filtersListOrder.creator.length === 0 ) return selectedTeamIssues

   for(let issueIndex= 0; issueIndex < selectedTeamIssues.length;issueIndex++){
           const issue = selectedTeamIssues[issueIndex]
           

           let meetsPriority = true  
           let meetsStatus = true  
           let meetsLabel = true 
           let meetsAssignee = true 
           let meetsCreeator = true // :) nice name mate

           // if issue.priority is null then the find index is gonna return -1 and its ok
  
           const priorityTransformFromNull = issue.priority === null ? {icon:""} : issue.priority
           const labelTransformFromNull = issue.label === null ? {icon:""}  : issue.label 
           const statusTransformFromNull = issue.status === null ? {icon:""}  : issue.status
           if( filtersListOrder.priority.length >= 1 && filtersListOrder.priority.findIndex((selectedPriority)=>selectedPriority.value.icon === priorityTransformFromNull.icon) === -1){
          
              meetsPriority = false
   
           }
           if(filtersListOrder.status.length >=1 && filtersListOrder.status.findIndex((selectedStatus)=>selectedStatus.value.icon === statusTransformFromNull.icon) === -1){
              meetsStatus = false
           }

           if(filtersListOrder.labels.length >=1 && filtersListOrder.labels.findIndex((selectedLabel)=>selectedLabel.value.icon === labelTransformFromNull.icon) === -1){
              meetsLabel = false
           }

           if(issue.assignedToUserId != null && filtersListOrder.assignee.length >= 1 && filtersListOrder.assignee.findIndex((selectedAssignee)=>selectedAssignee.userId === issue.assignedToUserId) === -1){
              meetsAssignee = false
           }

           if(issue.creatorId != null  &&  filtersListOrder.creator.length >= 1 && filtersListOrder.creator.findIndex((selectedCreatorId)=>selectedCreatorId.userId === issue.creatorId) === -1){
         
             
            meetsCreeator = false
           }

       // due date left

           if(meetsPriority && meetsStatus && meetsLabel && meetsAssignee && meetsCreeator) filteredTeamIssues.push(issue)


   }

   return filteredTeamIssues

}