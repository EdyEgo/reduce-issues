import * as React from 'react';
import {useSelector} from 'react-redux'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import TeamIcon from '@mui/icons-material/Groups'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import TeamOptions from './teamOptionsTabs'

interface TeamItem {
  teamObject:{id:string,name:string,photoURL:null | string,identified:string},
  expanded:boolean, 
  setExpanded:(argument:any)=>void
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const  CustomizedAccordions: React.FC<TeamItem> = ({expanded,setExpanded,teamObject})=> {
 

  const selectedWorkspace = useSelector(
    (state: any) => state.workspace.selectedWorkSpace
  )// take the id
 

  function handleChange(){
    setExpanded(!expanded)
  }
  return (
    <div>
      <Accordion expanded={expanded } onChange={()=>handleChange()}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div className="team-photo flex gap-2">
           {teamObject.photoURL && <img className='m-2' src={teamObject.photoURL} alt="" />} 
           {teamObject.photoURL === null && <TeamIcon className='m-2'/>}
          </div>
          <div className="team-name">{teamObject.name}</div>
         
        </AccordionSummary>
        <AccordionDetails>
          <div className="team-options">
            <TeamOptions teamObject={teamObject}/>
          </div>
        </AccordionDetails>
      </Accordion>
   
    </div>
  );
}
export default CustomizedAccordions