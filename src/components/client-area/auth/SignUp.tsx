import * as React from "react";
import { signUp, signInWithProvider } from "../../../api/dataBaseAuthMethods";
import handleErrorMessage from "../../../api/handleErrorMessages";
import {
  timeoutErrorSet,
  validateEmail,
  validatePasswordFormat,
} from "../../../composables/authFormHelpers";

import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import GoogleIcon from "@mui/icons-material/Google";

import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const Input = styled("input")({
  display: "none",
});

export interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [values, setValues] = React.useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [errorMessage, setErrorMessage] = React.useState<null | string>(
    "invisible"
  );

  const [loading, setLoading] = React.useState(false);

  async function handleSubmit() {
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
    if (values.firstName === "" || values.lastName === "") {
      timeoutErrorSet(setErrorMessage, "Please complete all the fields !");
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

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
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
        <form onSubmit={(event) => {}} className="flex flex-col my-2 ">
          <div className="title-sign-up-form flex space-x-2.5  self-center my-2">
            <h1 className="text-xl lg:text-3xl">Let's </h1>
            <h1 id="signUpTitle" className="text-xl lg:text-3xl font-bold ">
              {" "}
              get started!
            </h1>
          </div>

          {
            <div
              className={`error-message-container text-center p-3  text-red-600 ${
                errorMessage === "invisible" ? errorMessage : ""
              }`}
            >
              {errorMessage}
            </div>
          }

          <div className="inputs-container-sign-up-forms flex flex-col">
            <div className="name-row flex justify-center w-12/12">
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-firstName">
                  First Name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-firstName"
                  type="text"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  label="First Name"
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-lastName">
                  Last Name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-lastName"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  label="Last Name"
                />
              </FormControl>
            </div>
            <div className="email-row flex ">
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  type="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  label="Email"
                />
              </FormControl>
            </div>
            <div className="password-row flex justify-center">
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="outlined"
                className="outline-hidden"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirm-password"
                  type={values.showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
            </div>

            <div className="or-sign-method-row flex justify-center items-center my-2">
              <div className="border-t bg-gray-600  border-b  border-gray-600 w-5/12 self-center"></div>
              <p className="mt-1 pb-1 mx-4 font-bold text-black">OR</p>
              <div className="border-t bg-gray-600  border-b  border-gray-600 w-5/12 self-center"></div>
            </div>

            <div className="provider-sign-method-row flex justify-center my-2">
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

            <div className="submit-row flex justify-center">
              <Box sx={{ "& > button": { m: 1 } }}>
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
                  Continue with email
                </LoadingButton>
              </Box>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
