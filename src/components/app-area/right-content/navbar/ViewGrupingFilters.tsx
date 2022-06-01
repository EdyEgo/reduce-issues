import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useDispatch ,useSelector} from 'react-redux';
import {addCustomViewGrupingBy,addCustomViewOrderingBy,addCustomViewDisplayPropertie} from '../../../../store/filtersIssues'


interface ViewGrupingFiltersProps {
    
}
 
const ViewGrupingFilters: React.FC<ViewGrupingFiltersProps> = () => {

   const dispatch = useDispatch()
    const filtersIssuesStore = useSelector((state:any)=>state.filtersIssues.filtersListOrder)// this one is here only for test reasons
 


    return ( <div className="gruping-container">
        <div className="gruping-row flex gap-2 items-center">
            <div className="gruping-row__title">Gruping</div>
         <div className="gruping-row__selector">
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    
                    <NativeSelect
                    defaultValue={'status'}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                    >
                    <option value={'status'}>Status</option>
                    <option value={'priority'}>Priority</option>
                    <option value={'assignee'}>Assignee</option>
                    <option value={undefined}>No grouping</option>
                    </NativeSelect>
                </FormControl>
            </Box>
         </div>
        </div>
    </div> );
}
 
export default ViewGrupingFilters;