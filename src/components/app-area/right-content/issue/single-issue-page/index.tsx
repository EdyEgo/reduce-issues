import {useRef,useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TeamIcon from '@mui/icons-material/GroupsSharp';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import EditIssueIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AddToClipBoardIcon from '@mui/icons-material/AddLinkTwoTone';
import AddIdToClipboard from '@mui/icons-material/ContentPasteGoTwoTone';
import PlaceholderNoAssigneeIcon from '@mui/icons-material/AccountCircleTwoTone';
import NoLabelPlaceholder from '@mui/icons-material/LabelTwoTone';
import NoPriorityPlaceholde from '@mui/icons-material/SignalCellularNodataRounded';
import NoStatusPlaceholder from '@mui/icons-material/DoNotDisturbRounded';
import Avatar from '@mui/material/Avatar';
import DropDownChangeLabel from '../dropDownChangeLabelOnTheGo'
import DropDownChangeAssignee from '../dropDownChangeAssigneeOnTheGo'
import Skeleton from '@mui/material/Skeleton'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


import extractFitIconNoDinamic from '../../../../selectors/helpers/extractFitIconNoDinamic'

interface SingleIssuePageProps {
    
}
 
const SingleIssuePage: React.FC<SingleIssuePageProps> = () => {
   
    
    const teamIssuesList = useSelector((state:any)=>state.issues.teamsIssues)
    
    const params = useParams()
    const teamList = useSelector((state:any)=>state.team.teamList)
    const workspaceMembersList:any[] = useSelector((state:any)=>state.workspace.members)
   
    const issueIdentified = params.issueIdentified
    const issueObject = findIssueInTeamsIssues()// .teamId for finding the team// .identified for issue
    const assignedMemberToIssue  = findAssigneedUserByIssueAssignedId()
    const teamObject = findTeamById()
 

    const rightHalfBtnsRef = useRef(null)
    const [popoverOpenStatus,setPopoverOpenStatus] = useState(false)
    const [popoverMessage,setPopoverMessage]  = useState("Copied to clipboard")

    const [dropDownPriorityIsOpen,setDropDownPriorityIsOpen] = useState(false)
    const priorityRef = useRef(null)
    const [dropDownStatusIsOpen,setDropDownStatusIsOpen] = useState(false)
    const statusRef = useRef<any>(null)
    const [dropDownLabelIsOpen,setDropDownLabelIsOpen] = useState(false)
    const labelRef = useRef(null)
    const [dropDownAssigneeIsOpen,setDropDownAssigneeIsOpen] = useState(false)
    const assigneeRef = useRef(null)



    console.log("O-O",assignedMemberToIssue)
    // load activity  

    function findAssigneedUserByIssueAssignedId(){
       if(issueObject?.assignedToUserId != null){
         for(const memberIndex in workspaceMembersList){
            const memberValue = workspaceMembersList[memberIndex]
            if(memberValue.id === issueObject.assignedToUserId) return memberValue
           
         }
       }
       return null

    }
 
    function findIssueInTeamsIssues(){
        //identified 
        let issueObject = null

        loopTeam:for(const teamId in teamIssuesList){
            const teamIssuesValue = teamIssuesList[teamId]
            if(teamIssuesValue.length <= 0) continue
                for(let issueIndex = 0;issueIndex < teamIssuesValue.length;issueIndex++){
                    const issueValueObject = teamIssuesValue[issueIndex]
                    if(issueValueObject?.identified && issueValueObject.identified.toLowerCase() === issueIdentified?.toLowerCase()){
                        issueObject = issueValueObject
                        break loopTeam
                    }
                }

        }

        return issueObject
    }

    function findTeamById(){
        for(const teamValue of teamList){
          
            if(issueObject?.teamId != null  && teamValue.id === issueObject.teamId){
                   
                return teamValue
            }
        }
    }

    function copyIssueIdentifiedToClipboard(){
        setPopoverMessage("Issue ID copied to clipboard")
        navigator.clipboard.writeText(issueObject.identified)
    }
    function copyIssueUrlToClipBoard(){
        // window.location.href;
        setPopoverMessage("Issue URL copied to clipboard")
        navigator.clipboard.writeText(window.location.href)
    }

    function handleCopyToClipBoard(type:"url" | "id"){
         const copyTypes = {
            id:()=>{copyIssueIdentifiedToClipboard()},
            url:()=>{copyIssueUrlToClipBoard()}
         }
         copyTypes[type]()
         setPopoverOpenStatus(true)
         setTimeout(()=>{
            setPopoverOpenStatus(false)
         },2000)// there is no need to make a clear timeout variable to store the id's
    }
    // and sub issue

function creteSkeletons(){
    const skeletons = []
   for(let i = 0;i<20;i++){
    skeletons.push(<Skeleton/>)
   }
   return skeletons
}
    return  ( 
        <div className="single-issue-container">
          {issueObject != null && teamObject != null && <div className="single-issue-container ">
               <div className="issue-page-content-left-side">
                <div className="issue-page-nav-bar flex justify-between p-4 text-sm px-9">
                      <div className="issue-page-nav-bar__left-half flex gap-4">
                         <div className="team-name-container flex items-center gap-4">
                            <TeamIcon/>
                            {teamObject?.name != null &&  <div className='team-name'>{teamObject.name}</div>}
                            {teamObject?.name == null &&  <div className='team-name'>....</div>}
                         </div>
                          <div className='arrow p-1'><ArrowForwardIosIcon fontSize='small'/></div>
                          <div className='issue-identifier p-1'>{issueObject.identified}</div>
                      </div>

                      <div className="issue-page-nav-bar__right-half gap-2 flex" ref={rightHalfBtnsRef}>
                        <div className="first-half-icons flex">
                          <div className="cursor-pointer hover:bg-gray-100 p-1 rounded-md"> <EditIssueIcon/></div>
                          <div className="cursor-pointer hover:bg-gray-100 p-1 rounded-md"> <DeleteForeverTwoToneIcon/></div>
                        </div>

                           
                        <div className="second-half-icons flex gap-2 items-center border-l pl-2">
                            

                            
                                 <div className="cursor-pointer hover:bg-gray-100 p-1 rounded-md" title="Copy issue URL to clipboard" onClick={()=>{handleCopyToClipBoard("url")}}><AddToClipBoardIcon fontSize='small'/></div>
                                 <div className="cursor-pointer hover:bg-gray-100 p-1 rounded-md" title="Copy issue ID to clipboard" onClick={()=>{handleCopyToClipBoard("id")}}><AddIdToClipboard/></div>
                                 <div>
      
      <Popover
        id={"popover-single-page-issue"}
        open={popoverOpenStatus}
        anchorEl={rightHalfBtnsRef.current}
        onClose={()=>{setPopoverOpenStatus(!popoverOpenStatus)}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{popoverMessage}</Typography>
      </Popover>
    </div>
                      </div>
                      </div>
                </div>

                <div className="issue-page-labels-list flex gap-4 items-center justify-center my-4 border-t border-b py-3">
                        {/* extractFitIconNoDinamic , issueObject*/}
                       <div className="status-container p-2 bg-gray-100 hover:bg-gray-50 rounded-md cursor-pointer">
                                {issueObject.status != null && <div className="status-exists flex items-center gap-2" ref={statusRef}
                                  onClick={()=>{setDropDownStatusIsOpen(!dropDownStatusIsOpen)}}>
                                    <div className="status-icon">
                                     {extractFitIconNoDinamic({iconName:issueObject.status.icon ,index:1 })}
                                    </div>
                                    <div className="status-name">{issueObject.status.name}</div>
                                </div>}

                                {
                                  issueObject.status == null && 
                                  <div className="status-placeholder  flex items-center gap-2" ref={statusRef}
                                  onClick={()=>{setDropDownStatusIsOpen(!dropDownStatusIsOpen)}}>
                                    <div className="status-icon"><NoStatusPlaceholder/></div>
                                    <div className="status-name">Status</div>
                                </div>
                                }
                        </div>

                        <div className="priority-container p-2 bg-gray-100 hover:bg-gray-50 rounded-md cursor-pointer">
                                {issueObject.priority != null &&<div className="priority-exists flex items-center gap-2" ref={priorityRef} 
                                  onClick={()=>{setDropDownPriorityIsOpen(!dropDownPriorityIsOpen)}}>
                                    <div className="priority-icon">
                                    {extractFitIconNoDinamic({iconName:issueObject.priority.icon ,index:1 })}
                                    </div>
                                    <div className="priority-name">{issueObject.priority.name}</div>
                                </div>}
                                {
                                  issueObject.priority == null && 
                               
                                  <div className="priority-placeholder flex items-center gap-2" ref={priorityRef} 
                                  onClick={()=>{setDropDownPriorityIsOpen(!dropDownPriorityIsOpen)}}>
                                    <div className="priority-icon"><NoPriorityPlaceholde/></div>
                                    <div className="priority-name">Priority</div>
                                </div>
                                  
                                }

                        </div>

                        <div className="assignee-container p-2 bg-gray-100 hover:bg-gray-50 rounded-md cursor-pointer">
                            {assignedMemberToIssue != null && <div className="assignee-exists flex items-center gap-2"  ref={assigneeRef} 
                                   onClick={()=>{setDropDownAssigneeIsOpen(!dropDownAssigneeIsOpen)}}>
                                <div className="assignee-icon">
                                <Avatar src={assignedMemberToIssue.photoURL}   sx={{ width: 20, height: 20 }}  alt=""/>
                                </div>
                                <div className="assignee-name text-xs flex gap-1">
                                    <div className="firstName">{assignedMemberToIssue.firstName}</div>
                                    <div className="lastName">{assignedMemberToIssue.lastName}</div>
                                </div>
                            </div>}
                            {
                             assignedMemberToIssue == null && 
                             <div className="assignee-placeholder flex items-center gap-2" ref={assigneeRef} onClick={()=>{setDropDownAssigneeIsOpen(!dropDownAssigneeIsOpen)}}>
                                <div className="assignee-icon"><PlaceholderNoAssigneeIcon/></div>
                                <div className="assignee-name">Assignee</div>
                            </div>
                            
                            
                            }
                   
                        </div>


                        <div className="label-container  p-2 bg-gray-100 hover:bg-gray-50 rounded-md cursor-pointer">
                           {issueObject.label != null && <div className="label-exists flex items-center gap-2" ref={labelRef} onClick={()=>{setDropDownLabelIsOpen(!dropDownLabelIsOpen)}}>
                               <div className="label-icon">
                               {extractFitIconNoDinamic({iconName:issueObject.label.icon ,index:1 })}
                               </div>
                               <div className="label-name">{issueObject.label.name}</div>
                           </div>}
                           {
                            issueObject.label == null && 
                               <div className="label-placeholder flex items-center gap-2" ref={labelRef} onClick={()=>{setDropDownLabelIsOpen(!dropDownLabelIsOpen)}}>
                                 <div className="label-icon"><NoLabelPlaceholder/></div>
                                 <div className="label-name">Label</div>
                               </div>
                           }

                        </div>

                </div>

                <div className="issue-page-content">

                </div>

                <div className="issue-page-activity">

                </div>

               </div>
 
                <DropDownChangeLabel issueObject={issueObject} 
                anchorRef={priorityRef} open={dropDownPriorityIsOpen} 
                selectBoxType="priority" 
                setOpen={setDropDownPriorityIsOpen} />
               <DropDownChangeLabel issueObject={issueObject} anchorRef={statusRef} open={dropDownStatusIsOpen} selectBoxType="status" setOpen={setDropDownStatusIsOpen} />
               <DropDownChangeLabel issueObject={issueObject} anchorRef={labelRef} open={dropDownLabelIsOpen} selectBoxType="labels" setOpen={setDropDownLabelIsOpen} />
                <DropDownChangeAssignee issueObject={issueObject} anchorRef={assigneeRef} open={dropDownAssigneeIsOpen} setOpen={setDropDownAssigneeIsOpen} />
         
           </div> }
           {
            issueObject == null && teamObject == null && 
            creteSkeletons()
           }
        </div>
    
      );
}
 
export default SingleIssuePage;