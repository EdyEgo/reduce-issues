import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import LinearProgress from "@mui/material/LinearProgress";
import DangerDeleteIssue from "@mui/icons-material/ReportProblemSharp";

import Stack from "@mui/material/Stack";

interface SureYouWannaDeleteModalProps {
  deleteModalStatus: boolean;
  warningMessageTitle: string;
  deleteLoginModalStatus: boolean;
  deleteErrorMessage: null | string;
  setDeleteModalStatus: (newValue: boolean) => void;
  executeDelete: () => void;
}

const SureYouWannaDeleteModal: React.FC<SureYouWannaDeleteModalProps> = ({
  deleteModalStatus,
  warningMessageTitle,
  executeDelete,
  setDeleteModalStatus,
  deleteLoginModalStatus,
  deleteErrorMessage,
}) => {
  return (
    <Modal
      open={deleteModalStatus}
      onClose={() => {
        setDeleteModalStatus(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          border: "2px solid white",
          boxShadow: 24,
          p: 3,
        }}
      >
        {deleteLoginModalStatus && (
          <Stack
            sx={{
              width: "100%",
              color: "grey.500",
              visibility: "visible",
            }}
            spacing={2}
          >
            <LinearProgress color="success" />
          </Stack>
        )}
        {deleteLoginModalStatus === false && (
          <Stack
            sx={{
              width: "100%",
              color: "grey.500",
              visibility: "hidden",
            }}
            spacing={2}
          >
            <LinearProgress color="success" />
          </Stack>
        )}
        <div className="container">
          <div className="flex justify-center my-2">
            <DangerDeleteIssue className="text-red-500" />
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {warningMessageTitle}
          </Typography>
          {deleteErrorMessage != null && (
            <div className="text-center text-red-500 visible">
              Could not make the request
            </div>
          )}
          {deleteErrorMessage == null && (
            <div className="text-center text-red-500 invisible">
              placeholder
            </div>
          )}
          <div className="flex justify-between m-2 mt-4">
            <Button
              onClick={() => {
                executeDelete();
              }}
              disabled={deleteLoginModalStatus}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              disabled={deleteLoginModalStatus}
              variant="contained"
              color="success"
              onClick={() => {
                setDeleteModalStatus(false);
                //   setCurrentActivityIndexOpenedModalFor(null);
              }}
            >
              Keep
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SureYouWannaDeleteModal;
