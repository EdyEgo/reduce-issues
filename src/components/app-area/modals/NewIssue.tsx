

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changenewIssueModalOpenStatus } from "../../../store/issues";
import {postFile,postMultipleFiles} from '../../../api/dataBaseStorageMethods'
import {postIssue,addPicturesURLToIssue , addIssuePicturesToStore} from '../../../api/dataBaseIssuesMethods'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import SelectDialogObjectBased from '../../selectors/basicObjectBased'
import SelectDialogArrayBased from '../../selectors/basicArrayBased'
import AssigneeSelector from '../../selectors/assigneeSelector'
import SelectPictures from '../../selectors/selectPictures' 
import SelectDate from '../../selectors/basicDateSelector'
import {labelsList,priorityList,statusList} from '../../../composables/modalOptions/issues'


// saveing the issues img is gonna be interesting , maybe the workspace id will be a good fit

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function NewIssueModal() {
  const dispatch = useDispatch();
  const newIssueModalIsOpen = useSelector(
    (state: any) => state.issues.newIssueModalOpenStatus
  ); 

  const team = useSelector(
    (state: any) => state.team.teamList
  ); 

  const teamsList = useSelector(
    (state: any) => state.team.teamList
  );

  const [selectedTitle,setSelectedTitle] = React.useState('') 
  const [selectedPictures,setSelectedPictures] = React.useState('') 
  const [selectedText,setSelectedText] = React.useState('') 
  const [selectedTeamObject,setSelectedTeamObject] = React.useState([])
  const [selectedTeam,setSelectedTeam] = React.useState('') 
  const [selectedMemberObject,setSelectedMemberObject] = React.useState({photoURL:null,name:"Assignee",id:null})
  const [selectedStatus,setSelectedStatus] = React.useState(null)
  const [selectedPriority,setSelectedPriority] = React.useState(null)
  const [selectedLabel,setSelectedLabel] = React.useState(null)

  


  const [values, setValues] = React.useState<any>({
    teamId:'',
    title:'',
    text:'',
    pictures:null,
  
    dueDate:null,
    blockByIssueId:null,
    blockingIssueId:null,
    assignedToUserId:null


   
  });



  const handleChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
 
 const setSelectedAssigneeTeamMember  =(memberObject:any)=>{
   
  setValues({ ...values, assignedToUserId: memberObject.id });
  setSelectedMemberObject(memberObject)

 }


 const updateTeam = (teamId:string)=>{
  if(selectedMemberObject.id)setSelectedMemberObject({photoURL:null,name:"Assignee",id:null}) // delete old added member on changeing the team
  setValues({ ...values,  teamId});
  setSelectedTeamObject(teamsList.find((team:any)=>team.id === teamId).membersId) 
  setSelectedTeam(teamId)
 } 

 

const updatePictures = (event:any)=>{
   
   if(event.target.files.length <= 0) return 
   if(values.pictures === null) {
    setValues({ ...values, pictures: [event.target.files[0]] });
   
    return 
   }
   const picturesCopy = [...values.pictures]
   picturesCopy.push(event.target.files[0])
   setValues({ ...values, pictures: picturesCopy });
   
}

function createImgs(){
  
  if(values.pictures === null) return []
  return values.pictures.map((imgFile:File,index:number)=>{
      return (<img src={URL.createObjectURL(imgFile)} alt="preview image" className="my-3" key={index}/>)
  })
}

  function closeNewIssueModal() {
    dispatch(changenewIssueModalOpenStatus(false));
  }
  
  async function handleSaveChanges(){ 
   // helpers postIssue,addPicturesURLToIssue , addIssuePicturesToStore
     
     // first post the issue then we add the pictures to the store if we have any , then we add the 
     // the urls to the issue

 
    const {pictures,teamId,title,text , 
      
      dueDate,
      blockByIssueId,
      blockingIssueId,
      assignedToUserId} = values
     
     const newIssueObject = {
      title,
      content:{
        pictureListURL:null,// here are the urls that are gonna be stored in firebase ,
        text
      },
      status:selectedStatus,
      priority:selectedPriority,
      label:selectedLabel,
      dueDate,
      blockByIssueId,
      blockingIssueId,
  
      assignedToUserId,
      
      
     }
     // postIssue()
     
     //then post the pictures
     // here update picturesURL on issue 
    //  addPicturesToIssue({issueId,pictureListURL,teamId,workspaceId})
 // postMultipleFiles


    // works
    // const fileResult = await postFile({file:values.pictures[0],path:`testing/staff/${values.pictures[0].name}`})
    console.log('my staff are ',values , 'and this',newIssueObject)//'but my upload is',fileResult.data ,fileResult.data.snapshot, fileResult.data.downloadURL )
  }
 
  
  return (
    <>
      <BootstrapDialog
        onClose={closeNewIssueModal}
        aria-labelledby="customized-dialog-title"
        open={newIssueModalIsOpen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={closeNewIssueModal}
        >
         <div className="title-and-select-team-container flex flex-col items-center">
           <div className="title"> Create a new issue</div>
            <div className="select-team">
              <SelectDialogObjectBased itemsList={teamsList} selectedItem={selectedTeam} setSelectedItem={updateTeam} labelTitle="Select Team" returnIdAsValue={true} />
            </div>
         </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
    
         <div className="attach-content-row">
          
         <div className="new-issue-title-container">{selectedTitle}</div>
           <div className="new-issue-picture-attach-container">{selectedPictures}</div>
           <div className="new-issue-text-container">{selectedText}</div> 
           <Box
            component="form"
           
            noValidate
            sx={{ mt: 2 }}
          >
            <TextField
              margin="normal"
              value={values.title}
              onChange={handleChange("title")}
              required
              fullWidth
              id="issue-title"
              label="Title"
              name="title"
              type="text"
              autoComplete="title"
              autoFocus 
              variant="standard"
            />
           
            {createImgs()}
            
            <TextField
              margin="normal"
              value={values.text}
              onChange={handleChange("text")}
              required
              fullWidth
              label="Description"
              name="text"
              type="text"
              id="issue-text"
              variant="standard"
              
              multiline
            />
            
          
            

            

            
          </Box>
         </div>
         <div className="buttons-row flex justify-center items-center gap-12">
         <div className="first-half">
         {<SelectDialogArrayBased  itemsList={statusList} labelTitle={'No status'} selectedItem={selectedStatus} setSelectedItem={setSelectedStatus} />}
          {<SelectDialogArrayBased itemsList={priorityList} labelTitle={'No priority'} selectedItem={selectedPriority} setSelectedItem={setSelectedPriority} />}
         </div>
         <div className="second-half">
         {<SelectDialogArrayBased itemsList={labelsList} labelTitle={'No Label'} selectedItem={selectedLabel} setSelectedItem={setSelectedLabel} />}
         
       
         <AssigneeSelector teamMembersList={selectedTeamObject} selectedMember={selectedMemberObject} setSelectedMember={setSelectedAssigneeTeamMember} labelTitle="Assignee" />
         </div>


         
         {/* <SelectDate setValue={} value={} /> */}


         {/*  setting the parent issue must wait  , we need to first see how we get the issues lists from the teams */}
         {/* <SelectDialogObjectBased itemsList={} selectedItem={} setSelectedItem={} labelTitle="Set parent issue" /> */}

         </div>
        </DialogContent>
       
          <div className="container-actions flex justify-between my-1">
          <div className="attach-pictures-half">
              <SelectPictures setSelectedItem={updatePictures}/>
          </div>
          <div className="save-changes-half">
              <Button autoFocus onClick={handleSaveChanges}>
                Save changes
              </Button>
          </div>
          </div>


     
      </BootstrapDialog>
    </>
  );
}
