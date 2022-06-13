import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import DropDownTabIs from './dropDownTabIsSelector'
import DropDownTabProperySelector from './dropDownPropertySelector'
import {removeAllFilterListItemsByType} from '../../../../../store/filtersIssues'



interface UserFilterTabProps {
    type:"assignee" | "creator"
}
 
const UserFilterTab: React.FC<UserFilterTabProps> = ({type}) => {
   
    const title = type === "assignee" ? "Assignee" : "Creator"// you could just make the [0] uppperCase
    
    const dispatch = useDispatch()
    const filtersListOrder = useSelector((state:any)=>state.filtersIssues.filtersListOrder)

    const isTabDropDownMenu =  React.useRef(null)
    const [tabDropDownIsOpen,setTabDropDownIsOpen] = React.useState(false)
    const propertiesSelectorTabDropDown =  React.useRef(null)
    const [propertiesSelectorTabDropDownIsOpen,setPropertiesSelectorTabDropDownIsOpen] = React.useState(false)

    function labelStatusSelectorDisplay(){
        // add a function that makes them all false or true , on .is properties
     const statesNumber = filtersListOrder[type].length 
      const statesArePositive = filtersListOrder[type][0].is
     
   if(statesArePositive){
     return (
         <div className="status-text cursor-pointer hover:bg-gray-100 p-1 rounded-sm">
             {statesNumber > 1 && <span>is either of </span>}
             {statesNumber <= 1 && <span>is </span>}
            
         </div>
     )
   }
 
   return (
     <div className="status-text cursor-pointer hover:bg-gray-100 p-1 rounded-sm" >
          <span>is not </span>
     </div>
   )
       
     
        
    }


    function labelSelectorHandler(){
        const statesNumber = filtersListOrder[type].length 
        if(statesNumber > 1){
            return (<div className="label-states-number  cursor-pointer hover:bg-gray-100 p-1 rounded-sm">
                <div className="states-number">{statesNumber} </div>
                <div className="label-states-plural">members</div>
            </div>) 



            
        }
 
        return    (
            <div className="selected-label-title flex gap-1 text-center cursor-pointer hover:bg-gray-100 p-1">
               <div className="icon-container flex items-center">
                  
                {  filtersListOrder[type][0].value.photoURL != null && <div className="photo flex items-center">
                    
                     <Avatar  sx={{ width: 20, height: 20 }}  alt="user img" src={filtersListOrder[type][0].value.photoURL} />
                 </div>}
                 {  filtersListOrder[type][0].value.photoURL === null && <div className="photo">
                     <AccountCircleIcon/>
                 </div>}
                   
                 </div>
                 <div className="label-name text-xs w-full flex items-center gap-1">
                     <div className="first-name">{filtersListOrder[type][0].value.firstName}</div>
                     <div className="last-name">{filtersListOrder[type][0].value.lastName}</div>
                 

                 
                   
                 </div>
            </div>
        ) 



    }
  

    function removeAllItems(){
      
   
        dispatch(removeAllFilterListItemsByType(type))
    }


    return (     
        <div className="font-serif label-container flex justify-between items-center border border-gray-200 rounded-md gap-2 pl-1">
             <div className="label-title flex items-center gap-1">
                 <div className="icon-container ">
                  <AccountCircleIcon />
                   
                
                 </div>
                 <div className="label-name">
                     {title}
                 </div>
             
             </div>
             
             <div className="label-filter-status-selector w-2/12" ref={isTabDropDownMenu} onClick={()=>{setTabDropDownIsOpen(!tabDropDownIsOpen)}}>
                   {labelStatusSelectorDisplay()}
             </div>

             <div className="label-selector w-5/12 text-center" ref={propertiesSelectorTabDropDown} onClick={()=>{setPropertiesSelectorTabDropDownIsOpen(true)}}>
                  {labelSelectorHandler()}
             </div>

             <div className="label-cancel cursor-pointer hover:bg-gray-100 p-1 rounded-sm" onClick={removeAllItems}>
                 <ClearIcon className='pointer-events-none'/>
             </div>

             <div className="drop-down-menu-is-selector">
                   <DropDownTabIs anchorRef={isTabDropDownMenu} labelType={type} open={tabDropDownIsOpen} setOpen={setTabDropDownIsOpen}/>
             </div>

             <div className="label-selector-drop-down-menu">
                <DropDownTabProperySelector anchorRef={propertiesSelectorTabDropDown} checkboxType={type} open={propertiesSelectorTabDropDownIsOpen} setOpen={setPropertiesSelectorTabDropDownIsOpen} />
             </div>
        </div>
    );
}
 
export default UserFilterTab;