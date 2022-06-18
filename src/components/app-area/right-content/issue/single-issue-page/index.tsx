import {useRef,useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams,useNavigate} from 'react-router-dom'
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
import SavedMade from '@mui/icons-material/CheckTwoTone';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DangerDeleteIssue from '@mui/icons-material/ReportProblemSharp';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import SaveFailed from '@mui/icons-material/RunningWithErrorsSharp';

import CircularProgress from '@mui/lab/LoadingButton';

import {updateIssue,deleteIssue} from '../../../../../api/dataBaseIssuesMethods'


import SaveChanges from '@mui/icons-material/SaveAs';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


import extractFitIconNoDinamic from '../../../../selectors/helpers/extractFitIconNoDinamic'


interface SingleIssuePageProps {
    
}
 
const SingleIssuePage: React.FC<SingleIssuePageProps> = () => {
   
    
    const teamIssuesList = useSelector((state:any)=>state.issues.teamsIssues)
    
    const params = useParams()
    const navigate = useNavigate()
  


    const teamList = useSelector((state:any)=>state.team.teamList)
    const workspaceMembersList:any[] = useSelector((state:any)=>state.workspace.members)
    
   
    const issueIdentified = params.issueIdentified
    const issueObject = findIssueInTeamsIssues()// .teamId for finding the team// .identified for issue
    const assignedMemberToIssue  = findAssigneedUserByIssueAssignedId()
    const teamObject = findTeamById()
    const selectedWorkspace = useSelector(
        (state: any) => state.workspace.selectedWorkSpace
      )

      console.log('issueObject is',issueObject)
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

    //updateIssue
    const [updateIssueLogin,setUpdateIssueLogin] =useState(false)
    const [showSaveMade,setShowSaveMade] = useState(false)
    const [showUnsaved,setShowUnsaved] = useState(false)

    const [deleteModalStatus,setDeleteModalStatus] = useState(false)
    const [deleteLoginModalStatus,setDeleteLoginModalStatus] = useState(false)
    const [deleteErrorMessage,setDeleteErrorMessage] = useState<null | string>(null)

    const [inputTextValue,setInputTextValue] = useState(issueObject?.content?.text != null? issueObject.content.text : "")
    const [inputTitleValue,setInputTitleValue] = useState(issueObject?.title ? issueObject?.title : "")
 
    const showSaveChangesIcon = detectCreatedChanges()



 
    const focusEditTextContent = useRef<any>(null)

   
    
    const inputTextHeightCalc = inputTextValue.length >= 353 && inputTextValue.length < 570 ? inputTextValue.length : 
                                inputTextValue.length < 353 ? 303 : 570

      

 
    

    

   
 
    // live updates of the issue will be made on click outside the inpus and on exit tab if any changes were made 
    // compare with issueObject

    // load activity  

    async function deleteIssueFunction(){
        setDeleteLoginModalStatus(true)

        const deletedResult = await deleteIssue({
           issueId:issueObject.id,
           teamId:issueObject.teamId,
           wokspaceId:selectedWorkspace.id
        })

       

        if(deletedResult.error){
            // issue could not be deleted, show message
            setDeleteErrorMessage(deletedResult.message)

            setTimeout(()=>{
                setDeleteErrorMessage(null) 
            },3000)
        }
 

        if(!deletedResult.error){
            // issue was deleted , redirect to / (that will then redirect you to my issue , or just go back a step :]) 
            navigate("/")
          
        }
      
            setDeleteLoginModalStatus(false)
        
        
    }

    async function updateIssueFunction(){

        setShowSaveMade(false)
        setShowUnsaved(false)

        setUpdateIssueLogin(true)

      const updateResult = await updateIssue({inputObject:{
            title:inputTitleValue,content:{
                text:inputTextValue
            }
        },
        issueId:issueObject.id,
        teamId:issueObject.teamId,workspaceId:selectedWorkspace.id
    
      })

  
 
       if(updateResult.error){
        setShowUnsaved(true)
        setTimeout(()=>{
            setShowUnsaved(false)
        },3000)
        
       }

       if(!updateResult.error){
        setShowSaveMade(true)
        setTimeout(()=>{
            setShowSaveMade(false)
        },3000)
       }

       setUpdateIssueLogin(false)
      
    }


    function detectCreatedChanges(){
      if(issueObject?.content?.text != null && issueObject.content.text !== inputTextValue){
        return true
      }
      if(issueObject?.title != null && inputTitleValue !== issueObject.title){
        return true
      }
      return false
    }

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
        if(issueObject?.teamId == null) return null
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
        <div className="single-issue-container p-2">
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
                        <div className="first-half-icons flex items-center">
                            {/* showSaveMade && */}
                       
                       { showSaveMade && <div className="flex items-center gap-2 mr-2">
                        <div className="save-failed-info-text text-green-600">Successfully saved</div>
                        <SavedMade className="text-green-600 bg-green-100 rounded-md p-1"/>
                        
                        </div>
                       
                       }
                       {showUnsaved && <div className="flex items-center gap-2 mr-2">
                        <div className="save-failed-info-text text-red-600">Save Failed</div>
                        <SaveFailed className="text-red-600 bg-red-100 rounded-md p-1"/>
                        
                        </div>
                       
                       }

                        {updateIssueLogin && <CircularProgress className="p-1"  loading variant="text" />}
                        { showSaveChangesIcon && updateIssueLogin === false && 
                        <div className="cursor-pointer hover:bg-gray-100 p-1 rounded-md text-red-400" 
                        onClick={()=>{updateIssueFunction()}}
                        title="Save Changes" >< SaveChanges/></div>}

                        
                             
                      
                          <div className="cursor-pointer hover:bg-gray-100 p-1 rounded-md" title="Edit Issue" 
                          onClick={()=>{if(focusEditTextContent.current?.focus)focusEditTextContent.current.focus()}}
                          > <EditIssueIcon/></div>
                       
                          <div className="cursor-pointer hover:bg-gray-100 p-1 rounded-md" title="Delete Issue" onClick={()=>{setDeleteModalStatus(true)}}> <DeleteForeverTwoToneIcon/></div>
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

                {issueObject.content != null && <div className="issue-page-content flex flex-col justify-center items-center">
                    <div className="issue-given-title-container w-full">
                        <div className="issue-given-title self-start p-4">
                         <textarea  
                         onChange={(event)=>{setInputTitleValue(event.target.value)}} 
                         className="w-full leading-6 text-2xl font-semibold border overflow-hidden break-words rounded-md resize-none border-white transition-all ease-in-out" value={inputTitleValue}></textarea>
                        </div>
                    </div>
                    <div className="issue-given-content w-full border-b pb-2">
                         {    issueObject.content.pictureListURL != null && 
                          issueObject.content.pictureListURL.length >= 1 &&
                             <div className="pictures-list mb-4">
                            {issueObject.content.pictureListURL.map((pictureURL:string,index:number)=>{
                                   return <img src={pictureURL} alt="picture" className="rounded-md" key={index}/>
                            })}
                          </div>}

                          <div className="text-content">
                         
                                 

                          <textarea  ref={focusEditTextContent} 
                          onChange={(event)=>{setInputTextValue(event.target.value)}} 
                          style={{height:`${inputTextHeightCalc}px` ,lineHeight:1.4}}
                           className="issue-input-text w-full leading-6   border overflow-hidden break-words rounded-md resize-none border-white transition-all ease-in-out" value={inputTextValue}></textarea> 
                          
                           
                          </div>




                    </div>

                </div>}

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
           
                <Modal
                open={deleteModalStatus}
                        onClose={()=>{setDeleteModalStatus(false)}}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 500,
                            bgcolor: 'background.paper',
                            border: '2px solid white',
                            boxShadow: 24,
                            p: 3
                        }}>
                            {deleteLoginModalStatus &&
                                 <Stack sx={{ width: '100%', color: 'grey.500',visibility: "visible" }} spacing={2}>
                                        <LinearProgress color="success" />

                                  </Stack>
                            }
                            {deleteLoginModalStatus === false &&
                                  <Stack sx={{ width: '100%', color: 'grey.500' , visibility: "hidden"}} spacing={2}>
                                        <LinearProgress color="success" />

                                  </Stack>}
                            <div className="container">
                                        <div className="flex justify-center my-2"><DangerDeleteIssue className="text-red-500"/></div>
                                    <Typography  id="modal-modal-title" variant="h6" component="h2">
                                    Are you sure you want to delete the issue?
                                    </Typography>
                                    {deleteErrorMessage != null &&
                                        <div className="text-center text-red-500 visible">Could not delete the issue</div>
                                    
                                    }
                                   {deleteErrorMessage == null &&
                                        <div className="text-center text-red-500 invisible">placeholder</div>
                                    
                                    }
                                    <div className="flex justify-between m-2 mt-4">
                                        <Button onClick={()=>{deleteIssueFunction()}} disabled={deleteLoginModalStatus} variant="outlined"  startIcon={<DeleteIcon />}>
                                                Delete
                                        </Button>
                                        <Button disabled={deleteLoginModalStatus} variant="contained" color="success" onClick={()=>{setDeleteModalStatus(false)}}>
                                            Keep
                                        </Button>
                                    </div>
                            </div>


                            
                        </Box>
                </Modal>
           </div> }
           {
            issueObject == null && teamObject == null && 
            creteSkeletons()
           }
        </div>
    
      );
}
 
export default SingleIssuePage;