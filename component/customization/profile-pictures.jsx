import * as React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ShowOptions from "../shows-utils/showOptions";
import {ProfilePictureOptions} from "./bannerOptions";
import {CreateProfilePictureModal} from "./createProfilePictureModal";
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
            {ImagesArr.slice(1).map((img, index) => {
              return (
                <Grid item md={3}>
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
                    <ProfilePictureOptions
                      show={""}
                      title={"Banner 1"}
                      img={""}
                      fetchAgain={""}
                      setFetchAgain={""}
                      loadingOnModal={""}
                      setLoadingOnModal={setLoadingOnModal}
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
      <CreateProfilePictureModal />

    </Box>
  );
};

export default ProfilePictures;
