import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import CreateWorkspaceForm from './createWorspaceForm'

import { createTheme, ThemeProvider } from '@mui/material/styles';


interface CreateNewWorkspaceProps {
    
}
 
const CreateNewWorkspace: React.FC<CreateNewWorkspaceProps> = () => {

    const theme = createTheme();

    return ( <div className="new-workspace-form-container">

  <CreateWorkspaceForm/>
    </div> );
}
 
export default CreateNewWorkspace;