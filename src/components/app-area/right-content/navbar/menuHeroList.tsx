import MenuItem from "@mui/material/MenuItem";

import StatusIcon from '@mui/icons-material/BlurOn';
import AssigneeIcon from '@mui/icons-material/AccountCircle';
import CreatorIcon from '@mui/icons-material/DriveFileRenameOutline';
import PriorityIcon from '@mui/icons-material/SignalCellularAlt';
import LabelIcon from '@mui/icons-material/Label';
import DueDateIcon from '@mui/icons-material/Event';


interface MenuHeroListProps {
    handleClickItem:(selectedItem:string)=>void
}
 
const MenuHeroList: React.FC<MenuHeroListProps> = ({handleClickItem}) => {

     
    return ( 
            <>
                    <MenuItem
                     onClick={()=>{handleClickItem('status')}}
                    >
                    
                     <span className="icon">
                        <StatusIcon/>
                     </span>
                     <span className="name">
                        Status
                     </span>
                    </MenuItem>
                    <MenuItem
                      onClick={()=>{handleClickItem('assignee')}}
                    >
                    
                     <span className="icon">
                        <AssigneeIcon/>
                     </span>
                     <span className="name">
                        Assignee
                     </span>
                    </MenuItem>
                    

                    <MenuItem
                        onClick={()=>{handleClickItem('creator')}}
                    >
                    <span className="icon">
                        <CreatorIcon/>
                     </span>
                     <span className="name">
                        Creator
                     </span>
                    </MenuItem> 

                    <MenuItem   onClick={()=>{handleClickItem('priority')}} >
                    <span className="icon">
                        <PriorityIcon/>
                     </span>
                     <span className="name">
                        Priority
                     </span>
                    </MenuItem>

                    <MenuItem   onClick={()=>{handleClickItem('label')}} >
                    <span className="icon">
                        <LabelIcon/>
                     </span>
                     <span className="name">
                        Label
                     </span>
                    </MenuItem> 

                    <MenuItem   onClick={()=>{handleClickItem('dueDate')}} >
                    <span className="icon">
                        <DueDateIcon/>
                     </span>
                     <span className="name">
                        Due Date
                     </span>
                    </MenuItem>
            </> 
    
    );
}
 
export default MenuHeroList;