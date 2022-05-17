// import * as React from "react";
// import { signIn, signInWithProvider } from "../../../api/dataBaseAuthMethods";
// import handleErrorMessage from "../../../api/handleErrorMessages";
// import {
//   timeoutErrorSet,
//   validateEmail,
//   validatePasswordFormat,
// } from "../../../composables/authFormHelpers";

// import InputLabel from "@mui/material/InputLabel";
// import { styled } from "@mui/material/styles";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import FormControl from "@mui/material/FormControl";
// import InputAdornment from "@mui/material/InputAdornment";

// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import LoadingButton from "@mui/lab/LoadingButton";
// import IconButton from "@mui/material/IconButton";
// import Stack from "@mui/material/Stack";
// import GoogleIcon from "@mui/icons-material/Google";

// import SendIcon from "@mui/icons-material/Send";
// import Box from "@mui/material/Box";

// const Input = styled("input")({
//   display: "none",
// });

// interface SingInProps {}

// const SingIn: React.FC<SingInProps> = () => {
//   const [values, setValues] = React.useState<any>({
//     email: "",
//     password: "",

//     showPassword: false,
//   });

//   const [loading, setLoading] = React.useState(false);

//   const [errorMessage, setErrorMessage] = React.useState<null | string>(
//     "invisible"
//   );

//   async function handleProviderSubmit(providerName: string) {
//     const providerList: { [key: string]: () => void } = {
//       google: async () => {
//         // sign up with google here
//         await signInWithProvider("google");
//       },
//     };
//     await providerList[providerName]();
//   }

//   const handleMouseDownPassword = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     event.preventDefault();
//   };

//   const handleClickShowPassword = () => {
//     setValues({
//       ...values,
//       showPassword: !values.showPassword,
//     });
//   };

//   const handleChange =
//     (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
//       setValues({ ...values, [prop]: event.target.value });
//     };

//   async function handleSubmit() {
//     if (validateEmail(values.email) === false) {
//       timeoutErrorSet(setErrorMessage, "Please enter a valid email !");
//       return;
//     }
//     if (validatePasswordFormat(values.password) === false) {
//       timeoutErrorSet(
//         setErrorMessage,
//         "Password must contain at least 8 characters long !"
//       );
//       return;
//     }

//     setLoading(true);

//     const signedInUserResponse = await signIn(values);

//     setLoading(false);

//     if (signedInUserResponse.error) {
//       timeoutErrorSet(
//         setErrorMessage,
//         handleErrorMessage(signedInUserResponse.message),
//         5000
//       );
//     }
//   }

//   return (
//     <>
//       <div className="sign-up-form-container flex justify-center ">
//         <form onSubmit={(event) => {}} className="flex flex-col my-2  w-4/12">
//           <div className="title-sign-in-row flex space-x-2.5  self-center ">
//             <h1 className="text-xl lg:text-3xl">Welcome </h1>

//             <h1 id="signUpTitle" className="text-xl lg:text-3xl font-bold ">
//               {" "}
//               back!
//             </h1>
//           </div>

//           {
//             <div
//               className={`error-message-container text-center p-3  text-red-600 ${
//                 errorMessage === "invisible" ? errorMessage : ""
//               }`}
//             >
//               {errorMessage}
//             </div>
//           }
//           <div className="inputs-container-sign-up-forms flex flex-col">
//             <div className="email-row  w-12/12">
//               <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
//                 <InputLabel htmlFor="outlined-adornment-email">
//                   Email
//                 </InputLabel>
//                 <OutlinedInput
//                   id="outlined-adornment-email"
//                   type="email"
//                   value={values.email}
//                   onChange={handleChange("email")}
//                   label="Email"
//                 />
//               </FormControl>
//             </div>

//             <div className="password-row ">
//               <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
//                 <InputLabel htmlFor="outlined-adornment-password">
//                   Password
//                 </InputLabel>
//                 <OutlinedInput
//                   id="outlined-adornment-password"
//                   type={values.showPassword ? "text" : "password"}
//                   value={values.password}
//                   onChange={handleChange("password")}
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={handleClickShowPassword}
//                         onMouseDown={handleMouseDownPassword}
//                         edge="end"
//                       >
//                         {values.showPassword ? (
//                           <VisibilityOff />
//                         ) : (
//                           <Visibility />
//                         )}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                   label="Password"
//                 />
//               </FormControl>
//             </div>

