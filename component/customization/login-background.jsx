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
import CloseIcon from '@mui/icons-material/Close';
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
  const {files, setFiles} = props;
  const handleCheck = (e) => {
    console.log(e.target.value);
    setFiles(e.target.value)

  };
  console.log(props.objectField)

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
    // props.setConfiguration({
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
}

          // <aside style={thumbsContainer}>{thumbs}</aside>

export const LoginBackground = () => {
  const { bannerSync, setBannerSync } = React.useContext(AppContext);
  const { configuration, setConfiguration } = React.useContext(AppConfigContext);
  const [files, setFiles] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [editing, setEditing] = React.useState("Sign up");
  const handleSetFiles = (file) => {
    setFiles(file);
  };
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  console.log(files);
  const [loading, setLoading] = React.useState(false);
  const [loginBackgroundData , setLoginBackgroundData ] = useState() 

  console.log(configuration)

  const handleCreate = async () => {
    if (files.length === 0) {
      alert("please select an image");
      return;
    }
    const endpoint = API_INSTANCE + `/post-profile-pictures/${editing.replace(" ","-").toLowerCase()}.jpeg`;
    const configEndpoint = API_INSTANCE + `/post-config/${editing}`;

    try {
      setLoading(true);
      console.log("uploading new image...");
      const response = await axios.post(endpoint);
      console.log("recieved response");
      const {  profilePicturesUrl } = response.data;
      const slitVersion = profilePicturesUrl.split("?")[0]
      console.log("slitVersion : " , slitVersion)

      const configResponse = await axios.post(configEndpoint);
      	// console.log("recieved config response");
      const { configJson } = configResponse.data;
      console.log(configResponse);


      await axios.put(profilePicturesUrl, files[0], {
        "Content-Type": "image/jpeg",
      });

      if(configuration.authenticationImages.sameImage){
		  setConfiguration({
		    	...configuration, 
		    	authenticationImages:{
		    		...configuration.authenticationImages,
		    		signupImage:profilePicturesUrl,
		    		loginImage:profilePicturesUrl,
		    	} 
		
		    })
      const putConfigResponse = await axios.put(configJson , JSON.stringify({...configuration , authenticationImages:{
            ...configuration.authenticationImages,
            signupImage:profilePicturesUrl,
            loginImage:profilePicturesUrl,
          }  }));
      console.log(putConfigResponse)
      }else{
      setConfiguration({
    	...configuration, 
    	authenticationImages:{
    		...configuration.authenticationImages,
    		[`${editing.toLowerCase().split(" ").join("")}Image`]:profilePicturesUrl,
    	} 

    })

      }

      setLoading(false);
      setOpenModal(false);
      setBannerSync(!bannerSync)
    } catch (err) {
      setLoading(false);
      setOpenModal(false);
      console.log("THEWRE WAS AN ERROR UPLOADING THE IMAGE", err);
    }
  };

  console.log(configuration)

  return (
    <Box sx={{ height: "auto", transform: "translateZ(0px)", flexGrow: 1 }}>
    	<Box sx={{ background:'' , with:'100%' , padding:'1.5rem' }} >
    		<Box sx={{ display:'flex' , alignItems:'center' , justifyContent:'space-between' }}>
    		<Box sx={{ display:'flex' , alignItems:'center' }}>
    			
    			<Typography sx={{ margin:'0 8px' }}> Same background for Login Page and Sign Up ? </Typography> 
    			  <Switch checked={configuration.authenticationImages.sameImage} onClick={(e)=> {
    			  	console.log(configuration)
    			  	setConfiguration({
    			  		...configuration , 
    			  		authenticationImages:{
    			  			...configuration.authenticationImages,
    			  			sameImage : configuration.authenticationImages.sameImage ? false : true
    			  		}
    			  		})
    			  }}
    			   />
    		
    		</Box>
    		<TextField
    			value={editing} 
    			onChange={(e)=> setEditing(e.target.value)}
    			select 
    			disabled={configuration.authenticationImages.sameImage} 
    			label="Select Image Destination " sx={{ width:'400px' , 
    			cursor:configuration.authenticationImages.sameImage ? "not-allowed" : 'auto',
    			"&:hover":{cursor:configuration.authenticationImages.sameImage ? "not-allowed" : 'auto'}
    		  }}>
    			<MenuItem value={"Log in"}>Log in</MenuItem>
    			<MenuItem value={"Sign up"}>Sign Up</MenuItem>
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
            width: { xs:'100%'},
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
          <Typography sx={{ fontSize:'36px ' , margin:'21px 0' , fontWeight:'600' }}> Upload {editing} Background Image </Typography>
                <Typography sx={{ fontSize: "12px", margin:'21px 0',textTransform: "uppercase" }}>
          Drag 'n' drop the profile picture jpeg / png / gif
        </Typography>
         <Box sx={{ width:'80%' , margin:'0 auto' , background:'' , border:'2px dashed #eee' }}>
			<UploadBackgroundImage 
				configuration={configuration} 
				setConfiguration={setConfiguration} 
				objectField={`${editing.toLowerCase().split(" ").join("")}Image`}
				files={files} 
				setFiles={setFiles}
			/>
         </Box>
<Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                      width:'80%'
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
}
