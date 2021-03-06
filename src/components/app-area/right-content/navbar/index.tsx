import DropDownFilter from './dropDownFilter'
import ViewFiltersButton from './viewFiltersButton'
import React,{Ref, useRef,useState} from 'react'
import {useParams} from 'react-router-dom'

interface ContentRightNavBarProps {
    noPlustFilter?:boolean,
    replaceFilterWithTitle?:string
}
 
const ContentRightNavBar: React.FC<ContentRightNavBarProps> = ({noPlustFilter,replaceFilterWithTitle}) => {
    

    const params = useParams() // if .teamURL then show + Filter
   const anchorRefFilterDropDown = useRef<any>(null)
   const [openFilter,setOpenFilter] = useState(false) 
    
   const handleToggleFilter = () => {
    setOpenFilter((prevOpen) => !prevOpen);
  };


    return ( 
    
     <div className="nav-bar-inner-container flex justify-between pb-4 border-b m-2">
          <div className="left-half flex justify-between items-center">
                 
               
                 {typeof replaceFilterWithTitle === "string" && <span className="filter-button p-2 cursor-default">{replaceFilterWithTitle}</span>}
                 {  noPlustFilter == null && <span className="filter-button p-2 border cursor-pointer"   ref={anchorRefFilterDropDown} onClick={handleToggleFilter}><span className='plus-sign-filter mr-1'>+</span><span className='filter-title-btn'>Filter</span></span>}
          </div>
          <div className="right-half">
              <ViewFiltersButton/>
          </div>
         {noPlustFilter == null&& <div className="drop-down-menus absolute">
              <DropDownFilter anchorRef={anchorRefFilterDropDown} open={openFilter} setOpen={setOpenFilter}/>
          </div>}
     </div>
     
  
    );
}
 
export default ContentRightNavBar;