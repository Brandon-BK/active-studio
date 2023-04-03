import React, { useState } from "react";
import {
  TextField,
  Container,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { MoonLoader } from "react-spinners";
import { withSnackbar } from "notistack";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import Image from "next/image";
import { Auth } from "aws-amplify";
import { useAuthUser } from "../component/context/User-Context";

const Login = (props) => {
  const router = useRouter();
  const { User, setUser, syncUser,authenticated } = useAuthUser();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);

  React.useEffect(()=>{
    if (authenticated){
      router.push("/")
    }
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      if (!username || !password) {
        throw { message: "Please fill in all required fields" };
      }

      const user = await Auth.signIn(username, password);
      console.log("success", user);
      if (user.challengeName) {
        setPasswordChange(true);
        props.enqueueSnackbar(
          "The password you entered will expire,a new password of your choice must be set",
          {
            preventDuplicate: true,
            variant: "info",
          }
        );

        const newPassword = e.target.newPassword.value;
        // const res = await Auth.changePassword(user, oldPassword, newPassword);
        const res = await Auth.completeNewPassword(user, newPassword);
        console.log("changed", res);
      } else {
        if (user) {
          const userAtr = user.attributes;
          setUser({
            ...User,
            email: userAtr.email,
            userID: userAtr.sub,
            username: user.username,
          });
          syncUser();
        }
      }
    } catch (err) {
      props.enqueueSnackbar(err.message, {
        preventDuplicate: true,
        variant: "warning",
      });
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "rgb(30,30,30)",
          borderRadius: "50px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
          <Image
            src="/active-tv-logo.png"
            width={80}
            height={80}
            style={{ marginRight: "12px" }}
          />

          <Typography component="h1" variant="h3" fontWeight="500">
            Active Studio
          </Typography>
        </Box>
        <Box sx={{ mb: 5 }}>
          <Image src="/glitch-tv.gif" height={250} width={350} />
        </Box>
        <form onSubmit={handleSubmit} style={{ width: "80%" }}>
          {passwordChange ? (
            <>
              <TextField
                fullWidth
                name="newPassword"
                helperText="new Password*"
                type={showPassword ? "text" : "password"}
                sx={{ borderRadius: "0 !important" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          ) : (
            <>
              <TextField
                fullWidth
                name="username"
                helperText="Username/Email*"
                sx={{ mb: 2, borderRadius: "0 !important" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                name="password"
                helperText="Password*"
                type={showPassword ? "text" : "password"}
                sx={{ borderRadius: "0 !important" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(event) => event.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2}}
            type="submit"
          >
            {loading ? (
              <Box sx={{width:"180px",display:"flex",justifyContent:"center"}}>
                <MoonLoader size={20} color="#fff" />
                Signing in
              </Box>
            ) : (
              <Box sx={{width:"180px",display:"flex",justifyContent:"center"}}>Sign In</Box>
            )}
          </Button>
        </form>
      </Container>

      <Box
        sx={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      />
    </Box>
  );
};
export default withSnackbar(Login);
