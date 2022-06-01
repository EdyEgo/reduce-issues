import ArrowDown from '@mui/icons-material/KeyboardArrowDownSharp';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


interface FiltersButtonProps {
    
} 
 
const FiltersButton: React.FC<FiltersButtonProps> = () => {
    return (  
        <div className="view-button cursor-pointer flex text-sm items-center justify-between font-light border px-1 border-gray-200"> 
        <div className="view-button__icon pointer-events-none">
            <FormatListBulletedIcon fontSize='small'/>
        </div>
        <div className="view-button__text text-lg p-1 pointer-events-none">View</div>
        <div className="view-button__arrow-down pointer-events-none">
            <ArrowDown fontSize='small'/>
        </div>
   </div>
    );
}
 
export default FiltersButton;