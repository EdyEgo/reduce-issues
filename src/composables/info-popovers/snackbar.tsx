import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import * as React from "react";
import Stack from "@mui/material/Stack";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({
  openStatus,
  setOpenStatus,
  message,
  severityType,
  setSeverityType,
}: {
  severityType: "error" | "success" | null;
  message: string;
  openStatus: boolean;
  setOpenStatus: (newStatus: boolean) => void;
  setSeverityType: (newSeverity: null | "error" | "success") => void;
}) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenStatus(false);
    setSeverityType(null);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {severityType != null && (
        <Snackbar
          open={openStatus}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={severityType}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
      {/* <Alert severity="error">{errorMessage}</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">{}</Alert> */}
    </Stack>
  );
}
