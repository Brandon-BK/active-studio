import * as React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ShowOptions from "../shows-utils/showOptions";
import BannerOptions from "./bannerOptions";
import CreateProfilePicture from "./upload-profile-pics";
import axios from 'axios'
import { API_INSTANCE } from "../../app-config/index.";
import { AppContext } from "../context/AppContext";
const ProfilePictures = () => {

  const {bannerSync,setBannerSync} = React.useContext(AppContext)
  const [loadingOnModal,setLoadingOnModal] = React.useState(false)
  const [ImagesArr,setImagesArr] = React.useState([])
  const [sync,setSync] = React.useState(false)

  React.useEffect(()=>{
    async function getImages(){
      
      const response = await axios.get(API_INSTANCE + '/get-profile-pictures')
      setImagesArr(response.data.profilePictureUrls)
      console.log('recieved profile pictures',response.data)
    }
    getImages()

  },[bannerSync])

  return (
    <Box
      sx={{
        height: "auto",
        width: "100%",
        background: ""
      }}
    >

     <Box sx={{ height:'85vh'}}>
     <Grid container>
        <Grid
          item
          md={12}
          sx={{
            p: 1.5,
            height: "90vh",
            overflowY: "hidden",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "",
            // justifyContent: "center",
            background: "",
            border: "1px solid rgba(251,251,251,.2)"
          }}
        >
          <Typography sx={{ fontSize: "32px", margin: "12px 0" }}>
            Profile Pictures
          </Typography>
          <Grid container spacing={3}>
            {ImagesArr.map((img, index) => {
              return (
                <Grid item md={3} key ={index}>
                <Box
                  sx={{
                    width: "100%",
                    height: "250px",
                    backgroundImage: `url("${img}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    margin: "0 8px",
                    // borderRadius:"50%",
                    justifyContent: "flex-end"
                  }}
                >
                  <Box
                    sx={{
                      // margin:'8px',
                      padding: "8px",
                      background: "rgba(1,1,1,.7)",
                      height: "fit-content"
                    }}
                  >
                    <BannerOptions
                      
                      title={`Avator ${index + 1}`}
                      img={img}
                      imgUrl = {img}
                      apiPath = {'/delete-profile-picture'}                      
                      loadingOnModal={loadingOnModal}
                      setLoadingOnModal={setLoadingOnModal}
                      bannerSync = {bannerSync}
                      setBannerSync = {setBannerSync}
                    />
                  </Box>
                </Box>
              </Grid>
              );
            })}
          </Grid>
        </Grid>
       
      </Grid>
     </Box>
     <CreateProfilePicture/>

    </Box>
  );
};

export default ProfilePictures;
