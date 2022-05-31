import DropDownFilter from './dropDownFilter'
import React,{Ref, useRef,useState} from 'react'

interface ContentRightNavBarProps {
    
}
 
const ContentRightNavBar: React.FC<ContentRightNavBarProps> = () => {
    // left here ,  next i will add the filter button (conditioned by team tab if you are in my issues then this filter must be hidden), and view button
    // const 
   const anchorRefFilterDropDown = useRef<any>(null)
   const [openFilter,setOpenFilter] = useState(false) 
    
   const handleToggleFilter = () => {
    setOpenFilter((prevOpen) => !prevOpen);
  };


    return ( 
    
     <div className="nav-bar-inner-container flex justify-between">
          <div className="left-half flex justify-between">
                 <span className="nav-bar-title p-2">Filtered issues</span>
                 <span className="save-to-favorites p-2"></span>
                 <span className="filter-button p-2 border cursor-pointer"   ref={anchorRefFilterDropDown} onClick={handleToggleFilter}>Filter</span>
          </div>
          <div className="right-half">

          </div>
          <div className="drop-down-menus">
              <DropDownFilter anchorRef={anchorRefFilterDropDown} open={openFilter} setOpen={setOpenFilter}/>
          </div>
     </div>
     
  
    );
}
 
export default ContentRightNavBar;