//             <div className="remember-me-and-forgot-password-row">
//               <div className="flex justify-between">
//                 <div className="flex">
//                   <input
//                     aria-describedby="remember"
//                     name="remember"
//                     type="checkbox"
//                     className="w-3 h-3 outline-none  self-center border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
//                     required
//                   />
//                   <p className="subpixel-antialiased m-0   text-xs lg:text-sm mx-1  text-gray-500">
//                     Remember me{" "}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="subpixel-antialiased m-0   text-xs lg:text-sm cursor-pointer  hover:text-[#00FFFF] text-gray-500  ">
//                     {/* Forgot password?{" "} */}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="or-sign-method-row flex justify-center items-center my-2">
//               <div className="border-t bg-gray-600  border-b  border-gray-600 w-5/12 self-center"></div>
//               <p className="mt-1 pb-1 mx-4 font-bold text-black">OR</p>
//               <div className="border-t bg-gray-600  border-b  border-gray-600 w-5/12 self-center"></div>
//             </div>

//             <div className="provider-sign-method-row flex justify-center my-2">
//               <Stack direction="row" alignItems="center" spacing={2}>
//                 <label htmlFor="icon-button-file">
//                   <Input
//                     onClick={() => {
//                       handleProviderSubmit("google");
//                     }}
//                     id="icon-button-file"
//                     type="button"
//                   />
//                   <IconButton
//                     color="primary"
//                     aria-label="upload picture"
//                     component="span"
//                   >
//                     <GoogleIcon />
//                   </IconButton>
//                 </label>
//               </Stack>
//             </div>

//             <div className="submit-row flex justify-center">
//               <Box sx={{ "& > button": { m: 1 } }}>
//                 {/*   */}

//                 {/* endIcon={<SendIcon />} */}
//                 <LoadingButton
//                   size="small"
//                   onClick={handleSubmit}
//                   endIcon={<SendIcon />}
//                   loading={loading}
//                   loadingPosition="end"
//                   variant="contained"
//                 >
//                   Continue with email
//                 </LoadingButton>
//               </Box>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default SingIn;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import handleErrorMessage from "../../../api/handleErrorMessages";
import { signIn, signInWithProvider } from "../../../api/dataBaseAuthMethods";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import GoogleIcon from "@mui/icons-material/Google";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  timeoutErrorSet,
  validateEmail,
  validatePasswordFormat,
} from "../../../composables/authFormHelpers";

const theme = createTheme();

const Input = styled("input")({
  display: "none",
});

export default function SignIn() {
  const [values, setValues] = React.useState<any>({
    email: "",
    remember: false,
    password: "",

    showPassword: false,
  });

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (validateEmail(values.email) === false) {
      timeoutErrorSet(setErrorMessage, "Please enter a valid email !");
      return;
    }
    if (validatePasswordFormat(values.password) === false) {
      timeoutErrorSet(
        setErrorMessage,
        "Password must contain at least 8 characters long !"
      );
      return;
    }

    setLoading(true);

    const signedInUserResponse = await signIn(values);

    setLoading(false);

    if (signedInUserResponse.error) {
      timeoutErrorSet(
        setErrorMessage,
        handleErrorMessage(signedInUserResponse.message),
        5000
      );
    }
  }
  async function handleProviderSubmit(providerName: string) {
    const providerList: { [key: string]: () => void } = {
      google: async () => {
        // sign up with google here
        await signInWithProvider("google");
      },
    };
    await providerList[providerName]();
  }

  const [loading, setLoading] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState<null | string>(
    "invisible"
  );

  const handleChange =
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {
            <div
              className={`error-message-container text-center p-1  text-red-600 ${
                errorMessage === "invisible" ? errorMessage : ""
              }`}
            >
              {errorMessage}
            </div>
          }
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              value={values.email}
              onChange={handleChange("email")}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              value={values.password}
              onChange={handleChange("password")}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={values.remember}
                  onChange={() => {
                    setValues({ ...values, remember: !values.remember });
                  }}
                  color="primary"
                />
              }
              label="Remember me"
            />

            <div className="or-sign-method-row flex justify-center items-center ">
              <div className="border-t bg-gray-600  border-b  border-gray-600 w-5/12 self-center"></div>
              <p className="mt-1 pb-1 mx-4 font-bold text-black">OR</p>
              <div className="border-t bg-gray-600  border-b  border-gray-600 w-5/12 self-center"></div>
            </div>

            <div className="provider-sign-method-row flex justify-center ">
              <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="icon-button-file">
                  <Input
                    onClick={() => {
                      handleProviderSubmit("google");
                    }}
                    id="icon-button-file"
                    type="button"
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <GoogleIcon />
                  </IconButton>
                </label>
              </Stack>
            </div>

            {loading === false && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )}

            {loading && (
              <Button
                type="submit"
                fullWidth
                disabled={true}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <LoadingButton loading={true} variant="text" disabled>
                  disabled
                </LoadingButton>
              </Button>
            )}

            {/* <Grid container>
              <Grid item xs>
                <Link to="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
