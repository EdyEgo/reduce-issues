import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectProps{
    itemsList:{[key:string]:any},
    setSelectedItem:(argument:any)=>void,
    selectedItem:string,
    labelTitle:string,
    returnIdAsValue?:boolean
}

 const  SelectAutoWidth: React.FC<SelectProps>  = ({itemsList,setSelectedItem,selectedItem,labelTitle,returnIdAsValue})=> {


  const handleChange = (event: SelectChangeEvent) => {
 
    setSelectedItem(event.target.value);
  }; 

  function generateItemList(){
    const list = Object.entries(itemsList)
    if(list.length <= 0) return []
    if(returnIdAsValue){
        return list.map((item)=>{
        
          return (<MenuItem value={item[1].id}>{item[1].name}</MenuItem>)
      })
    } 

    return list.map((item)=>{
       
      return (<MenuItem value={item[1]}>{item[1].name}</MenuItem>)
  })

  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-autowidth-label">{labelTitle}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectedItem}
          onChange={handleChange}
          autoWidth
          label={labelTitle}
        >
          {generateItemList()}
        </Select>
      </FormControl>
    </div>
  );
} 

export default SelectAutoWidth;