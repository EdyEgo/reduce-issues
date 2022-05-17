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
