import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';

import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';



interface SelectProps{
    teamMembersList:{[key:string]:any},
    setSelectedMember:(argument:any)=>void,
    selectedMember:{name:string,photoURL:string | null,id:string | null},
    labelTitle:string,
    
}

 const  SelectAutoWidth: React.FC<SelectProps>  = ({teamMembersList,setSelectedMember,selectedMember,labelTitle})=> {

  const workspaceMembers = useSelector((state:any)=>state.workspace.members)



  function returnWorspaceMemberObjectById(id:string){
      return workspaceMembers.find((member:any)=>member.id === id)
  }

  function returnElementOption(userObject:any){
    
 
     return <div className='member-option pointer-events-none flex gap-2'>
         <div className="profile-container">
                    {userObject.photoURL == null && (
                    <div className="no-profile-picture">
                        <PersonIcon />
                    </div>
                    )}
                    {userObject.photoURL && (
                    <div className="profile-picture ">
                       
                        <img
                        alt={userObject.photoURL}
                        src={userObject.photoURL}
                        className="rounded-full max-w-5 max-h-5"
                        />
                    </div>
                    )}
         </div>
         <div className="name-container flex gap-1">
             <div className="first-name">{userObject.firstName} </div>
             <div className="last-name">{userObject.lastName}</div>
             
         </div>
                
     </div>
  }
 
 

 




  // setup 

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }; 

  function generateItemList(){
    const list = Object.entries(teamMembersList)
    if(list.length <= 0) return []
  
        return list.map((item)=>{
            const userObject = returnWorspaceMemberObjectById(item[0])
          return (<MenuItem value={userObject} onClick={()=>{setSelectedMember(userObject);handleClose()}}>{returnElementOption(userObject)}</MenuItem>)
      })
  

  

  } 

  return (
    <div>
    

<Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
          {selectedMember.id === null && labelTitle}
       {selectedMember.id !== null && <MenuItem value={selectedMember.id}>{returnElementOption(selectedMember)}</MenuItem>}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {generateItemList()}
      </Menu>
    </div>
  );
} 

export default SelectAutoWidth;