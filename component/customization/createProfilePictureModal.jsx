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
import { API_INSTANCE } from "../../app-config";
import { ModalLoader } from "../loader";
import { AppContext } from "../context/AppContext";
import CloseIcon from '@mui/icons-material/Close';

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

const CreateProfilePictureZone = (props) => {
  const {files, setFiles} = props;
  const handleCheck = (e) => {
    console.log(e.target.value);
    setFiles(e.target.value)

  };

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
            height: "350px",
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
}

          // <aside style={thumbsContainer}>{thumbs}</aside>

export const CreateProfilePictureModal = () => {
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
  const [numOfBannerImages, SetNumOfBannerImages] = React.useState(0);
  const handleCreate = async () => {
    if (files.length === 0) {
      alert("please select an image");
      return;
    }
    const endpoint = API_INSTANCE + `/post-profile-pictures/${files[0].name}`;

    try {
      setLoading(true);
      console.log("uploading profile...");
      const response = await axios.post(endpoint);
      console.log("recieved response");
      const {  profilePicturesUrl } = response.data;

      console.log({  profilePicturesUrl });
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
      console.log("THEWRE WAS AN ERROR UPLOADING THE BANNER", err);
    }
  };

  return (
    <Box sx={{ height: "auto", transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        onClick={handleOpen}
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 21, right: 21 }}
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
          display: "flex",
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
            width: { xs:'80%' , lg:"50%"},
            display: "flex",
            flexDirection:'column',
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <ModalLoader
            loadingOnModal={loading}
            action="Uploading Banner Image"
            height="100%"
          />
          <Box sx={{ width:'100%' , display:'flex' , justifyContent:'flex-end' }}>
        <Button onClick={()=>handleClose()} sx={{ position:'relative', right:0 , top:0 , padding:'16px 28px' }}><CloseIcon sx={{ fontSize:'42px' , color:'#eee'}} /></Button>
          </Box>
          <Typography sx={{ fontSize:'36px ' , margin:'21px 0' , fontWeight:'600' }}> Upload Profile Picture </Typography>
                <Typography sx={{ fontSize: "12px", margin:'21px 0',textTransform: "uppercase" }}>
          Drag 'n' drop the profile picture jpeg / png / gif
        </Typography>
         <Box sx={{ width:'50%' , margin:'0 auto' , background:'' , border:'2px dashed #eee' }}>
<CreateProfilePictureZone files={files} setFiles={setFiles} />
         </Box>
<Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                      width:'50%'
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
      </Modal>
    </Box>
  );
}
