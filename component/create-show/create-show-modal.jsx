import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Select , MenuItem} from "@mui/material";
import CreateShow from "./create-show";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import {CreateShowHandler} from "../../pages/api/create-show"
import { useState,useEffect,useContext } from "react";
const axios = require('axios')
import imageCompression from 'browser-image-compression';
import {AppContext} from '../../pages/_app';



const input = {
  background: "#333",
  color: "white",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#111",
  border: "2px solid #fff",
  height: "auto",
  padding: "20px 0",
  width: "600px",
  boxShadow: 24,
  color: "white",
  p: 2,
};

export default function CreateShowModal() {

  const {setAddedNew,open,setOpen} = useContext(AppContext);

  const [files, setFiles] = React.useState([]);
  const [bool, setBool] = React.useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCreate = () => setBool(true);

  const [openSpeedDail, setOpenSpeedDail] = React.useState(false);
  const handleOpenSpeedDail = () => setOpenSpeedDail(true);
  const handleCloseSpeedDail = () => setOpenSpeedDail(false);

  // receive input values from show name and show description
  const [name, SetName] = React.useState("");
  const [description, SetDescription] = React.useState("");
  const [imagecover, SetImageCover] = React.useState("");

  //the compressed image and response will be reassigned with these
  //variables
  var compressedImage = {}
  var response = {}

  //THE CREATE SHOWS ENDPOINT

  const endpoint = 'https://p6x7b95wcd.execute-api.us-east-2.amazonaws.com/cognito_pool/create-shows' 
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
    if(name,description){
      const showDetails = { name , description, file:files[0]}

      ////file compression algorithm

    
      //posting shows object to lambda endpoint,inserting all user data in data object
      const data = JSON.stringify({
          Title: name,
          filename : showDetails.file.name,
          //this should be pulled from context
          episodes : [],
          description : description
        
      });
        
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
          
          console.log(`successfully posted to images to s3!!`)
          console.log('POSTED FILES :',files[0],compressedImage);

          setAddedNew(true)
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
      {/* <Box sx={{ height: "80%", transform: "translateZ(0px)", flexGrow: 1 , }}> */}
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: "d", bottom: "32px", right: "32px" }}
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
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ margin: "0 10px" }}>
              <Box>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h4"
              >
                CREATE SHOWS
              </Typography>
              <Select value="Free Shows">
                <MenuItem>Free Show</MenuItem>
              </Select>
              </Box>
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
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
