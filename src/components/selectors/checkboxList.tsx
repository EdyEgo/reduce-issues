import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

import ExtractFitIconNoDinamic from './helpers/extractFitIconNoDinamic'

import {labelsList,priorityList,statusList} from '../../composables/modalOptions/issues'

export default function CheckboxListSecondary({checkboxType}:{checkboxType:string | null}) {
  const [checked, setChecked] = React.useState< number[]>([]);

  const handleToggle = (value: number) => () => {
    //   if(checked.length <= 0) return
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  function returnListItemsByCheckBoxType(){
       const listTypes:{[key:string]:any} = {
        status:()=>{
             
            return statusList.map(({icon,name},index)=>{
                return returnElementOption({icon,name,index})
            })
        },
        assignee:()=>{
return ''
        },
        creator:()=>{
return ''
        },
        priority:()=>{
            return priorityList.map(({icon,name},index)=>{
                return returnElementOption({icon,name,index})
            })
        },
        label:()=>{
            return labelsList.map(({icon,name},index)=>{
                return returnElementOption({icon,name,index})
            })
        },
        dueDate:()=>{
return ''
        },
       } 
      
       if(checkboxType === null) return ''
      const elements =   listTypes[checkboxType]()
   

      return elements

  } 



  function returnElementOption(item:{icon?:string,name:string ,index:number,photoURL?:string,firstName?:string,lastName?:string}){
    const {icon,name,index,photoURL,firstName,lastName} = item


    return      (<ListItem
        key={name}
        secondaryAction={
          <Checkbox
            edge="end"
            onChange={handleToggle(index)}
            checked={checked.indexOf(index) !== -1}
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
                firstName && 
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
console.log('staff are ',labelsList,priorityList,statusList)

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {/* {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${checkboxType } item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })} */} 
test
     {returnListItemsByCheckBoxType()}
    </List>
  );
}