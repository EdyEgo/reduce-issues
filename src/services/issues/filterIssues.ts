

export function  findWorspaceByURL(workspaceURL:string,workspaceList:{[key:string]:any}){
   for(const workspaceId in workspaceList){
      const workspaceValue  =workspaceList[workspaceId]
      if(workspaceURL === workspaceValue.workspaceURL) return workspaceValue
   
   }
}



export function filterIssueBySearch({teamIssues,searchedText}:{teamIssues:any[],searchedText:string}){
  
   let filteredTeamIssues:any[] = []; 

   function filterBySearch(teamValueIssuesList:any[]){
         
      teamValueIssuesList.forEach((issue)=>{
        const issueTitleLowerCase = issue.title.toLowerCase().trim()
        const issueTextLoserCase = issue.content.text.toLowerCase().trim()
        const serachedTextLowerCase = searchedText.toLowerCase().trim()

        const serachedTextHasSpaces = serachedTextLowerCase.indexOf(" ")
        if(serachedTextHasSpaces === -1){
         const issueTitleChecksSearchedText = issueTitleLowerCase.includes(serachedTextLowerCase)
         const issueTextChecksSearchedText = issueTextLoserCase.includes(serachedTextLowerCase)
       
         if(issueTitleChecksSearchedText || issueTextChecksSearchedText)filteredTeamIssues.push(issue)
        }

        if(serachedTextHasSpaces !== -1){
            const splitWords = serachedTextLowerCase.split(" ")

            for(let indexSplitedWordIndex = 0;indexSplitedWordIndex < splitWords.length;indexSplitedWordIndex++){
               // get out of the loop i an word has been found
               const indexSplitedWord = splitWords[indexSplitedWordIndex]
               const issueTitleChecksSearchedTextSplitWord = issueTitleLowerCase.includes(indexSplitedWord)
               const issueTextChecksSearchedTextSplitWord = issueTextLoserCase.includes(indexSplitedWord)
               if(issueTitleChecksSearchedTextSplitWord || issueTextChecksSearchedTextSplitWord){
                  filteredTeamIssues.push(issue)
                  break
               }

            }
          
        }
 
        
      })

   }   


   for(const teamKey in teamIssues){
      const teamValueIssuesList  =teamIssues[teamKey]
  
      if(teamValueIssuesList.length <= 0) continue
      filterBySearch(teamValueIssuesList)
     
   }

   return filteredTeamIssues

}

export function filterMyIssues({teamIssues,loggedUserId}:{teamIssues:any[],loggedUserId:string}){
   let filteredTeamIssues:any[] = []; 



function filterByUserId(teamIssuesList:any[]){
   for(let issueIndex= 0; issueIndex < teamIssuesList.length;issueIndex++){
      const issue = teamIssuesList[issueIndex]

      const issueIsActive = issue.status != null && issue.status.icon !== "done" && issue.status.icon !== "canceled" 

         if(issue.assignedToUserId != null && issue.assignedToUserId === loggedUserId && issueIsActive){
            filteredTeamIssues.push(issue)

         }
     
   
   
   } 

}

 for(const teamKey in teamIssues){
    const teamValueIssuesList  =teamIssues[teamKey]

    if(teamValueIssuesList.length <= 0) continue
    filterByUserId(teamValueIssuesList)
   
 }


   return filteredTeamIssues

}

export function filterActiveIssuesFunction({selectedTeamIssues}:{selectedTeamIssues:any[]}){
   // const statusIsnotNull = issue.status != null && issue.status.icon !== "done" && issue.status.icon !== "canceled" issue.status.icon && !== "backlog"
   
   let filteredTeamIssues:any[] = []; 

   for(let issueIndex= 0; issueIndex < selectedTeamIssues.length;issueIndex++){
      const issue = selectedTeamIssues[issueIndex]
      const statusIsnotNull = issue.status != null && issue.status.icon !== "done" && issue.status.icon !== "canceled" &&  issue.status.icon  !== "backlog"
      
         if(statusIsnotNull){
            filteredTeamIssues.push(issue)

         }
     
   
   
   } 

   return filteredTeamIssues

}

export function filterBacklogIssues({selectedTeamIssues}:{selectedTeamIssues:any[]}){
   // const statusMeetsCondition = issue.status != null &&  issue.status.icon === "backlog"

   let filteredTeamIssues:any[] = []; 

   for(let issueIndex= 0; issueIndex < selectedTeamIssues.length;issueIndex++){
      const issue = selectedTeamIssues[issueIndex]

      const statusMeetsCondition = issue.status != null &&  issue.status.icon  === "backlog"
         if(statusMeetsCondition){
            filteredTeamIssues.push(issue)

         }
     
   
   
   } 
   return filteredTeamIssues
}


export  function filterTeamIssues({filtersListOrder,selectedTeamIssues}:{filtersListOrder:{[key:string]:any[]},selectedTeamIssues:any[]}){
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