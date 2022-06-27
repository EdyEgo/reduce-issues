import * as React from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Stack from "@mui/material/Stack";
import { useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import LoadingButton from "@mui/lab/LoadingButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props: any) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface SetNewDateModalProps {
  closeNewModal: () => void;
  loading: boolean;
  handleSaveChanges: (newDateValue: any) => void;
  newModalIsOpen: boolean;
}

const SetNewDateModal: React.FC<SetNewDateModalProps> = ({
  closeNewModal,
  loading,
  handleSaveChanges,
  newModalIsOpen,
}) => {
  const [dateValue, setDateValue] = useState<{
    changed: boolean;
    date: Date | null;
  }>({ changed: false, date: new Date() });

  const handleChange = (newValue: Date | null) => {
    setDateValue({ changed: true, date: newValue });
  };

  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  return (
    <div>
      <BootstrapDialog
        onClose={closeNewModal}
        aria-labelledby="customized-dialog-title"
        style={{ top: "-18em" }}
        open={newModalIsOpen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          style={{ padding: "1em" }}
          onClose={closeNewModal}
        >
          <div className="title-and-select-team-container flex flex-col items-center pt-1 gap-3">
            <div className="title "> Select a due date</div>
          </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="container-due-date p-4 mt-4">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={2} className="">
                <DateTimePicker
                  label="Set due date"
                  value={dateValue.date}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </div>

          <div className="error-message-container py-1 text-center">
            {errorMessage == null && (
              <div className="error-placeholder invisible">
                error placeholder
              </div>
            )}
            {errorMessage != null && (
              <div className="error-message text-red-400 font-semibold">
                {errorMessage}
              </div>
            )}
          </div>
        </DialogContent>
        <div className="container-actions flex justify-between items-center my-1">
          <div className="save-changes-half py-2 pl-2">
            <LoadingButton
              onClick={() => {
                if (dateValue.changed === false) {
                  setErrorMessage("Please choose a date before saveing");
                  setTimeout(() => {
                    setErrorMessage(null);
                  }, 3000);
                  return;
                }
                handleSaveChanges(dateValue.date);
              }}
              loading={loading}
              variant="outlined"
              disabled={loading}
            >
              Save changes
            </LoadingButton>
          </div>
        </div>
      </BootstrapDialog>
    </div>
  );
};

export default SetNewDateModal;
