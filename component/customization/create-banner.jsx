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
import { API_INSTANCE } from "../../app-config";
import { ModalLoader } from "../loader";
import { AppContext } from "../context/AppContext";

export default function CreateBanner() {
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
    const endpoint = API_INSTANCE + `/post-config/${files[0].name}`;

    try {
      setLoading(true);
      console.log("uploading banner...");
      const response = await axios.post(endpoint);
      console.log("recieved response");
      const { configJson, bannerImageSignedUrl } = response.data;

      console.log({ configJson, bannerImageSignedUrl });
      await axios.put(bannerImageSignedUrl, files[0], {
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
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ModalLoader
            loadingOnModal={loading}
            action="Uploading Banner Image"
            height="100%"
          />
          <Grid container>
            <Grid
              item
              md={6}
              sx={{
                p: 3,
                // border: "1px solid rgba(251,251,251,.2)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "",
                justifyContent: "space-evenly",
                background: "",
              }}
            >
              <Typography sx={{ fontSize: "32px", margin: "12px 0" }}>
                Upload Banner
              </Typography>
              <CreateShow
                media_type={"cover image"}
                accepted_type={"JPEG/JPG"}
                files={files}
                handleSetFiles={handleSetFiles}
                img={"logo.svg"}
              />
            </Grid>
            <Grid
              item
              md={6}
              sx={{
                p: 3,
                // border: "1px solid rgba(251,251,251,.2)",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                background: "",
              }}
            >
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
                <Typography
                  sx={{ color: "#eee", fontSize: "21px", margin: "20px 0" }}
                >
                  Number of Banners
                </Typography>

                <input
                  type="number"
                  style={{
                    height: "80px",
                    width: "100%",
                    background: "#222",
                    display: "flex",
                    alignItems: "center",
                    padding: "10px ",
                    color: "white",
                    border: "none",
                  }}
                  // value={name}
                  placeholder="Number of Banners Displayed"
                  onChange={(e) => SetNumOfBannerImages(e.target.value)}
                />
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
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
