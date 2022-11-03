import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CreateShow from "../create-show/create-show";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
// import {CreateShowHandler} from "../../pages/api/create-show"
import { useState,useEffect,useContext } from "react";
const axios = require('axios')
// import imageCompression from 'browser-image-compression';
import { AppContext } from "../context/AppContext";
import { ModalLoader } from "../loader/";
import { SeamlessIframe } from "seamless-iframe";
import sanitize from "sanitize-html";
import { API_INSTANCE } from "../../app-config/index.";
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

export default function CreateShowModal({
  modalOpen,
  setModalOpen,
  fetchAgain,
  setFetchAgain,
  loading,
  loadingOnModal,
  setLoadingOnModal,
}) {
  const { setAddedNew } = useContext(AppContext);

  const [files, setFiles] = React.useState([]);
  const [bool, setBool] = React.useState(false);
  
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleCreate = () => setBool(true);

  const [openSpeedDail, setOpenSpeedDail] = React.useState(false);
  const handleOpenSpeedDail = () => setOpenSpeedDail(true);
  const handleCloseSpeedDail = () => setOpenSpeedDail(false);

  // receive input values from show name and show description
  const [name, SetName] = React.useState("");
  const [description, SetDescription] = React.useState("");
  const [imagecover, SetImageCover] = React.useState("");

  const handleShowType = (item) => {
    setShowType(item);
  };

  const handleTagValue = (e) => {
    const inputValue = e.target.value;
    setTagValue(inputValue);
  };

  const addToTags = () => {
    setTags([...tags, "#" + tagValue]);
    setTagValue("");
  };

  function Iframe(props) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
      />
    );
  }
  const style = {
    position: "absolute",

    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // minHeight: showType === "Free Show" ? '350px' : '450px',
    height: "80%",
    bgcolor: "#111",
    border: "2px solid #111",
    padding: "20px 0",
    overflowY: "auto",
    width: "75%",
    boxShadow: 24,
    color: "white",
    p: 2,
  };

  const [iframeUploader, setIframeUploader] = useState({
    ID: "",
    Title: "",
    EmbedCode: "",
    url: "",
  });

  

  const handleFieldChange = (e) => {
    setIframeUploader({
      ...iframeUploader,
      [e.target.name]: e.target.value,
    });
    console.log(iframeUploader);
  };

  useEffect(() => {
    setIframeUploader({
      ...iframeUploader,
      ID: iframeUploader.Title + "iframe",
    });
  }, [iframeUploader.Title]);

  const handleIframe = async () => {
    const request = await axios.post(
      `${API_INSTANCE}/iframe-uploader`,
      JSON.stringify(iframeUploader)
    );

    const response = request;
    console.log(response);
    setModalOpen(false);
  };

  //the compressed image and response will be reassigned with these
  //variables
  var compressedImage = {}
  var response = {}

  //THE CREATE SHOWS ENDPOINT

  const endpoint = 'https://nahgp463k7.execute-api.us-east-2.amazonaws.com/Stage/create-shows' 
  //const endpoint = 'http://127.0.0.1:3000/create-shows'
  
  useEffect(async() =>{
    
    console.log('new fie to be compressed');
    //original file...
    console.log('THE FILES',files[0])
    

    try {

        //IMAGE COMPRESSION
      const options = {
        maxSizeMB : 1,
        
        //alwaysKeepResolution: true
      }
      //compressed image
      compressedImage = await imageCompression(files[0],options);
      console.log("CompressedImage : " , compressedImage)
  
      console.log('compressing image success!!!!!!!!!');

    } catch (error) {

      console.log('THE COMPRESSION ERROR',error)
    }

  },[files]);


  const handleSubmit = async (e)=>{
    e.preventDefault()

      console.log('click')
      
    // awesome code
    if(name,description && files.length !==0){
      const showDetails = { name , description, file:files[0]}
    
      //show the laoder
      setLoadingOnModal(true);
      ////file compression algorithm

      //posting shows object to lambda endpoint,inserting all user data in data object
      const data = JSON.stringify({
          Title: name.replace(/ /g,'-'),
          filename : showDetails.file.name,
          //this should be pulled from context
          episodes : [],
          description : description
        
        episodes: [],
        description: description,
        timestamp: new Date(),
        seasons:extraInfo.seasons,
        visibility:extraInfo.visibility,
        tags:extraInfo.tags
      });
        
      console.log(data)

      var config = {
        method: 'POST',
        url: endpoint,
        data : data
      };

      //sending form data to database
      try {
        console.log('sending request...')
        const res = await axios(config);
        response = await res.data
        
        console.log(response);
      } catch (error) {
        console.log('THERE WAS AN ERROR',error)
      }

      //sending images to s3 bucket
      try {
         
        console.log('posting images to s3 ...');

        if (response){
          //destructuring out presined urls from response
          const {smallCoverArtPresignedUrl} = response
          const {largeCoverArtPreSignedUrl} = response
          
          //Posting image to presigned url
          await axios.put(smallCoverArtPresignedUrl,compressedImage,{
              'Content-Type': 'image/jpeg',
          });

          await axios.put(largeCoverArtPreSignedUrl,files[0],{
              'Content-Type': 'image/jpeg',
          });
          

          //setAddedNew(true)
          setLoadingOnModal(false)
          setFetchAgain(!fetchAgain)
          setModalOpen(false)
          
        }

      } catch (error){
        console.log('IMAGE POST ERROR',error)
      }

      console.log(showDetails)
      
    }
  }


  const handleSetFiles = (file) => {
    setFiles(file);
  };

  return (
    <div style={{ height: "100%" }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: "fixed", bottom: "32px", right: "32px" }}
        icon={<SpeedDialIcon />}
        onClose={handleCloseSpeedDail}
        onOpen={handleOpenSpeedDail}
        onClick={handleOpen}
        open={openSpeedDail}
      >
        {/* {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleCloseSpeedDail}
              />
            ))} */}
      
      </SpeedDial>
      {/* </Box> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Box sx={{ margin: "0 10px",position:'relative' }}>

              {/* LOADER COMPONENT */}

              <ModalLoader
               loadingOnModal = {loadingOnModal} 
               action = 'uploading'
               />

              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h4"
              >
                CREATE SHOWS
              </Typography>
              <hr style={{ width: "100px", margin: "10px 0" }} />
            </Box>
            <Typography variant="p" sx={{ fontSize: "11px", margin: "0 10px" }}>
              <b>NOTE :</b> ONLY SHOWS WITH VIDEOS UNDERNEATH THEM ARE VISIBLE
              TO THE PUBLIC
            </Typography>
            <Box sx={{ height: "250px", display: "flex" }}>
              <Box style={{ height: "100%", width: "50%", padding: "10px" }}>
                <CreateShow
                  files={files}
                  handleSetFiles={handleSetFiles}
                  img={"logo.svg"}
                />
              </Box>
              <Box style={{ height: "100%", width: "50%", padding: "10px" }}>
                <form onSubmit={handleSubmit}>
                  <input
                    style={{
                      height: "50px",
                      width: "100%",
                      background: "#222",
                      display: "flex",
                      alignItems: "center",
                      padding: "10px ",
                      color: "white",
                      border: "none",
                    }}
                    placeholder="SHOW NAME"
                    onChange={(e) => SetName(e.target.value)}
                  />
                  {/* <p style={{margin:"0px 10px",fontSize:"14px"}}>{'SHOW NAME'}</p>  */}

                  <textarea
                    placeholder="SHOW DESCRIPTION"
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
                </form>
              </Box>
            </Box>
                            onChange={(e)=>{
                              setExtraInfo({...extraInfo , seasons:e.target.value })
                            }}
                              placeholder="Seasons"
                              name="seasons"
                              type="number"
                              value={extraInfo.seasons}
                              style={{
                                height: "45px",
                                width: "100%",
                                background: "#222",
                                display: "flex",
                                alignItems: "center",
                                margin: "8px 0",
                                padding: "10px ",
                                color: "white",
                                border: "none",
                              }}
                            />

                            <Box sx={{ display: "flex", alignItems: "center" }}>
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
                                padding: "8px",
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

                            <Select
                              // onChange={handleShowType}
                              sx={{
                                margin: "16px 0",
                                padding: "0px 0",
                                width: "100%",
                                margin: 0,
                              }}
                              name="visibility"
                              value={extraInfo.visibility}
                              ariaLabel="Visiblity"
                              label="Visiblity"
                              placeholder="Public"
                            >
                              {["Public", "Private"].map((item, index) => {
                                return (
                                  <MenuItem
                                    onClick={() =>  setExtraInfo({...extraInfo , visibility:item })}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
