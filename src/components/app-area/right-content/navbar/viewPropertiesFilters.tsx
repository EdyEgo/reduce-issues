import {useState} from 'react';
import Button from '@mui/material/Button';
import { useDispatch ,useSelector} from 'react-redux'; 

import {addCustomViewDisplayPropertie} from '../../../../store/filtersIssues'


interface ViewDisplayPropertiesProps {
    
}
 
const ViewDisplayProperties: React.FC<ViewDisplayPropertiesProps> = () => {
  
    const dispatch = useDispatch()
    const displayProperties = useSelector((state:any)=>state.filtersIssues.viewFilters.default.displayProperties)// this one is here only for test reasons
 
  const retunrFitButtonText = (property:string)=>{
      if(property === 'registeredAt' ) return 'register'
      if(property === 'updatedAt') return 'update'
      if(property === 'dueDate') return 'date'
      return property
  }

  function handleChangePropertyValue(propertyName:string){
      dispatch(addCustomViewDisplayPropertie(propertyName))
  }

    return (
        <div className="display-properties">
             <div className="display-properties__title">
                 Display properties
             </div>
             <div className="display-properties__buttons grid grid-cols-2 grid-rows-2 gap-2 ">
               {Object.entries(displayProperties).map((property)=>{
                   
                   const buttonStyleInactive  = " text-gray-500 cursor-pointer border-blue-200 rounded-md font-sans p-1 text-center border hover:border-blue-400 hover:bg-blue-100 transition-all ease"
                   const buttonStyleActive  =" cursor-pointer border-gray-200 border text-center bg-gray-100 hover:bg-blue-100 hover:border-gray-400 transition-all ease rounded-md font-sans p-1"
                   
                   // is selected
                   const buttonStyle = property[1] ? buttonStyleActive : buttonStyleInactive
                
                   return   <div className={buttonStyle} onClick={()=>{handleChangePropertyValue(property[0])}}>{retunrFitButtonText(property[0]).toUpperCase()}</div>
               })}
             </div>
        </div> 
    );
}
 
export default ViewDisplayProperties;