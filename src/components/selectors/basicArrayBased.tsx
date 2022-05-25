import * as React from 'react';

import MenuItem from '@mui/material/MenuItem';


import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ExtractFitIcon from './helpers/extractFitIcon'

import TestComp from '@mui/icons-material/SignalCellularConnectedNoInternet4Bar';



interface SelectProps{
    itemsList:{name:string,icon:string}[],
    setSelectedItem:(argument:any)=>void,
    selectedItem:{index:number,icon:string,name:string} | null,
    labelTitle:string,disableButton:boolean
    
}

 const  SelectAutoWidth: React.FC<SelectProps>  = ({itemsList,setSelectedItem,selectedItem,labelTitle,disableButton})=> {








  function returnElementOption(item:{icon:string,name:string}){
    const {icon,name} = item
 
     return <div className='member-option pointer-events-none flex gap-2'>
         <div className="icon-container">
                   <div className="icon"></div>
                   <React.Suspense fallback={<div></div>}>
                   {ExtractFitIcon({iconName:icon})}
                   </React.Suspense>
               
                   
         </div>
         <div className="name-container ">
             
             <div className="label-name">{ name}</div>
             
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
    
    if(itemsList.length <= 0) return null
  
     const membersList =  itemsList.map((item,index)=>{
           
          return (<MenuItem value={index} onClick={()=>{setSelectedItem({...item,index});handleClose()}}>{returnElementOption(item)}</MenuItem>)
      })
      
      membersList.unshift(<MenuItem value={-1} onClick={()=>{setSelectedItem(null);handleClose()}}>{labelTitle}</MenuItem>)

      return membersList

  

  } 

  return (
    <div>
    

 <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={disableButton}
      >
          {selectedItem === null && labelTitle}
       {selectedItem !== null && typeof selectedItem?.index === 'number' && <MenuItem value={selectedItem.index}>{returnElementOption(selectedItem)}</MenuItem>}
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