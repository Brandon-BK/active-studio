import * as React from "react";
import {
  Box,
  Avatar,
  Grid,
  Drawer,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import { useDropzone } from "react-dropzone";
import imageCompression from 'browser-image-compression';
import { useState } from "react";
import { ModalLoader } from "../loader";
import { API_INSTANCE } from "../../app-config";
import BasicVideo from "../Popup/Basic-video";

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

//the compressed image and response will be reassigned with these
//variables
var compressedImage = {};
var response = {}
export const CreateProduceThatModal = (props) => {
  const [files, setFiles] = React.useState([]);
  const [videoFiles,setVideoFiles] = React.useState([])  
  const handleSetVideoFiles = (file) => {
    console.log({ video: file });
    setVideoFiles(file);
  };

  React.useEffect(async () => {
    //original file...
    try {
      //IMAGE COMPRESSION
      const options = {
        maxSizeMB: 1,

        //alwaysKeepResolution: true
      };
      //compressed image
      compressedImage = await imageCompression(files[0], options);

      console.log("compressing image success!!!!!!!!!");
    } catch (error) {
      console.log("THE COMPRESSION ERROR", error);
    }
  }, [files]);
  
  const { openDrawer, setOpenDrawer } = props.actions;
  const handleCheck = (e) => {
    console.log(e.target.value);
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

  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const [loading,setLoading] = useState(false)

  const [showName,setShowName] = useState('');
  const [showDescription,setShowDescription] = useState('');
  const [targetPoints,setTargetPoints] = useState(100);

  const handleCreate = async ()=>{

  // const endpoint = `${API_INSTANCE}/create-pt-show`;
    const endpoint = 'http://127.0.0.1:3000/create-pt-show'
    if (showName,showDescription,files[0]){
      setLoading(true);
      const date = new Date();
      const timestamp = date.toLocaleString();

      const data = JSON.stringify({
        Title: showName.replace(/ /g, "-"),
        showName : showName,
        description: showDescription,
        timestamp: timestamp,
        targetPoints : targetPoints < 1 ?  1 : targetPoints,
        timestamp: new Date().toLocaleString(),
        videoFileName:videoFiles[0]?.name,
        points : 0
        
      });

      const showMetaData = {
        ...JSON.parse(data),
        episodes: [],
      };
      //configs for axios post
      var config = {
        method: "POST",
        url: endpoint,
        data: data,
      };

      //sending form data to database
      try {
        console.log("sending request...");
        const res = await axios(config);
        response = await res.data;

        console.log(response);
      } catch (error) {
        console.log("THERE WAS AN ERROR", error);
        setLoading(false)
      }
      try {
        console.log("posting images to s3 ...");

        if (response) {
          //destructuring out presined urls from response
          const { smallCoverArtPresignedUrl } = response;
          const { largeCoverArtPreSignedUrl } = response;
          const { showsMetaDataSignedUrl } = response;
          const {trailerSignedUrl} = response
          //Posting image to presigned url
          await axios.put(smallCoverArtPresignedUrl, compressedImage, {
            "Content-Type": "image/jpeg",
          });

          await axios.put(largeCoverArtPreSignedUrl, files[0], {
            "Content-Type": "image/jpeg",
          });
          console.log('uploading video to s3...')
           await axios.put(trailerSignedUrl,videoFiles[0],{
            'Content-Type' : 'video/mp4',
           })
           console.log('UPLOADED VIDEO')
          //posting json meta data to s3
          const metaDataConfig = {
            method: "put",
            url: showsMetaDataSignedUrl,
            headers: {
              "Content-Type": "application/json",
            },

            data: JSON.stringify(showMetaData, null, 2),
          };

          await axios(metaDataConfig);

          console.log(`successfully posted to images to s3!!`);
          console.log("POSTED FILES :", files[0], compressedImage);

          setLoading(false);
          setOpenDrawer(false);
          props.setSync(!props.sync)
          // setFetchAgain(!fetchAgain);
          // setModalOpen(false);
        }
      } catch (error) {
        setLoading(false);
        console.log("IMAGE POST ERROR", error);
      }
      setLoading(false)
    }
  }
  return (
    <Drawer anchor="bottom" open={openDrawer}>
      <ModalLoader height = '80vh'  loadingOnModal={loading} action="uploading" />
      <Button
        onClick={() => setOpenDrawer(false)}
        sx={{ position: "fixed", right: 0, padding: "16px 28px" }}
      >
        <CloseIcon sx={{ fontSize: "42px", color: "#eee" }} />
      </Button>

      <Box
        sx={{
          height: "80vh",
          padding: "1.5rem",
          background: "#333",
          overflowY: "scroll",
        }}
      >
        <Grid container>
          <Grid item xs={4} sx={{ height: "70vh", background: "" }}>
            <section className="container" style={container}>
              <Box
                {...getRootProps({ className: "dropzone" })}
                sx={{ border: "3px dotted white", height: "40vh" }}
              >
                <input
                  {...getInputProps()}
                  onChange={() => {
                    handleCheck;
                  }}
                />
                <Box
                  style={{
                    height: "150px",
                    width: "100%",
                    padding: "0 0 0",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      padding: "0 0 0 0",
                    }}
                  >
                    <aside style={thumbsContainer}>{thumbs}</aside>
                  </div>
                </Box>

              </Box>
              <BasicVideo
                videoFiles={videoFiles}
                handleSetVideoFiles={handleSetVideoFiles}
                img={"logo.svg"}
              ></BasicVideo>
            </section>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{ padding: "2.5rem", minHeight: "80vh", background: "" }}
          >
            <Typography
              sx={{ margin: "8px 0", fontWeight: 600, fontSize: "42px" }}
            >
              Enter Show Information.
            </Typography>
            <TextField onChange = {(e)=>setShowName(e.target.value)} sx={{ margin: "16px 0" }} label="Show Name" fullWidth />
            <TextField
              multiline
              rows={5}
              type="textarea"
              sx={{ margin: "16px 0" }}
              label="Show Description"
              fullWidth
              onChange = {(e)=>setShowDescription(e.target.value)}
            />
            <TextField
              sx={{ margin: "16px 0" }}
              label="Target Points"
              fullWidth
              type = 'number'
              min = {1}
              value = {targetPoints}
              onChange = {(e)=>setTargetPoints(e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                sx={{ "&:hover": { background: "red", color: "white" } }}
              >
                close
              </Button>
              <Button
                type="submit"
                color="success"
                variant="outlined"
                onClick = {handleCreate}
                sx={{
                  "&:hover": {
                    backgroundColor: "darkgreen",
                    color: "white",
                  },
                }}
              >
                create
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Drawer>
    
  );
};
