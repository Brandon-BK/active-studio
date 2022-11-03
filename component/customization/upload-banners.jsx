import * as React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ShowOptions from "../shows-utils/showOptions";
import BannerOptions from "./bannerOptions";
import CreateBanner from "./create-banner";
import { AppConfigContext } from "../context/AppConfigContext";

const UploadBanners = () => {

  const { configuration } = React.useContext(AppConfigContext);

  const { banners } = configuration
  console.log(banners)

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
            Current Banners
          </Typography>
          <Grid container spacing={3}>
            {banners.map((img, index) => {
              return (
                <Grid item md={3}>
                <Box
                  sx={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url("${img}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    margin: "0 8px",
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
                      bannerInfo={{title:"banner" + index+1, img , index}}                      
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
      <CreateBanner />

    </Box>
  );
};

export default UploadBanners;
