import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import TeamIcon from "@mui/icons-material/Groups";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import TeamOptions from "./teamOptionsTabs";
import TeamSettingsIcon from "@mui/icons-material/ManageAccounts";

interface TeamItem {
  teamObject: {
    id: string;
    name: string;
    photoURL: null | string;
    identified: string;
  };
  expanded: boolean;
  setExpanded: (argument: any) => void;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const CustomizedAccordions: React.FC<TeamItem> = ({
  expanded,
  setExpanded,
  teamObject,
}) => {
  const navigate = useNavigate();
  const workspaceSelected = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  ); // workspaceURL

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  function goToTeamSettings() {
    navigate(
      `/${workspaceSelected.workspaceURL}/settings/team/${teamObject.identified}`
    );
  }

  function handleChange() {
    setExpanded(!expanded);
  }
  return (
    <div>
      <Accordion expanded={expanded} onChange={() => handleChange()}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div className="container flex items-center ">
            <div className="team-photo flex  items-center">
              {teamObject.photoURL && (
                <img className="m-2" src={teamObject.photoURL} alt="" />
              )}
              {teamObject.photoURL === null && <TeamIcon className="m-2" />}
            </div>
            <div className="team-name">{teamObject.name}</div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="team-options">
            <TeamOptions teamObject={teamObject} />
          </div>

          <div
            onClick={() => {
              goToTeamSettings();
            }}
            className="team-options__settings flex cursor-pointer hover:bg-gray-200 p-1 ml-1 py-2  rounded-md transition-all ease"
          >
            <TeamSettingsIcon />
            <div className="issue ml-1">Settings</div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default CustomizedAccordions;
