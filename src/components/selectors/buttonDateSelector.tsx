import Stack from "@mui/material/Stack";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function ButtonDateSelector() {
  const [dateValue, setDateValue] = useState<null | Date>(null);

  const handleChange = (newValue: Date | null) => {
    setDateValue(newValue);
  };

  // let s use open
  return (
    <div className="container-due-date">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={2} className="">
          <DateTimePicker
            label="Set due Date"
            value={dateValue}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
}
