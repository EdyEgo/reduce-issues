// import * as React from "react";
// import { signUp, signInWithProvider } from "../../../api/dataBaseAuthMethods";
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
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import LoadingButton from "@mui/lab/LoadingButton";
// import GoogleIcon from "@mui/icons-material/Google";

// import SendIcon from "@mui/icons-material/Send";
// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";

// const Input = styled("input")({
//   display: "none",
// });

// export interface SignUpProps {}

// const SignUp: React.FC<SignUpProps> = () => {
//   const [values, setValues] = React.useState<any>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     showPassword: false,
//     showConfirmPassword: false,
//   });

//   const [errorMessage, setErrorMessage] = React.useState<null | string>(
//     "invisible"
//   );

//   const [loading, setLoading] = React.useState(false);

//   async function handleSubmit() {
//     if (values.password !== values.confirmPassword) {
//       timeoutErrorSet(
//         setErrorMessage,
//         "Password and confirm password must be the same !"
//       );
//       return;
//     }
//     if (validateEmail(values.email) === false) {
//       timeoutErrorSet(setErrorMessage, "Please enter a valid email !");
//       return;
//     }
//     if (
//       validatePasswordFormat(values.password) === false ||
//       validatePasswordFormat(values.confirmPassword) === false
//     ) {
//       timeoutErrorSet(
//         setErrorMessage,
//         "Password must contain at least 8 characters long !"
//       );
//       return;
//     }
//     if (values.firstName === "" || values.lastName === "") {
//       timeoutErrorSet(setErrorMessage, "Please complete all the fields !");
//       return;
//     }
//     setLoading(true);

//     const signedUpUserResponse = await signUp(values);

//     setLoading(false);

//     if (signedUpUserResponse.error) {
//       timeoutErrorSet(
//         setErrorMessage,
//         handleErrorMessage(signedUpUserResponse.message),
//         5000
//       );
//     }
//   }

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
//   const handleClickShowConfirmPassword = () => {
//     setValues({
//       ...values,
//       showConfirmPassword: !values.showConfirmPassword,
//     });
//   };

//   const handleChange =
//     (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
//       setValues({ ...values, [prop]: event.target.value });
//     };

//   return (
//     <>
//       <div className="flex justify-center sign-up-form-container">
//         <form onSubmit={(event) => {}} className="flex flex-col my-2 ">
//           <div className="title-sign-up-form flex space-x-2.5  self-center my-2">
//             <h1 className="text-xl lg:text-3xl">Let's </h1>
//             <h1 id="signUpTitle" className="text-xl font-bold lg:text-3xl ">
//               {" "}
//               get started!
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

//           <div className="flex flex-col inputs-container-sign-up-forms">
//             <div className="flex justify-center name-row w-12/12">
//               <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
//                 <InputLabel htmlFor="outlined-adornment-firstName">
//                   First Name
//                 </InputLabel>
//                 <OutlinedInput
//                   id="outlined-adornment-firstName"
//                   type="text"
//                   value={values.firstName}
//                   onChange={handleChange("firstName")}
//                   label="First Name"
//                 />
//               </FormControl>

//               <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
//                 <InputLabel htmlFor="outlined-adornment-lastName">
//                   Last Name
//                 </InputLabel>
//                 <OutlinedInput
//                   id="outlined-adornment-lastName"
//                   type="text"
//                   value={values.lastName}
//                   onChange={handleChange("lastName")}
//                   label="Last Name"
//                 />
//               </FormControl>
//             </div>
//             <div className="flex email-row ">
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
//             <div className="flex justify-center password-row">
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

//               <FormControl
//                 sx={{ m: 1, width: "25ch" }}
//                 variant="outlined"
//                 className="outline-hidden"
//               >
//                 <InputLabel htmlFor="outlined-adornment-password">
//                   Confirm Password
//                 </InputLabel>
//                 <OutlinedInput
//                   id="outlined-adornment-confirm-password"
//                   type={values.showConfirmPassword ? "text" : "password"}
//                   value={values.confirmPassword}
//                   onChange={handleChange("confirmPassword")}
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={handleClickShowConfirmPassword}
//                         onMouseDown={handleMouseDownPassword}
//                         edge="end"
//                       >
//                         {values.showConfirmPassword ? (
//                           <VisibilityOff />
//                         ) : (
//                           <Visibility />
//                         )}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                   label="Confirm Password"
//                 />
//               </FormControl>
//             </div>

