import ReactDOM from 'react-dom';
import * as React from 'react';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';


export interface SignUpProps {
    
}




const SignUp: React.FC<SignUpProps> = () => { 

 
const inputFields = React.useRef({
  email:'',
  firstName:'',
  lastName:'',
  password:'',
  confirmPassword:''
}) 

const [values, setValues] = React.useState<any>({

  password: '',
  confirmPassword:'',
  showPassword:false,
  showConfirmPassword:false,
 

}); 
const [loading, setLoading] = React.useState(false);


function handleSubmit() {
  setLoading(true);
}
 
const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
}; 

const handleClickShowPassword = () => {
  setValues({
    ...values,
    showPassword: !values.showPassword,
  });
}; 
const handleClickShowConfirmPassword = () => {
  setValues({
    ...values,
    showConfirmPassword: !values.showConfirmPassword,
  });
}; 



const handleChange =
(prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setValues({ ...values, [prop]: event.target.value });
};

    return ( 
      <> 
      
      
      <div className="sign-up-form-container flex justify-center">
      <form onSubmit={(event)=>{}} className="flex flex-col my-4 "> 
            <div className="title-sign-up-form flex space-x-2.5  self-center my-4">
              <h1 className="text-xl lg:text-3xl">Let's </h1>
              <h1 id="signUpTitle" className="text-xl lg:text-3xl font-bold "> get started!</h1>
            </div>
         
       

   <div className="inputs-container-sign-up-forms flex flex-col">
     <div className="name-row flex justify-center w-12/12">
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-firstName">First Name</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-firstName"
                  type="text"
                  value={values.firstName}
                  onChange={handleChange('firstName')}
                
                  label="First Name"
                />
              </FormControl> 
              
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-lastName">Last Name</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-lastName"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange('lastName')}
                
                  label="Last Name"
                />
              </FormControl> 
              
        </div>
     <div className="email-row flex ">

              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="email"
                  value={values.email}
                  onChange={handleChange('email')}
                  
                  label="Email"
                />
              </FormControl>
     </div>
     <div className="password-row flex justify-center">

            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
        
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className='outline-hidden'>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirm-password"
                  
                  type={values.showConfirmPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
          </FormControl>

     </div>
       

      <div className="submit-row flex justify-center">

      <Box sx={{ '& > button': { m: 1 } }} >
         
  {/*   */}

{/* endIcon={<SendIcon />} */}
  <LoadingButton 
          size="small"
          onClick={handleSubmit}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Register
        </LoadingButton>
      

            

      </Box>

        
        </div>       
        

              

             
   </div>
  

        

        </form> 
      </div>
       


      {/*  */}
      <div className="hidden">  
        <div className="flex flex-col  space-y-4 pl-[7%] lg:p-0 "> 
          <div className="flex space-x-2.5  self-center">
            <h1 className="text-xl lg:text-3xl">Let's </h1>
            <h1 id="signUpTitle" className="text-xl lg:text-3xl font-bold "> get started!</h1>
          </div>
          
          <div className="flex w-100% translate-x-1  justify-between w-full  pb-2">
            <div className=" w-50%">
              <i className="i-carbon-user absolute p-0.5 lg:p-0 lg:text-2xl self-center ml-.5 mt-1 text-white"></i>
              <input className="w-[calc(100%-3rem)] pl-8 py-2 bg-transparent  border-1  border-[#00FFFF] rounded-md text-white outline-0"  type="" name=""  placeholder="First name"   />
            </div>
            <div className="w-50%">
              <i className="i-carbon-user absolute p-0.5 lg:p-0 lg:text-2xl self-center ml-.5 mt-1 text-white"></i>
              <input className="w-[calc(100%-2.5rem)]  py-2 pl-8 p-1 bg-transparent  border-1  border-[#00FFFF] rounded-md text-white outline-0"  type="" name=""  placeholder="Last name"   />
            </div>
          </div>
          <div className="flex w-full  translate-x-1  justify-between pb-2">  
            <div className=" w-50%">
              <i className="i-carbon-email absolute p-0.5 lg:p-0 lg:text-2xl self-center ml-.5 mt-1 text-white"></i>
              <input className="w-[calc(100%-3rem)] pl-8 py-2 bg-transparent  border-1  border-[#00FFFF] rounded-md text-white outline-0"  type="" name=""  placeholder="Email address"  />
            </div>
            <div className=" w-50%">
              <i className="i-carbon-phone absolute p-0.5 lg:p-0 lg:text-2xl self-center ml-.5 mt-1 text-white"></i>
              <input className=" w-[calc(100%-2.5rem)]  py-2 pl-8 p-1 bg-transparent  border-1  border-[#00FFFF] rounded-md text-white outline-0"  type="text" name=""  placeholder="Phone number"  />
            </div>
          </div>
          <div className="flex w-full  translate-x-1 justify-between pb-2">
            <div className=" w-50%">
              <i className="i-carbon-locked absolute p-0.5 lg:p-0 lg:text-2xl self-center ml-.5 mt-1 text-white"></i>
              <input className="w-[calc(100%-3rem)] pl-8 py-2 bg-transparent  border-1  border-[#00FFFF] rounded-md text-white outline-0"  type="password" name=""  placeholder="Password"  />
            </div>
            <div className=" w-50%">
              <i className="i-carbon-locked absolute p-0.5 lg:p-0 lg:text-2xl self-center ml-.5 mt-1 text-white"></i>
             
              <input className="w-[calc(100%-2.5rem)] py-2 pl-8 p-1 bg-transparent  border-1  border-[#00FFFF] rounded-md text-white outline-0"  type="password" name=""  placeholder="Confirm Password"  />
            </div>
          </div>
          {/* <!-- <input className="placeholder:i-carbon-locked placeholder:p-1 placeholder: p-1 focus:placeholder:bg-transparent bg-transparent border-1  border-[#00FFFF] rounded-md text-white  outline-0"  type="password" name=""   placeholder="s"  v-model="sign_up_inputs.confirm_password"> --> */}
          
          <div className="flex justify-center">
              <div className="border-t-1 border-x-0 border-b-0  border-[#00FFFF] w-[40%] self-center">
              </div>
              <p className="mt-3 mx-5 font-bold text-white">or</p>
              <div className="border-t-1 border-x-0  border-b-0  border-[#00FFFF] w-[40%] self-center">
              </div>
          </div>
          <div className="flex pb-5 justify-center space-x-[10%] self-center w-[100%]">
        {/* <!--     <img id="apple"   src="/assets/icons/apple.svg" className="" alt=""> -->
            <!-- <img id="github" className="cursor-pointer mx-1"  src="/assets/icons/github2.svg" alt="" @click.prevent="async()=>{await sign_in_with_provider({provider_name:'github'})}"> -->
            <!-- <button className="i-mdi-google  self-center text-4xl hover:bg-gray-500 border-0  cursor-pointer bg-white " @click.prevent="async()=>{await sign_in_with_provider({provider_name:'google'})}"></button> -->
            <img id="google" className="cursor-pointer mx-1"  src="/assets/icons/google.svg" alt="" @click.prevent="async()=>{await sign_in_with_provider({provider_name:'google'})}">
            <!-- <img id="facebook" className="cursor-pointer mx-1"  src="/assets/icons/facebook.svg" alt="" @click.prevent="async()=>{await sign_in_with_provider({provider_name:'facebook'})}"> -->
            <!-- <img id="fox" className="cursor-pointer mx-1"  src="/assets/icons/fox1.svg" alt=""> --> */}
           </div>

          {/*  @click.prevent="handleSubmit_Sign_Up"  */}
             <button id="signInButton" v-show="loading_btn_sign_up === false" className="transform-all ease-in-out duration-300  border-0   rounded-md py-3 font-bold text-black cursor-pointer " >Register</button>
         <button v-show="loading_btn_sign_up"   type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                </svg>
                Loading...
          </button>
          <div className="flex self-center">
            <p className="text-sm ">Already on admintools.io?</p>
            {/* @click="()=>{transition_to_sign_method('In')}" */}
            <p   className="text-[#04d9ff] supixel-antialiased cursor-pointer  text-sm ml-1">Sign In</p>
          </div>

           {/* <span  :className="[set_vis_reset_password_msg]" className="text-red self-center">{{ sign_up_password_message }}</span> */}
        </div>
      </div>
     


        {/*  */}
      
      </>


 );
}
 
export default SignUp;

