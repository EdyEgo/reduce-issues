import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { useDispatch , useSelector} from 'react-redux'
import {addToFilterList, removeItemAtUnkownedIndex} from '../../store/filtersIssues'

import ExtractFitIconNoDinamic from './helpers/extractFitIconNoDinamic'

import {labelsList,priorityList,statusList} from '../../composables/modalOptions/issues'

export default function CheckboxListSecondary({checkboxType}:{checkboxType:string | null}) {

    // const [checked, setChecked] = React.useState< number[]>([]);
    const [items,setItems]  = React.useState<any[]>([])

   const dispatch = useDispatch()
   const filtersIssuesStore = useSelector((state:any)=>state.filtersIssues.filtersListOrder)// this one is here only for test reasons

   const teamsList = useSelector( // we are gonna use this list both for the assignee and the creator
    (state: any) => state.team.teamList
  ); // on an index , zero for example you can take the .membersId property to load the members of that selected  team
  
  const workspaceMembers = useSelector((state:any)=>state.workspace.members)
  const selectedTeamId = useSelector((state:any)=>state.selectedTab.selectedTabAppArea.selectedTeamId)
  const selectedTeamObject = teamsList.find((team:any)=>team.id === selectedTeamId)

//   function extractSelectedTeam(){
//       if(selectedTeamId === null) return 
//     const selectedTeamObject = teamsList.find((team:any)=>team.id === selectedTeamId)
//     return selectedTeamObject
//   }

  
 

  function returnFitFilterValueByIndexAndcheckboxType(filterListIndex:number){
       const filters:{[key:string]:()=>{name:string,icon:string}} = {
           status:()=>{
              
               return statusList[filterListIndex]
           },
           priority:()=>{
               return priorityList[filterListIndex]
           },
           label:()=>{
               return labelsList[filterListIndex]
           },
           assignee:()=>{
               return {icon:'idk',name:'ya mate'} // left here
           }
       }
        if(checkboxType === null) return {name:'',icon:''}
       return filters[checkboxType]()
  }

  function handleSettingFiltersIssues({deselected,dueDate,assigneeId,creatorId,filterIndex}:{deselected:boolean , filterIndex?:number,assigneeId?:string,creatorId?:string,dueDate?:string}){
     // can be : -->  assignee , creator , status , label , priority , dueDate <--
 
    if(checkboxType === null) return

      // asignee first

      if(checkboxType === 'assignee') {
         console.log('no error here mate') 

        //  const filterItemObject = {name:checkboxType,is:true,value:returnFitFilterValueByIndexAndcheckboxType(filterIndex).name}// left here too
        //  dispatch(addToFilterList(filterItemObject))
         return
      }

     if( filterIndex != null && deselected === false){
     // first search if 
   const filterItemObject = {name:checkboxType,is:true,value:returnFitFilterValueByIndexAndcheckboxType(filterIndex).name}
   
     dispatch(addToFilterList(filterItemObject))
     
     return 
     }
     if(filterIndex != null && deselected){ 
        const filterItemObject = {name:checkboxType,is:true,value:returnFitFilterValueByIndexAndcheckboxType(filterIndex).name}
        dispatch(removeItemAtUnkownedIndex(filterItemObject))
        return 

     }
  }

  const handleToggle = (value: number) => () => {
 

    const currentItem = items[value]
    const copyItems = [...items]
    




    if (currentItem.checked === false) {
        handleSettingFiltersIssues({deselected:false,filterIndex:value})
    //   newChecked.push(value);

    copyItems[value] = {...copyItems[value],checked:true}
      setItems(copyItems)
    } else {
        handleSettingFiltersIssues({deselected:true,filterIndex:value})
    //   newChecked.splice(currentIndex, 1); 

    copyItems[value] = {...copyItems[value],checked:false} 
    setItems(copyItems)
    }

    // setChecked(newChecked);
    
  };

  function returnListItemsByCheckBoxType(){
       const listTypes:{[key:string]:any} = {
        status:()=>{
           

             if(items.length > 0) {
                  
                return items.map(({checked,icon,name}:{icon:string,name:string,checked:boolean},index:number)=>{
                    return returnElementOption({icon,name,index,checked})
                })
             }
       
             const availableItems:any[] = []
            const createdElements =  statusList.map(({icon,name},index)=>{
                availableItems.push({icon,name,checked:false})
                return returnElementOption({icon,name,index,checked:false})
            }) 

             setItems(availableItems)
            return createdElements
            // items
            // 14:30 interviu zoom 
        },
        assignee:()=>{ 
// left here
            // selectedTeamObject.membersId
            // for the assignee we have to look into the selected team membersIds and take from users the loaded team members
            
             const teamMembers =  Object.entries(selectedTeamObject.membersId)

             if(teamMembers.length <= 0) return ''
             const availableItems:any[] = []

             const createdElements =  teamMembers.map((valueMember,index)=>{
             
                  const memberId = valueMember[0]
                  const findMemberObjectInWorkspace = workspaceMembers.find((member:any)=>member.id === memberId)
                  
                  availableItems.push({...findMemberObjectInWorkspace,checked:false})

                  return returnElementOption({index,
                     name:findMemberObjectInWorkspace.firstName + ' ' + findMemberObjectInWorkspace.lastName,
                     firstName:findMemberObjectInWorkspace.firstName ,lastName:findMemberObjectInWorkspace.lastName,
                     photoURL:findMemberObjectInWorkspace.photoURL,checked:false
                    })
              })
              setItems(availableItems)

              return createdElements

         
         
        },
        creator:()=>{
            //same for the  creator
return ''
        },
        priority:()=>{ 
          

            if(items.length > 0) {
                  
                return items.map(({checked,icon,name}:{icon:string,name:string,checked:boolean},index:number)=>{
                    return returnElementOption({icon,name,index,checked})
                })
             } 

             const availableItems:any[] = [] 
            const createdElements =  priorityList.map(({icon,name},index)=>{ 

                availableItems.push({icon,name,checked:false})
                
                return returnElementOption({icon,name,index,checked:false})
            }) 

            setItems(availableItems)
            return createdElements

        },
        label:()=>{ 
         

            if(items.length > 0) {
                  
                return items.map(({checked,icon,name}:{icon:string,name:string,checked:boolean},index:number)=>{
                    return returnElementOption({icon,name,index,checked})
                })
             } 
             const availableItems:any[] = [] 
            const createdElements =  labelsList.map(({icon,name},index)=>{ 

                availableItems.push({icon,name,checked:false})

                return returnElementOption({icon,name,index,checked:false})
            })
            setItems(availableItems)
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



  function returnElementOption(item:{checked:boolean,icon?:string,name:string ,index:number,photoURL?:string,firstName?:string,lastName?:string}){
    const {icon,name,index,photoURL,firstName,lastName,checked} = item


    return      (<ListItem onClick={()=>{console.log('checking the list',filtersIssuesStore,'and selected team id',selectedTeamId,'workspace ',workspaceMembers)}}
        key={name}
        secondaryAction={
          <Checkbox

            edge="end"
            onChange={handleToggle(index)}
            checked={checked}
            inputProps={{ 'aria-labelledby': name  }}
          />
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemAvatar>
            {photoURL && <Avatar
              alt={`name`}
              src={photoURL}
            />}
            {icon && 
               
                ExtractFitIconNoDinamic({iconName:icon})
            }
            {
               photoURL === null && firstName && 
                <div className='icon-placeholder rounded-full'>
                     <span className='first-name-letter'>{firstName[0]}</span>
                     {lastName && <span className='last-name-letter'>{lastName[0]}</span>}
                
                </div>
            }
          </ListItemAvatar>
          <ListItemText id={name} primary={name} />
        </ListItemButton>
      </ListItem>)
 
    //  return <div className='member-option pointer-events-none flex gap-2'>
    //      <div className="icon-container">
    //                <div className="icon"></div>
    //                <React.Suspense fallback={<div></div>}>
    //                {ExtractFitIcon({iconName:icon})}
    //                </React.Suspense>
               
                   
    //      </div>
    //      <div className="name-container ">
             
    //          <div className="label-name">{ name}</div>
             
    //      </div>
                
    //  </div>



  }


  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
       {returnListItemsByCheckBoxType()}
    </List>
  );
}