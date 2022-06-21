import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changenewIssueModalOpenStatus } from "../../../store/issues";

import {
  postIssue,
  postIssueActivity,
  addPicturesURLToIssue,
  addIssuePicturesToStore,
} from "../../../api/dataBaseIssuesMethods";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import SelectDialogObjectBased from "../../selectors/basicObjectBased";
import SelectDialogArrayBased from "../../selectors/basicArrayBased";
import AssigneeSelector from "../../selectors/assigneeSelector";
import SelectPictures from "../../selectors/selectPictures";
import SelectDate from "../../selectors/basicDateSelector";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  labelsList,
  priorityList,
  statusList,
} from "../../../composables/modalOptions/issues";

// saveing the issues img is gonna be interesting , maybe the workspace id will be a good fit

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
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

export default function NewIssueModal() {
  const dispatch = useDispatch();
  const authUser = useSelector((state: any) => state.auth.user);
  const newIssueModalIsOpen = useSelector(
    (state: any) => state.issues.newIssueModalOpenStatus
  );

  const newIssueModalIsOpenWithPreloadedData = useSelector(
    (state: any) => state.issues.openModalWithPreloadedData
  );

  const selectedWorkspace = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  );

  const teamsList = useSelector((state: any) => state.team.teamList);

  const openWithSelectedUser = newIssueModalIsOpenWithPreloadedData?.assignee
    ? newIssueModalIsOpenWithPreloadedData.assignee
    : { photoURL: null, name: "Assignee", id: null };

  function detectPreselectedTypeLabel() {
    if (
      newIssueModalIsOpenWithPreloadedData?.assignee ||
      Object.hasOwn(newIssueModalIsOpenWithPreloadedData, "noAssignee") === true
    )
      return null;
    const labelObject: any = Object.entries(
      newIssueModalIsOpenWithPreloadedData
    )[0];
    if (labelObject == null) return null;
    const type = labelObject[1].grupByName;
    let objectValue = labelObject[1];
    let listToExtractIndex;
    if (type === "status") listToExtractIndex = statusList;
    if (type === "priority") listToExtractIndex = priorityList;

    if (type === "labels") listToExtractIndex = labelsList;

    const labelTypeIndex = listToExtractIndex?.findIndex(
      (item) => item.icon === objectValue.icon
    );
    objectValue = { ...objectValue, index: labelTypeIndex };
    return { type, objectValue };
  }

  const preSelectedTypeLabe = detectPreselectedTypeLabel();

  const openWithPreselectedStatus =
    preSelectedTypeLabe != null && preSelectedTypeLabe.type === "status"
      ? preSelectedTypeLabe.objectValue
      : null;
  const openWithPreselectedPriority =
    preSelectedTypeLabe != null && preSelectedTypeLabe.type === "priority"
      ? preSelectedTypeLabe.objectValue
      : null;
  const openWithPreselectedLabel =
    preSelectedTypeLabe != null && preSelectedTypeLabe.type === "label"
      ? preSelectedTypeLabe.objectValue
      : null;
  // const openWithPreselectedDueDate = preSelectedTypeLabe != null && preSelectedTypeLabe.type === "status" ?  preSelectedTypeLabe.objectValue : null

  const [loading, setLoading] = React.useState(false);
  // this is too much mate :(

  const [selectedTeamObjectMembersId, setSelectedTeamObjectMembersId] =
    React.useState([]);
  const [selectedTeamId, setSelectedTeamId] = React.useState("");
  //this is realllyyyyy too much mate /:(
  const [selectedMemberObject, setSelectedMemberObject] =
    React.useState(openWithSelectedUser);
  const [selectedStatus, setSelectedStatus] = React.useState(
    openWithPreselectedStatus
  );
  const [selectedPriority, setSelectedPriority] = React.useState(
    openWithPreselectedPriority
  );
  const [selectedLabel, setSelectedLabel] = React.useState(
    openWithPreselectedLabel
  );
  const [selectedDueDate, setSelectedDueDate] = React.useState(null);

  const [values, setValues] = React.useState<any>({
    teamId: "",
    title: "",
    text: "",
    pictures: null,

    blockByIssueId: null,
    blockingIssueId: null,
    assignedToUserId: null,
  });

  const handleChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const setSelectedAssigneeTeamMember = (memberObject: any) => {
    setValues({ ...values, assignedToUserId: memberObject.id });
    setSelectedMemberObject(memberObject);
  };

  const updateTeam = (teamId: string) => {
    if (selectedMemberObject.id)
      setSelectedMemberObject({ photoURL: null, name: "Assignee", id: null }); // delete old added member on changeing the team
    setValues({ ...values, teamId });
    const selectedTeamObject = teamsList.find(
      (team: any) => team.id === teamId
    );

    setSelectedTeamObjectMembersId(selectedTeamObject.membersId);
    setSelectedTeamId(teamId);
  };

  const updatePictures = (event: any) => {
    if (event.target.files.length <= 0) return;
    if (values.pictures === null) {
      setValues({ ...values, pictures: [event.target.files[0]] });

      return;
    }
    const picturesCopy = [...values.pictures];
    picturesCopy.push(event.target.files[0]);
    setValues({ ...values, pictures: picturesCopy });
  };

  function createImgs() {
    if (values.pictures === null) return [];
    return values.pictures.map((imgFile: File, index: number) => {
      return (
        <img
          src={URL.createObjectURL(imgFile)}
          alt="preview image"
          className="my-3"
          key={index}
        />
      );
    });
  }

  function closeNewIssueModal() {
    dispatch(changenewIssueModalOpenStatus({ open: false }));
  }

  async function handleSaveChanges() {
    setLoading(true);

    const {
      pictures,
      teamId,
      title,
      text,

      blockByIssueId,
      blockingIssueId,
      assignedToUserId,
    } = values;

    const newIssueObject = {
      title,
      content: {
        pictureListURL: null, // here are the urls that are gonna be stored in firebase ,
        text,
      },
      creatorId: authUser.uid,
      status: selectedStatus,
      priority: selectedPriority,
      label: selectedLabel,
      dueDate: selectedDueDate,
      blockByIssueId,
      blockingIssueId,
      updatedAt: null,
      assignedToUserId,
    };

    // helpers postIssue,addPicturesURLToIssue , addIssuePicturesToStore

    // first post the issue then we add the pictures to the store if we have any , then we add the
    // the urls to the issue

    const postedIssue: any = await postIssue({
      creatorId: authUser.uid,
      newIssue: newIssueObject,
      workspaceId: selectedWorkspace.id,
      teamId,
    }); // left here

    if (pictures === null || pictures?.length === 0 || postedIssue.error) {
      setLoading(false);
      closeNewIssueModal();
      return;
    }

    // add activity tracker

    // await postIssueActivity({createdIssueId:postedIssue.data.id,creatorId:authUser.uid,teamId,workspaceId:selectedWorkspace.id,
    //   issueTypeIssue:{
    //     iconType:'userAvatar',
    //     actionMessage:'created the issue',
    //     fromMessage: null,
    //     toMessage:null
    //   },type:"action"})

    // add issue pictures to the storage
    const picturesData: any = await addIssuePicturesToStore({
      beforeGeneralPath: `${selectedWorkspace.id}/${teamId}/${postedIssue.data.id}`,
      files: pictures,
    });

    if (picturesData.error) {
      setLoading(false);
      closeNewIssueModal();
      return;
    }
    const mapPicturesURL = picturesData.data.files.map(
      (pictureFile: { snapshot: any; downloadURL: string }) =>
        pictureFile.downloadURL
    );
    // add pictures URL to the created issue

    await addPicturesURLToIssue({
      issueId: postedIssue.data.id,
      teamId,
      workspaceId: selectedWorkspace.id,
      pictureListURL: mapPicturesURL,
    });

    closeNewIssueModal();
    setLoading(false);
    //////////
  }

  return (
    <>
      <BootstrapDialog
        onClose={closeNewIssueModal}
        aria-labelledby="customized-dialog-title"
        open={newIssueModalIsOpen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={closeNewIssueModal}
        >
          <div className="title-and-select-team-container flex flex-col items-center pt-1 gap-3">
            <div className="title "> Create a new issue</div>
            <div className="select-team">
              <SelectDialogObjectBased
                disableButton={loading}
                itemsList={teamsList}
                selectedItem={selectedTeamId}
                setSelectedItem={updateTeam}
                labelTitle="Select Team"
                returnIdAsValue={true}
              />
            </div>
          </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="attach-content-row">
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                value={values.title}
                onChange={handleChange("title")}
                required
                fullWidth
                id="issue-title"
                label="Title"
                name="title"
                type="text"
                autoComplete="title"
                autoFocus
                variant="standard"
              />

              {createImgs()}

              <TextField
                margin="normal"
                value={values.text}
                onChange={handleChange("text")}
                required
                fullWidth
                label="Description"
                name="text"
                type="text"
                id="issue-text"
                variant="standard"
                multiline
              />
            </Box>
          </div>
          <div className="buttons-row flex flex-col px-2">
            <div className="labels-container text-xs flex  justify-center items-center  flex-wrap  p-5">
              {/* <div className="first-half"> */}
              {
                <SelectDialogArrayBased
                  disableButton={loading}
                  itemsList={statusList}
                  labelTitle={"No status"}
                  selectedItem={selectedStatus}
                  setSelectedItem={setSelectedStatus}
                />
              }
              {
                <SelectDialogArrayBased
                  disableButton={loading}
                  itemsList={priorityList}
                  labelTitle={"No priority"}
                  selectedItem={selectedPriority}
                  setSelectedItem={setSelectedPriority}
                />
              }
              {/* </div> */}
              {/* <div className="second-half"> */}
              {
                <SelectDialogArrayBased
                  disableButton={loading}
                  itemsList={labelsList}
                  labelTitle={"No Label"}
                  selectedItem={selectedLabel}
                  setSelectedItem={setSelectedLabel}
                />
              }

              <AssigneeSelector
                disableButton={loading}
                teamMembersList={selectedTeamObjectMembersId}
                selectedMember={selectedMemberObject}
                setSelectedMember={setSelectedAssigneeTeamMember}
                labelTitle="Assignee"
              />
              {/* </div> */}
            </div>

            <div className="due-date-cotaniner  flex justify-center items-center my-2">
              <SelectDate
                disableButton={loading}
                setValue={setSelectedDueDate}
                value={selectedDueDate}
              />
            </div>

            {/*  setting the parent issue must wait  , we need to first see how we get the issues lists from the teams */}
            {/* <SelectDialogObjectBased itemsList={} selectedItem={} setSelectedItem={} labelTitle="Set parent issue" /> */}
          </div>
        </DialogContent>
        <div className="container-actions flex justify-between items-center my-1">
          <div className="attach-pictures-half ">
            <SelectPictures
              setSelectedItem={updatePictures}
              disableButton={loading}
            />
          </div>
          <div className="save-changes-half p-1 pr-2">
            <LoadingButton
              onClick={handleSaveChanges}
              loading={loading}
              variant="outlined"
              disabled={loading}
            >
              Save changes
            </LoadingButton>
          </div>
        </div>
      </BootstrapDialog>
    </>
  );
}
