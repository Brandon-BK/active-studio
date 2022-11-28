import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Select, Grid, MenuItem, TextField, Stack } from "@mui/material";
import CreateShow from "../create-show/create-show";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
// import {CreateShowHandler} from "../../pages/api/create-show"
import { useState, useEffect, useContext } from "react";
const axios = require("axios");
import imageCompression from 'browser-image-compression';
import { AppContext } from "../context/AppContext";
import { ModalLoader } from "../loader/";
import { SeamlessIframe } from "seamless-iframe";
import sanitize from "sanitize-html";
import { API_INSTANCE } from "../../app-config/index.";
import { Edit } from "@mui/icons-material";
import CreateEpisodeCoverArt from "../episodes/create-episode-coverArt";
import { CloseRounded } from "@mui/icons-material";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

const input = {
  background: "#333",
  color: "white",
};

export default function EditShowModal({
  openModal,
  setOpenModal,
  fetchAgain,
  setFetchAgain,
  
  show,
}) {
  const { setAddedNew } = useContext(AppContext);

  const [files, setFiles] = React.useState([]);
  const [bool, setBool] = React.useState(false);
  const [thumnbailUpload, setThumnbailUpload] = React.useState(false);
  const [showType, setShowType] = React.useState("Active TV Original");
  const [loading,setLoading] =useState(false)

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const handleCreate = () => setBool(true);
  

  const [openSpeedDail, setOpenSpeedDail] = React.useState(false);
  const handleOpenSpeedDail = () => setOpenSpeedDail(true);
  const handleCloseSpeedDail = () => setOpenSpeedDail(false);

  // receive input values from show name and show description

  const [name, SetName] = React.useState(show.Title ? show.Title : "");
  //   const [name, SetName] = React.useState("");
  const [description, SetDescription] = React.useState(
    show.description ? show.description : ""
  );
  const [imagecover, SetImageCover] = React.useState(
    show.CoverArtLarge ? show.CoverArtLarge : ""
  );
  const [tagValue, setTagValue] = React.useState("");
  const [tags, setTags] = React.useState(show.tags ? show.tags : []);

  const handleTagValue = (e) => {
    const inputValue = e.target.value;
    setTagValue(inputValue);
  };

  const addToTags = () => {
    setTags([...tags, "#" + tagValue]);
    setTagValue("");
  };
  
  const style = {
    position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#111",
  border: "2px solid #fff",
  height : '90vh',
  overflow: "scroll",
  padding: "20px 0",

  boxShadow: 24,
  color: "white",
  p: 2,
  };


  //the compressed image and response will be reassigned with these
  //variables
  var compressedImage = {};
  var response = {};

  //THE EDIT SHOWS ENDPOINT

  const endpoint = `${API_INSTANCE}/edit-show`;
  //const endpoint = 'http://127.0.0.1:3000/create-shows'

  useEffect(async () => {
    

    try {
      //IMAGE COMPRESSION
      const options = {
        maxSizeMB: 1,

        //alwaysKeepResolution: true
      };
      //compressed image
      compressedImage = await imageCompression(files[0], options);
      console.log("CompressedImage : ", compressedImage);

      console.log("compressing image success!!!!!!!!!");
    } catch (error) {
      console.log("THE COMPRESSION ERROR", error);
    }
  }, [files]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    

    // awesome code
    if ((name, description && files.length !== 0)) {
      const showDetails = { name, description, file: files[0] };

      //show the laoder
      setLoading(true);
      
      ////file compression algorithm

      //posting shows object to lambda endpoint,inserting all user data in data object
      const data = JSON.stringify({
        Title: show.Title,
        //this should be pulled from context
        description: description,
        timestamp: new Date(),
        tags
      });

      var config = {
        method: "PUT",
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
      }

      //sending images to s3 bucket
      try {
        console.log("posting images to s3 ...");

        if (response) {
          //destructuring out presined urls from response
          const { smallCoverArtSignedUrl } = response;
          const { largeCoverArtSignedUrl } = response;

          //Posting image to presigned url
          const smImgRes = await axios.put(smallCoverArtSignedUrl, compressedImage, {
            "Content-Type": "image/jpeg",
          });

          const lgImgRes = await axios.put(largeCoverArtSignedUrl, files[0], {
            "Content-Type": "image/jpeg",
          });
          console.log('S3 IMAGE RESPONSE',{smImgRes,lgImgRes})
          console.log(`successfully posted to images to s3!!`);
          console.log("POSTED FILES :", files[0], compressedImage);

          //setAddedNew(true)
          setLoading(false);
          setFetchAgain(!fetchAgain);
          setOpenModal(false);
        }
      } catch (error) {
        setLoading(false);
        console.log("IMAGE POST ERROR", error);
      }

      
    }
  };
  const handleSetFiles = (file) => {
    setFiles(file);
  };

  return (
    <form style={{ height: "auto" }}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{}}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Box sx={{ margin: "0 10px",display:'flex',flexDirection:'column',alignItems:'center' }}>
              <ModalLoader
                loadingOnModal={loading}
                action="uploading"
                height="100%"
              />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h4"
                sx={{textAlign:'center'}}
              >
                EDIT SHOW
              </Typography>
              <hr style={{ width: "100px", margin: "10px 0",textAlign:'center' }} />
            <Typography variant="p" sx={{ fontSize: "11px", margin: "0 10px",textAlign:'center' }}>
              <b>NOTE :</b> ONLY SHOWS WITH VIDEOS UNDERNEATH THEM ARE
              VISIBLE TO THE PUBLIC
            </Typography>
            </Box>

            <Box sx={{ overFlow: "scroll" }}>
              <Box style={{padding: "10px", }}>
                <CreateEpisodeCoverArt
                  files={files}
                  handleSetFiles={handleSetFiles}
                  img={"logo.svg"}
                />    
                {/* <Box sx={{border:'1px solid red',width:'100%',height:'400px',margin:'20px 0px'}}>
                <BasicVideo
                  videoFiles={videoFiles}
                  handleSetVideoFiles={handleSetVideoFiles}
                  img={"logo.svg"}
                ></BasicVideo>


                </Box> */}
                
              </Box>
            
              <Box
                style={{
                  height: "100%",
                  width: "100%",
                  padding: "10px",
                
                }}
              >
                <form onSubmit={handleSubmit}>
                   
                  {/* <p style={{margin:"0px 10px",fontSize:"14px"}}>{'SHOW NAME'}</p> */} 

                  <textarea
                    placeholder={`EPISODE DESCRIPTION : ${show?.description}`}
                    type= "text"
                    onChange={(e) => SetDescription(e.target.value)}
                    style={{
                      border: "none",
                      width: "100%",
                      height: "100px",
                      padding: "10px 0",
                      background: "#222",
                      display: "flex",
                      alignItems: "flex-start",
                      padding: "10px 0",
                      marginTop: "20px",
                      padding: "10px",
                      color: "white",
                    }}
                  >
                    {/* <p style={{margin:"0px 10px",fontSize:"14px"}}>{'SHOW DESCRIPTION'}</p>  */}
                  </textarea>
                  <Box sx={{ display: "flex", alignItems: "center",margin : '20px 0px' }}>
                              <input
                                placeholder="tags"
                                name="tags"
                                value={tagValue}
                                onChange={handleTagValue}
                                type="text"
                                style={{
                                  height: "45px",
                                  width: "90%",
                                  background: "#222",
                                  display: "flex",
                                  alignItems: "center",
                                  margin: " 0 0 8px 0",
                                  padding: "10px ",
                                  color: "white",
                                  border: "none",
                                }}
                              />
                              <Button
                                onClick={addToTags}
                                sx={{
                                  background: "#aaa",
                                  padding: "11px 12px",
                                  margin: " 0 0 8px 0",
                                  color: "#111",
                                  fontWeight: 600,
                                }}
                              >
                                +
                              </Button>
                            </Box>
                            <Box
                              sx={{
                                height: "fit-content",
                                background: "#222",
                                display: "flex",
                                alignItems: "center",
                                padding: "0px 8px",
                                overflowX: "scroll",
                              }}
                            >
                              {tags.length > 0
                                ? tags.map((item, index) => (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        width: "fit-content",
                                        alignItems: "center",
                                        background: "#111",
                                        padding: "8px",
                                        margin: "0 8px 0 0",
                                        color: "#Eee",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Box
                                        sx={{ padding: "8px", flex: 5 }}
                                        key={index}
                                      >
                                        <Typography
                                          sx={{
                                            //  flex:2 ,
                                            textAlign: "center",
                                          }}
                                        >
                                          {item}
                                        </Typography>
                                      </Box>
                                      <Box
                                        onClick={() => {
                                          // setTags();
                                          const filterdTags = tags.filter(
                                            (tag) => {
                                              console.log(tag === item);
                                              return tag !== item;
                                            }
                                          );
                                          setTags(filterdTags);
                                          // delete[index] tags
                                          // console.log()
                                        }}
                                        sx={{
                                          padding: "8px",
                                          flex: 1,
                                          cursor: "pointer",
                                        }}
                                        key={index}
                                      >
                                        <CloseRounded
                                          sx={{
                                            margin: "0 2px",
                                            color: "red",
                                            fontSize: "16px",
                                            fontWeight: "600",
                                          }}
                                        />
                                      </Box>
                                    </Box>
                                  ))
                                : ""}
                            </Box>
                </form>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                // marginTop: "25%",
                width: "100%",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                sx={{
                  "&:hover": { background: "red", color: "white" },
                  marginTop: "40px",
                }}
                onClick={()=>setOpenModal(false)}
              >
                close
              </Button>
              <Button
                type="submit"
                color="success"
                variant="outlined"
                sx={{
                  "&:hover": { backgroundColor: "darkgreen", color: "white" },
                  marginTop: "40px",
                }}
                onClick={handleSubmit}
              >
                update
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </form>
  );
  
}
