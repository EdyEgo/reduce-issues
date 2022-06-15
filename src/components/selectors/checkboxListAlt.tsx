import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { useDispatch , useSelector} from 'react-redux'
import {addToFilterList,addToFilterListUser, removeItemAtUnkownedIndex,removeUserAtUnkownedIndex} from '../../store/filtersIssues'

import ExtractFitIconNoDinamic from './helpers/extractFitIconNoDinamic'

import {labelsList,priorityList,statusList} from '../../composables/modalOptions/issues'

import { useParams } from 'react-router-dom'

export default function CheckboxListSecondary({checkboxType}:{checkboxType:string | null}) {

    
    const [items,setItems]  = React.useState<any[]>([])

   const dispatch = useDispatch() 
   const params = useParams() 
   
   const filtersIssuesStore = useSelector((state:any)=>state.filtersIssues.filtersListOrder) // verifi if there is a selected property in  store

   const teamsList = useSelector( // we are gonna use this list both for the assignee and the creator
    (state: any) => state.team.teamList
  ); // on an index , zero for example you can take the .membersId property to load the members of that selected  team
  
 function findTeamId(teamList:any[]){
   if(params?.teamURL == null) return null
  return teamList.find((team)=>team.identified.toLowerCase() === params.teamURL).id
 }

  const workspaceMembers = useSelector((state:any)=>state.workspace.members)
  
  const selectedTeamId = findTeamId(teamsList)//useSelector((state:any)=>state.selectedTab.selectedTabAppArea.selectedTeamId)
  const selectedTeamObject = teamsList.find((team:any)=>team.id === selectedTeamId)

 

  
 


  function handleSettingFiltersIssues({deselected,addItem,removeItem}:{deselected:boolean , addItem?:any,removeItem?:any}){
     // can be : -->  assignee , creator , status , label , priority , dueDate <--

    if(checkboxType === null) return

      // asignee first

      if(deselected && checkboxType === 'assignee' ||  deselected && checkboxType === 'creator'){
        // const filterItemObject = {is:true,value:returnFitFilterValueByIndexAndcheckboxType(filterIndex)}
        
        dispatch(removeUserAtUnkownedIndex({item:removeItem,type:checkboxType}))
        return 
         
      
      }

      if(checkboxType === 'assignee' || checkboxType === 'creator') {
       
    // const userObject = returnFitFilterValueByIndexAndcheckboxType(filterIndex)
    //      const filterItemObject = {userId:userObject.id,is:true,value:{firstName:userObject.firstName,lastName:userObject.lastName,photoURL:userObject.photoURL}}// left here too
         dispatch(addToFilterListUser({item:addItem,type:checkboxType}))
         return 
      }

     if( addItem != null && deselected === false){
     // first search if 
//    const filterItemObject = {is:true,value:returnFitFilterValueByIndexAndcheckboxType(filterIndex)}
   
     dispatch(addToFilterList({item:addItem,type:checkboxType}))
     
     return 
     }
     if(removeItem != null && deselected){ 
   
        // const filterItemObject = {is:true,value:returnFitFilterValueByIndexAndcheckboxType(filterIndex)}
      
        dispatch(removeItemAtUnkownedIndex({item:removeItem,type:checkboxType}))
        return 

     }
  }

  const handleToggle = (itemClicked:any,value: number) => () => {
 

    // const currentItem = items[value]
    // const copyItems = [...items]
    if(!checkboxType) return
    const  currentItem =   filtersIssuesStore[checkboxType].find((item:any)=>item.value.name === itemClicked.name)

 


    if (!currentItem) {
      
        handleSettingFiltersIssues({deselected:false,addItem:itemClicked})
  
      return 
      
    }
        handleSettingFiltersIssues({deselected:true,removeItem:currentItem})
 
    
  };

  function returnFilteredMember(assigned:boolean){ 

    let storeSelected:any  ;
    if(checkboxType) storeSelected =filtersIssuesStore[checkboxType]



     const teamMembers =  Object.entries(selectedTeamObject.membersId)

     if(teamMembers.length <= 0) return ''
    

     const createdElements =  teamMembers.map((valueMember,index)=>{
     
          const memberId = valueMember[0]
          const findMemberObjectInWorkspace = workspaceMembers.find((member:any)=>member.id === memberId)
           
          let associatedNumber = null
          
          if(assigned && selectedTeamObject?.assignedIssues)associatedNumber = selectedTeamObject.assignedIssues

          if(!assigned && selectedTeamObject?.issuesNumber)associatedNumber = selectedTeamObject.issuesNumber

        //   availableItems.push({...findMemberObjectInWorkspace,checked:false,associatedNumber})
  
        const findStoredValue = storeSelected.find((item:any)=>item.value.id === findMemberObjectInWorkspace.id)
                  
                
        const checked = findStoredValue != null ? true : false
         
          return returnElementOption({index,
             name:findMemberObjectInWorkspace.firstName + ' ' + findMemberObjectInWorkspace.lastName,id:findMemberObjectInWorkspace.id
             ,firstName:findMemberObjectInWorkspace.firstName ,lastName:findMemberObjectInWorkspace.lastName,
             photoURL:findMemberObjectInWorkspace.photoURL,checked,associatedNumber
            })
      })
   

      return createdElements
  }

  function returnListItemsByCheckBoxType(){ // filtersIssuesStore
   
    let storeSelected:any  ;
    if(checkboxType) storeSelected =filtersIssuesStore[checkboxType]

       const listTypes:{[key:string]:any} = {
        status:()=>{
         
          
            const createdElements =  statusList.map(({icon,name},index)=>{ 
              const associatedNumber = selectedTeamObject?.createdStatus &&  selectedTeamObject.createdStatus[name] ?
              selectedTeamObject.createdStatus[name] : null 
                // availableItems.push({icon,name,checked:false,associatedNumber})
                const findStoredValue = storeSelected.find((item:any)=>item.value.name === name)
                  
                  
                const checked = findStoredValue != null
                if(checked != undefined)return returnElementOption({icon,name,index,checked,associatedNumber})
                return returnElementOption({icon,name,index,checked:false,associatedNumber})
            }) 

            //  setItems(availableItems)
            return createdElements


         
        },
        assignee:()=>{ 

          return returnFilteredMember(true)
         
         
        },
        creator:()=>{
            
            return returnFilteredMember(false)
        },
        priority:()=>{ 
          

          
            const createdElements =  priorityList.map(({icon,name},index)=>{ 
   
              const associatedNumber = selectedTeamObject?.createdPriority &&  selectedTeamObject.createdPriority[name] ?
              selectedTeamObject.createdPriority[name] : null 
                // availableItems.push({icon,name,checked:false,associatedNumber}) 

                const findStoredValue = storeSelected.find((item:any)=>item.value.name === name)
                  
                  
                const checked = findStoredValue != null
                if(checked != undefined)return returnElementOption({icon,name,index,checked,associatedNumber})
                
                return returnElementOption({icon,name,index,checked:false,associatedNumber})
            }) 

            // setItems(availableItems)
            return createdElements

        },
        labels:()=>{ 
       
            const createdElements =  labelsList.map(({icon,name},index)=>{ 
              const associatedNumber = selectedTeamObject?.createdLabel &&  selectedTeamObject.createdLabel[name] ?
              selectedTeamObject.createdLabel[name] : null 
                // availableItems.push({icon,name,checked:false,associatedNumber})
                const findStoredValue = storeSelected.find((item:any)=>item.value.name === name)
                  
                  
                const checked = findStoredValue != null
                if(checked != undefined)return returnElementOption({icon,name,index,checked,associatedNumber})

                return returnElementOption({icon,name,index,checked:false,associatedNumber})
            })
            // setItems(availableItems)
            return createdElements
        },
        dueDate:()=>{
            return ''
        },
       } 
      
       if(checkboxType === null) return ''
      const elements =   listTypes[checkboxType]()
   

      return elements

  } 

//

  function returnElementOption(item:{checked:boolean,icon?:string,associatedNumber?:number,name:string ,index:number,photoURL?:string,firstName?:string,lastName?:string,id?:string}){
    const {icon,name,index,photoURL,firstName,lastName,checked,associatedNumber} = item


    return      (<ListItem 
        key={index}
        secondaryAction={
          <Checkbox
           key={index + 1}
            edge="end"
            onChange={handleToggle(item,index)}
            checked={checked}
            inputProps={{ 'aria-labelledby': name  }}
          />
        }
        disablePadding
      >
        <ListItemButton key={index + 2}>
          <ListItemAvatar key={index + 3}>
            {photoURL && <Avatar
              alt={`name`}
              src={photoURL}
            />}
            {icon && 
               
                ExtractFitIconNoDinamic({iconName:icon,index})
            }
            {
               photoURL === null && firstName && 
                <div className='icon-placeholder rounded-full' key={index + 4}>
                     <span className='first-name-letter' key={index + 5}>{firstName[0]}</span>
                     {lastName && <span className='last-name-letter' key={index + 6}>{lastName[0]}</span>}
                
                </div>
            }
          </ListItemAvatar>
          {firstName == null &&<ListItemText id={name} primary={name} key={index + 7}/>} 
          {firstName && lastName == null && <ListItemText id={firstName} primary={firstName} key={index + 8}/>}
          {firstName && lastName && <ListItemText key={index + 9} id={firstName} primary={firstName + ' ' + lastName} />}
          {associatedNumber != null && <div className="associated-number ml-2" key={index + 10}>{associatedNumber}</div>}
        </ListItemButton>
      </ListItem>)
 
 



  }


  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
       {returnListItemsByCheckBoxType()}
    </List>
  );
}