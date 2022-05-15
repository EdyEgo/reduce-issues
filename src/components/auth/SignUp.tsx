import ReactDOM from 'react-dom';
import TextField from '@mui/material/TextField';

export interface SignUpProps {
    
}




const SignUp: React.FC<SignUpProps> = () => { 

 

    return ( 
      <> 
        <form onSubmit={(event)=>{}}>
        <TextField id="filled-basic" label="Filled" variant="filled" />

        </form>
      
      </>


 );
}
 
export default SignUp;

