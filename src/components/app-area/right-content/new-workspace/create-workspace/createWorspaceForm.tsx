import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import WorkOutlineSharpIcon from '@mui/icons-material/WorkOutlineSharp';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createNewWorkspaceWithTeam} from '../../../../../api/dataBaseWorkSpaceMethods'


const theme = createTheme();

export default function CreateNewWorkspace() {
   
    const navigate = useNavigate()
    const authUser = useSelector((state:any)=>state.auth.user)
    const selectedWorkspace = useSelector((state:any)=>state.workspace.selectedWorkSpace)  
    const [loading , setLoading] = React.useState(false)
    const [errorMessage,setErrorMessage] = React.useState<null | string>(null)
 const [workspaceName,setWorkspaceName] = React.useState('')
 const [teamName,setTeamName] = React.useState('')

 function testForSpecialCharacters(checkedString:string){
    const SPECIAL_CHARACTERS_REGEX =  /^[a-zA-Z0-9\s]*$/g
    return SPECIAL_CHARACTERS_REGEX.test(checkedString) ? true : false
 }

  const handleSubmit = async (event: any) => {//React.FormEvent<HTMLFormElement>
    event.preventDefault();
    setLoading(true)

  
  // remember to add that workspace id to the user object in users collection  !!!!!
  if(workspaceName.trim() === "" || teamName.trim() === "") {
    setLoading(false)
    setErrorMessage('Please complete all fields!')
    setTimeout(()=>{
        setErrorMessage(null)
    },3000)
    return 
  }
  const testWorkspaceName = testForSpecialCharacters(workspaceName)
  const testTeamName = testForSpecialCharacters(teamName)

  if(testWorkspaceName === false || testTeamName === false) {
    setLoading(false)
    setErrorMessage("Please don't use special characters!")
    setTimeout(()=>{
        setErrorMessage(null)
    },3000)
    return 
  }
  
   const result =  await createNewWorkspaceWithTeam(workspaceName,authUser,teamName,selectedWorkspace)
   navigate('/')
   // if error:false then extract result.data.team(same here  .error an .data)
   // and  result.data.workspace(same here  .error an .data)  ////////// LEFT HERE
   // NEXT will update the store with the created workspace , and team ,
   // btw the new created workspace is the selected workspace , may just go to home and use that useEffect to reFetch for a refresh on data , 
   //with unsubs from the issues , and useNavigate to go to "/"
   // you can just create a variable in the store so that useEffect to be able to watch it so he can refresh

   //  TEAM IS NOT CREATED AS A SUB COLLECTION 

   // REEEEEEMEMBER TO CHECK FOR THE NAMES TO BE AT LEAST 4 CHARACTERS LONG
   console.log("have i created a new workspace dang it",result)


   setLoading(false)
  };

 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'secondary.main' }}>
            {    !loading && <WorkOutlineSharpIcon  />}
            {loading && <LoadingButton loading variant="text">
             
           </LoadingButton>}
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a new workspace
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="workspace-name"
              label="Worspace Name"
              name="workspaceName"
              value={workspaceName}
              onChange={(event)=>setWorkspaceName(event.target.value)}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="team-name"
              label="Team Name"
              name="teamName"
              value={teamName}
              onChange={(event)=>setTeamName(event.target.value)}
              autoFocus
            />
          
         

         {errorMessage === null ? 
          (<div className="error-message-container invisible p-2">
             placeholder
         </div>) : 
         (<div className="error-message-container visible text-red-500 p-2 font-semibold font-sans text-center">
           {errorMessage}
          </div>)  
         }
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
               

              {    !loading && "Create Worspace"}
            {loading && 
            <LoadingButton loading variant="text">
             placeholder
           </LoadingButton>}
            </Button>
            
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}