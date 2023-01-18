import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { display } from "@mui/system";
import {
  Backdrop,
  Button,
  Box,
  Grid,
  Modal,
  Stack,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { API_INSTANCE } from "../../app-config";
import { ModalLoader } from "../loader";
import { AppContext } from "../context/AppContext";
import CloseIcon from "@mui/icons-material/Close";
import { AppConfigContext } from "../context/AppConfigContext";

const thumbsContainer = {
  display: "flex",
  flexDirection: "column",
  // flexWrap: "wrap",
  // marginTop: 5,
  width: "100%",
  height: "100%",
  // border: "4px dotted gray",
  borderRadius: "10px",
  justifyContent: "center",
  alignItems: "center",
  // padding: "20%",
  // overflow:'auto'
};

const thumb = {
  borderRadius: 2,
  // marginRight: 8,
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  borderRadius: "10px",
};

const thumbInner = {
  display: "flex",
  // minWidth: 0,
  width: "100%",
  height: "100%",
  // overflow:'auto'
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  // border: "1px solid white",
  // borderRadius: "10px",
};
const container = {
  backgroundImage: `url('https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-PNG-Photos.png')`,
  backgroundPosition: "center",
  backgroundSize: "70px 70px",
  backgroundRepeat: "no-repeat",
};

const absolute = {
  position: "absolute",
  background: "red",
};

const UploadBackgroundImage = (props) => {
  const { files, setFiles, configuration } = props;
  console.log(configuration)
  const loginBackground = configuration.authenticationImages.loginImage
  const signUpBackground = configuration.authenticationImages.signupImage
  const handleCheck = (e) => {
    console.log(e.target.value);
    setFiles(e.target.value);
  };
  console.log(props.objectField);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg",
    onClick: (acceptedFiles) =>
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),

    // my drag and drop functionality
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const previewImage = (file)=>{
    console.log({loginBackground})
    if (file.preview){
      return file.preview
    }else if (loginBackground === signUpBackground){
      return loginBackground
    }else if (loginBackground){
      return loginBackground
    }else if (signUpBackground){
      return signUpBackground
    }
  }
  
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        {<img src={file.preview} style={img} />}
        {}
      </div>
      {/* <div style={{margin:"10px 0"},absolute}>file name: {file.name} </div> */}
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    // props.({
    // 	...props.configuration,
    // 		authenticationImages:{
    // 			...props.configuration.authenticationImages,
    // 			[props.objectField]:files,
    // 		}

    // })
  }, [files]);

  return (
    <section className="container" style={container}>
      <Box {...getRootProps({ className: "dropzone" })}>
        <input
          {...getInputProps()}
          onChange={() => {
            handleCheck;
          }}
        />
        <Box
          style={{
            height: "450px",
            width: "100%",
            padding: "0 0 0",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ height: "100%", width: "100%", padding: "0 0 0 0" }}>
            <aside style={thumbsContainer}>{thumbs}</aside>
          </div>
        </Box>
      </Box>
    </section>
  );
};

export const LoginBackground = () => {
  const { bannerSync, setBannerSync } = React.useContext(AppContext);
  const { configuration, configSync, setConfigSync } =
    React.useContext(AppConfigContext);
  const [files, setFiles] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [editing, setEditing] = React.useState("Sign-up");
  const handleSetFiles = (file) => {
    setFiles(file);
  };
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  console.log(files);
  const [loading, setLoading] = React.useState(false);
  const [sameImage, setSameImage] = React.useState(false);

  console.log(configuration);

  const handleCreate = async () => {
    if (files.length === 0) {
      alert("please select an image");
      return;
    }
    const endpoint = API_INSTANCE + `/post-config/${editing}`;

    try {
      setLoading(true);
      console.log("uploading new image...");
      const response = await axios.post(endpoint);
      console.log("recieved response");
      console.log(response.data);

      const { loginBackgroundSignedUrl } = response.data;
      const { signUpBackgroundUrl } = response.data;
      const { configJson } = response.data;

      const loginImageUrl = loginBackgroundSignedUrl.split("?")[0];
      const signUpImageUrl = signUpBackgroundUrl.split("?")[0];

      if (sameImage) {
        await axios.put(loginBackgroundSignedUrl, files[0], {
          "Content-Type": "image/jpeg",
        });
        await axios.put(signUpBackgroundUrl, files[0], {
          "Content-Type": "image/jpeg",
        });
      } else {
        await axios.put(
          editing === "Log-in" ? loginBackgroundSignedUrl : signUpBackgroundUrl,
          files[0],
          {
            "Content-Type": "image/jpeg",
          }
        );
      }
      await axios.put(
        configJson,
        JSON.stringify({
          ...configuration,
          authenticationImages: {
            signupImage: signUpImageUrl,
            loginImage: loginImageUrl,
          },
        })
      );

      console.log("SUCCESS!!!");
      setLoading(false);

      setConfigSync(!configSync);
    } catch (err) {
      setLoading(false);

      console.log("THERE WAS AN ERROR UPLOADING THE IMAGE", err);
    }
  };

  console.log(configuration);

  return (
    <Box sx={{ height: "auto", transform: "translateZ(0px)", flexGrow: 1 }}>
      <Box sx={{ background: "", with: "100%", padding: "1.5rem" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ margin: "0 8px" }}>
              {" "}
              Same background for Login Page and Sign Up ?{" "}
            </Typography>
            <Switch
              checked={sameImage}
              onClick={(e) => {
                setSameImage(!sameImage);
              }}
            />
          </Box>
          <TextField
            value={editing}
            onChange={(e) => setEditing(e.target.value)}
            select
            disabled={sameImage}
            label="Select Image Destination "
            sx={{
              width: "400px",
              cursor: sameImage ? "not-allowed" : "auto",
              "&:hover": {
                cursor: sameImage ? "not-allowed" : "auto",
              },
            }}
          >
            <MenuItem value={"Log-in"}>Log in</MenuItem>
            <MenuItem value={"Sign-up"}>Sign Up</MenuItem>
          </TextField>
        </Box>
      </Box>

      <Grid container>
        <Grid item xs={12} lg={12}>
          <Box
            sx={{
              minHeight: "80vh",
              padding: "40px 21px",
              background: "#111",
              // border: "3px solid grey",
              width: { xs: "100%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ModalLoader
              loadingOnModal={loading}
              action="Uploading Login/Sign Up Image"
              height="100%"
            />
            <Typography
              sx={{ fontSize: "36px ", margin: "21px 0", fontWeight: "600" }}
            >
              {" "}
              {sameImage
                ? "Upload Sign Up and Login Background Image"
                : `Upload ${editing} Background Image`}{" "}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                margin: "21px 0",
                textTransform: "uppercase",
              }}
            >
              Drag 'n' drop the profile picture jpeg / png / gif
            </Typography>
            <Box
              sx={{
                width: "80%",
                margin: "0 auto",
                background: "",
                border: "2px dashed #eee",
              }}
            >
              <UploadBackgroundImage
                configuration={configuration}
                configSync={configSync}
                objectField={`${editing
                  .toLowerCase()
                  .split(" ")
                  .join("")}Image`}
                files={files}
                setFiles={setFiles}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                width: "80%",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                sx={{ "&:hover": { background: "red", color: "white" } }}
                onClick={handleClose}
              >
                close
              </Button>
              <Button
                type="submit"
                color="success"
                variant="outlined"
                sx={{
                  "&:hover": {
                    backgroundColor: "darkgreen",
                    color: "white",
                  },
                }}
                onClick={handleCreate}
              >
                create
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