//             <div className="flex items-center justify-center my-2 or-sign-method-row">
//               <div className="self-center w-5/12 bg-gray-600 border-t border-b border-gray-600"></div>
//               <p className="pb-1 mx-4 mt-1 font-bold text-black">OR</p>
//               <div className="self-center w-5/12 bg-gray-600 border-t border-b border-gray-600"></div>
//             </div>

//             <div className="flex justify-center my-2 provider-sign-method-row">
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

//             <div className="flex justify-center submit-row">
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

// export default SignUp;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import handleErrorMessage from "../../../api/handleErrorMessages";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  timeoutErrorSet,
  validateEmail,
  validatePasswordFormat,
} from "../../../composables/authFormHelpers";
import { signUp, signInWithProvider } from "../../../api/dataBaseAuthMethods";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import GoogleIcon from "@mui/icons-material/Google";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Input = styled("input")({
  display: "none",
});

export default function SignUp() {
  const [values, setValues] = React.useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
    showPassword: false,
    showConfirmPassword: false,
  });

  const navigateTo = useNavigate();

  const [loading, setLoading] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState<null | string>(
    "invisible"
  );

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (values.firstName === "" || values.lastName === "") {
      timeoutErrorSet(setErrorMessage, "Please complete all the fields !");
      return;
    }
    if (values.password !== values.confirmPassword) {
      timeoutErrorSet(
        setErrorMessage,
        "Password and confirm password must be the same !"
      );
      return;
    }
    if (validateEmail(values.email) === false) {
      timeoutErrorSet(setErrorMessage, "Please enter a valid email !");
      return;
    }
    if (
      validatePasswordFormat(values.password) === false ||
      validatePasswordFormat(values.confirmPassword) === false
    ) {
      timeoutErrorSet(
        setErrorMessage,
        "Password must contain at least 8 characters long !"
      );
      return;
    }

    setLoading(true);

    const signedUpUserResponse = await signUp(values);

    setLoading(false);

    if (signedUpUserResponse.error) {
      timeoutErrorSet(
        setErrorMessage,
        handleErrorMessage(signedUpUserResponse.message),
        5000
      );
      return;
    }
    navigateTo("/reduce-issues");
  }

  async function handleProviderSubmit(providerName: string) {
    const providerList: {
      [key: string]: () => Promise<
        | { data: any; error: boolean }
        | { error: boolean; message: any }
        | undefined
      >;
    } = {
      google: async () => {
        // sign up with google here
        const result = await signInWithProvider("google", true);
        return result;
      },
    };
    const signedInWithProvider = await providerList[providerName]();
    if (signedInWithProvider === undefined || signedInWithProvider?.error)
      return;
    navigateTo("/reduce-issues");

    // if data.error don t push
  }

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
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={values.email}
                  onChange={handleChange("email")}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={values.password}
                  onChange={handleChange("password")}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      value={values.remember}
                      onChange={() => {
                        setValues({ ...values, remember: !values.remember });
                      }}
                    />
                  }
                  label="Remember me"
                />
              </Grid>
            </Grid>

            <div className="flex items-center justify-center or-sign-method-row ">
              <div className="self-center w-5/12 bg-gray-600 border-t border-b border-gray-600"></div>
              <p className="pb-1 mx-4 mt-1 font-bold text-black">OR</p>
              <div className="self-center w-5/12 bg-gray-600 border-t border-b border-gray-600"></div>
            </div>

            <div className="flex justify-center provider-sign-method-row ">
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
                sx={{ mt: 1, mb: 2 }}
              >
                Sign Up
              </Button>
            )}

            {loading && (
              <Button
                type="submit"
                fullWidth
                disabled={true}
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                <LoadingButton loading={true} variant="text" disabled>
                  disabled
                </LoadingButton>
              </Button>
            )}
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
