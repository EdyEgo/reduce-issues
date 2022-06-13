import * as React from 'react';
import {useSelector, useDispatch } from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear';
import DropDownTabIs from './dropDownTabIsSelector'
import {removeAllFilterListItemsByType } from '../../../../../store/filtersIssues'
import DropDownTabProperySelector from './dropDownPropertySelector'
import extractFitIconNoDinamic from  '.././../../../../components/selectors/helpers/extractFitIconNoDinamic'

interface LabelFilterTabProps {
    labelType:string,
    representativLabelIconName:string,
    labelTitle:string,
    labelStatesPlural:string
}
 
const LabelFilterTab: React.FC<LabelFilterTabProps> = ({labelType, representativLabelIconName,labelTitle,labelStatesPlural}) => {
  
    const filtersListOrder = useSelector((state:any)=>state.filtersIssues.filtersListOrder)

    const isTabDropDownMenu =  React.useRef(null)
    const [tabDropDownIsOpen,setTabDropDownIsOpen] = React.useState(false)
    const propertiesSelectorTabDropDown =  React.useRef(null)
    const [propertiesSelectorTabDropDownIsOpen,setPropertiesSelectorTabDropDownIsOpen] = React.useState(false)

    const dispatch  = useDispatch()

    function removeAllItems(){
      
   
        dispatch(removeAllFilterListItemsByType(labelType))
    } 


   
 
   function labelStatusSelectorDisplay(){
       // add a function that makes them all false or true , on .is properties
    const statesNumber = filtersListOrder[labelType].length 
     const statesArePositive = filtersListOrder[labelType][0].is
    
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
        const statesNumber = filtersListOrder[labelType].length 
        if(statesNumber > 1){
            return (<div className="label-states-number flex gap-2 cursor-pointer hover:bg-gray-100 rounded-sm p-1 items-center">
                <div className="states-number">{statesNumber} </div>
                <div className="label-states-plural">{labelStatesPlural}</div>
            </div>) 



            
        }
 
        return    (
            <div className="selected-label-title flex gap-2 cursor-pointer hover:bg-gray-100 p-1 items-center">
               <div className="icon-container">
                  
                   {extractFitIconNoDinamic({iconName:filtersListOrder[labelType][0].value.icon,index:1})}
                   
                 </div>
                 <div className="label-name">
                 {filtersListOrder[labelType][0].value.name}
                   
                 </div>
            </div>
        ) 



    }

    return (  
        <div className="font-serif label-container flex   border border-gray-200 rounded-md gap-2 pl-1 ">
             <div className="label-title flex items-center gap-1 ">
                 <div className="icon-container ">
                  
                   {extractFitIconNoDinamic({iconName:representativLabelIconName,index:2})}
                
                 </div>
                 <div className="label-name">
                     {labelTitle}
                 </div>
             
             </div>
             
             <div className="label-filter-status-selector" ref={isTabDropDownMenu} onClick={()=>{setTabDropDownIsOpen(!tabDropDownIsOpen)}}>
                   {labelStatusSelectorDisplay()}
             </div>

             <div className="label-selector" ref={propertiesSelectorTabDropDown} onClick={()=>{setPropertiesSelectorTabDropDownIsOpen(true)}}>
                  {labelSelectorHandler()}
             </div>

             <div className="label-cancel cursor-pointer hover:bg-gray-100 p-1 rounded-sm" onClick={removeAllItems}>
                 <ClearIcon className='pointer-events-none'/>
             </div>

             <div className="drop-down-menu-is-selector">
                   <DropDownTabIs anchorRef={isTabDropDownMenu} labelType={labelType} open={tabDropDownIsOpen} setOpen={setTabDropDownIsOpen}/>
             </div>

             <div className="label-selector-drop-down-menu">
                <DropDownTabProperySelector anchorRef={propertiesSelectorTabDropDown} checkboxType={labelType} open={propertiesSelectorTabDropDownIsOpen} setOpen={setPropertiesSelectorTabDropDownIsOpen} />
             </div>
        </div>
    );
}
 
export default LabelFilterTab;