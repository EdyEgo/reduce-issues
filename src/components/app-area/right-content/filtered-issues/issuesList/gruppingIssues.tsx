import {useSelector} from 'react-redux'

import AddSharpIcon from '@mui/icons-material/AddSharp';
import Avatar from '@mui/material/Avatar';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

import filterTeamIssues from '../../../../../services/issues/filterIssues'

import IssueListElement from '../../issue/IssueListElement'

import extractFitIconNoDinamic from '../../../../selectors/helpers/extractFitIconNoDinamic'
import { useDispatch } from 'react-redux';

import { changenewIssueModalOpenStatus } from "../../../../../store/issues";

interface GrouppingIssuesProps {
    
}
 
const GrouppingIssues: React.FC<GrouppingIssuesProps> = () => {
    const dispatch = useDispatch();

    const viewFilters = useSelector((state:any)=>state.filtersIssues.viewFilters)
    
   const filtersListOrder  = useSelector((state:any)=>state.filtersIssues.filtersListOrder)

    const selectedTeamId = useSelector((state:any)=>state.selectedTab.selectedTabAppArea.selectedTeamId)
    const teamIssues = useSelector((state:any)=>state.issues.teamsIssues)
    const selectedTeamIssues = teamIssues[selectedTeamId] != null ? teamIssues[selectedTeamId] : []
     
    const filteredIssuesList = filterTeamIssues(filtersListOrder,selectedTeamIssues)
   
    const useDefaultViewFilters = viewFilters.custom.empty ? viewFilters.default : viewFilters.custom
    const listIsGrouped = useDefaultViewFilters.groupingBy !== "none" 
    
    const teamMembersObject:{id:string,photoURL:string | null}[] = useSelector((state:any)=>state.workspace.members)//{}[]

    console.log('you filter by this selectedTeamIssues',filteredIssuesList, 'and test ',selectedTeamIssues)
  

    // function openNewIssueModal(preloadedPropertyName:string,preloadedData:any) { 
    // // openModalWithPreloadedData
    //     // open with some data and at closing the modal the local store to get clean , neee
    //     dispatch(changenewIssueModalOpenStatus({open:true,preloadedData:{[preloadedPropertyName]:preloadedData}}));
    //   }

    function returnIssuesGruped(){
        
    const grupByName = useDefaultViewFilters.groupingBy
  
        const groups:{[key:string]:any} = {
           
        }
     
        for(let issueIndex = 0; issueIndex < filteredIssuesList.length; issueIndex++){
            const currentIssue = filteredIssuesList[issueIndex]
           
            if(currentIssue[grupByName] == null && grupByName !== "assignee"){
                const propertyName = "No" + " "  + grupByName
                const propertyIcon = "none"
                if(groups[propertyIcon] == null) groups[propertyIcon] =  {list:[],name:propertyName,icon:propertyIcon,grupByName:"none"}
                groups[propertyIcon].list.push(currentIssue)
                continue
            }

            if(currentIssue.assignedToUserId != null && grupByName === "assignee"){
                const propertyIcon = currentIssue.assignedToUserId
                const propertyName = "Assignee"
                if(groups[propertyIcon] == null)groups[propertyIcon] =  {list:[],name:propertyName,icon:propertyIcon,grupByName:"assignee"}
                groups[propertyIcon].list.push(currentIssue)
                continue
            }

            if(currentIssue.assignedToUserId == null && grupByName === "assignee"){
                const propertyIcon = "noAssignee"
                const propertyName = "No Assignee"
                if(groups[propertyIcon] == null)groups[propertyIcon] =  {list:[],name:propertyName,icon:propertyIcon,grupByName:'noAssignee'}
                groups[propertyIcon].list.push(currentIssue)
                continue
            }
            if(currentIssue[grupByName]?.icon != null){
                const propertyName = currentIssue[grupByName].name
                const propertyIcon = currentIssue[grupByName].icon
                if(groups[propertyIcon] == null) groups[propertyIcon]  =  {list:[],name:propertyName,icon:propertyIcon,grupByName}
                groups[propertyIcon].list.push(currentIssue)
            }
        }

 
    return  Object.entries(groups).map(([propertyTypeName,propertyTypeValue],groupIndex)=>{
         

 
function returnFoundedWorkspaceMemberById(searchedId:string){
    return teamMembersObject.find((member)=>member.id === searchedId)
   } 

   const headIcon = extractFitIconNoDinamic({iconName:propertyTypeValue.icon,index:groupIndex})
   const isUser:any = returnFoundedWorkspaceMemberById(propertyTypeName)
   const hasPhotoURL = isUser?.photoURL != null ? isUser.photoURL : null


   function callOpenNewIssueModalWithTheRightPreloadedData(){
       
       if(propertyTypeName === 'noAssignee'){
            dispatch(changenewIssueModalOpenStatus({open:true,preloadedData:{noAssignee:null}}));
            return 
       }
       if(isUser != null){
        dispatch(changenewIssueModalOpenStatus({open:true,preloadedData:{"assignee":{...isUser,name:isUser.firstName + " " + isUser.lastName}}}));
        return 

       }
  
       dispatch(changenewIssueModalOpenStatus({open:true,preloadedData:{[propertyTypeName]:propertyTypeValue}}));

   }

            return (<>
             <div className="property-head-group bg-gray-100 flex justify-between p-4">
                   <div className="left-half flex items-center gap-2">
                          <div className="property-icon">
                                {headIcon !== '' && headIcon}

                                {headIcon === '' && hasPhotoURL != null && <Avatar src={hasPhotoURL}   sx={{ width: 20, height: 20 }}  alt=""/>}
                                 
                                 {propertyTypeName === 'noAssignee' && <AccountCircleSharpIcon/>}
                               

                            </div>
                        <div className="property-name">
                            
                            {isUser == null && propertyTypeValue.name}
                            {isUser != null && `${isUser.firstName} ${isUser.lastName}`}
                        
                        </div>
                           
                   </div>

                    <div className="right-half">
                        <div onClick={callOpenNewIssueModalWithTheRightPreloadedData} className="add-issue-with-property-btn hover:bg-gray-200 rounded-md p-1 cursor-pointer">
                            <AddSharpIcon/>
                        </div>
                   </div>
             </div>
             {propertyTypeValue.list.map((issue:any,index:any)=><IssueListElement index={index} issue={issue} teamMembersObject={teamMembersObject}/>)}

            </>)
        })
 

     
            
    }



    return (  
       <>
        {listIsGrouped && filteredIssuesList.length >= 1 &&

            <div className="grouped-issues-list border-t">
               {returnIssuesGruped()}
            </div>
        
        }

       {listIsGrouped === false && filteredIssuesList.length >= 1 &&

            <div className="ungrouped-issues-list border-t">
                {filteredIssuesList.map((issue,index)=><IssueListElement index={index} issue={issue} teamMembersObject={teamMembersObject}/>)}
            </div>
        }
       </>
    );
}
 
export default GrouppingIssues;