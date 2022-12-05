import * as React from "react";
import {
  Backdrop,
  Button,
  Box,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import CreateShow from "../create-show/create-show";
import axios from "axios";
import { API_INSTANCE } from "../../app-config/index.";
import { ModalLoader } from "../loader";
import { AppContext } from "../context/AppContext";

export default function CreateProfilePicture() {
  const { bannerSync, setBannerSync } = React.useContext(AppContext);
  const [files, setFiles] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const handleSetFiles = (file) => {
    setFiles(file);
  };
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  console.log(files);
  const [loading, setLoading] = React.useState(false);
  const [numOfbannerImages, SetNumOfbannerImages] = React.useState(0);
  const handleCreate = async () => {
    if (files.length === 0) {
      alert("please select an image");
      return;
    }
    const endpoint = API_INSTANCE + `/post-profile-pictures/${files[0].name?.replace(/ /g,'-')}`;

    try {
      setLoading(true);
      console.log("uploading profile picture...");
      const response = await axios.post(endpoint);
      console.log("recieved response",response.data);
      
      const { profilePicturesUrl} = response.data;

        
      await axios.put(profilePicturesUrl, files[0], {
        "Content-Type": "image/jpeg",
      });

      console.log("success");
      setLoading(false);
      setOpenModal(false);
      setBannerSync(!bannerSync)
    } catch (err) {
      setLoading(false);
      setOpenModal(false);
      console.log("THEWRE WAS AN ERROR UPLOADING THE PROFILE PICTURE", err);
    }
  };

  return (
    <Box sx={{ height: "auto", transform: "translate(50%,-50%)"}}>
      <SpeedDial
        onClick={handleOpen}
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: '50%', right: '50%' }}
        icon={<SpeedDialIcon />}
      ></SpeedDial>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        sx={{
          height: "100vh",
          background: "",
          display : 'flex',
          justifyContent: "center",
          alignItems: "center",
        }}
        closeAfterTransition
        // BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            height: "fit-content",
            padding: "40px 21px",
            background: "#111",
            // border: "3px solid grey",
            width: "30%",
        
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ModalLoader
            loadingOnModal={loading}
            action="Uploading Avator"
            height="100%"
            right = '0%'
            bottom = '10%'
          />
            
              <Typography sx={{ fontSize: "32px", margin: "12px 0" }}>
                Upload Profile Picture
              </Typography>
              <CreateShow
                media_type={"cover image"}
                accepted_type={"JPEG/JPG"}
                files={files}
                handleSetFiles={handleSetFiles}
                img={"logo.svg"}
              />
            
            
              <Stack
                sx={{ marginTop: "21px", padding: "32px 0", width: "100%" }}
              >
                <p
                  style={{
                    color: "transparent",
                    fontSize: "12px",
                    textTransform: "uppercase",
                  }}
                >
                  Drag 'n' drop the show
                </p>
                <p
                  style={{
                    color: "transparent",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    margin: "10px 0 5px 0",
                  }}
                >
                  Accepted files TYPES :
                </p>
                
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  
                  justifyContent: "space-between",
                  margin: "20px 0",
                  width: "100%",
                  // width:'250px'
                }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    "&:hover": {
                      background: "red",
                      color: "white",
                    },
                  }}
                  onClick={() => setOpenModal(false)}
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
                  Upload
                </Button>
              </Box>
            
        </Box>
      </Modal>
    </Box>
  );
}
