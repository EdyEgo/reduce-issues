import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function MaterialUIPickers({value,setValue,disableButton}:{value:Date | null,setValue:(argument:any)=>void,disableButton:boolean}) {

 if(value === null) value = new Date()
  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <div className="container-due-date w-8/12">
 <LocalizationProvider dateAdapter={AdapterDateFns} >
      <Stack spacing={2}>
       

        <DateTimePicker disabled={disableButton}
          label=" Set due date"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
    </div>
   
  );
}