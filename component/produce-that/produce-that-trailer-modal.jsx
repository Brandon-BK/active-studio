import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import {
  Box,
  Container,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import BasicVideo from "../Popup/Basic-video";
import { useState } from "react";
import CreateEpisodeCoverArt from "../episodes/create-episode-coverArt";
import { AppContext } from "../context/AppContext";
import { ModalLoader } from "../loader";
import { API_INSTANCE, MEDIA_URL_INSTANCE } from "../../app-config";
import { useRouter } from "next/router";
const axios = require("axios");
// const ffmpeg = require("fluent-ffmpeg");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#111",
  // border: "2px solid #fff",
  overflow: "auto",
  padding: "20px 0",
  height: "90vh",
  width: "600px",
  boxShadow: 24,
  color: "white",
  p: 2,
  // border:'1px solid red',
  overflowX: "hidden",
};

export default function ProduceThatTrailer(props) {
  const { open, setOpen, sync, setSync, dashboard, show } = props;
  
  const {
    setShowJson,
    jsonEpisodes,
    shows,
    setEpisodes,
    setSingleShowData,
  } = React.useContext(AppContext);
  console.log("json episodes", jsonEpisodes);

  const handleClose = () => setOpen(false);

  // receive input values from show name and show description
  const [name, SetName] = useState("");
  const [description, SetDescription] = useState("");
  const [selectedShow, setSelectedShow] = useState("");
  //episode info stored in state

  const [author, setAuthor] = useState("");

  //modal loader state
  const [loading, setLoading] = useState(false);

  //stepper state and data
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Upload Thumbnail",
    "Enter Episode Information",
    "Upload Episode Video",
  ];

  //image and video files
  const [files, setFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const ratioRef = React.useRef(undefined);
  const [correctRatio, setCorrectRatio] = useState(false);
  function determineRatio(ratio) {
    console.log("ratio ref", ratio);
    if (ratio) {
      if (ratio == "16:9") {
        setCorrectRatio(true);
      } else {
        setCorrectRatio(false);
        console.log("FALSE", ratio);

        props.enqueueSnackbar(
          `Please insert thumbnail with correct aspect ratio (16:9) <${ratioRef.current}>`,
          {
            preventDuplicate: true,
            variant: "warning",
          }
        );
        return false;
      }
    } else {
      setCorrectRatio(false);

      // props.enqueueSnackbar('bad')
    }
  }

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  //CREATE EPISODE BUTTON HANDLER
  const handleSetFiles = (file) => {
    setFiles(file);
  };
  const handleSetVideoFiles = (file) => {
    console.log({ video: file });
    setVideoFiles(file);
  };

  const handleShowChange = (e) => {
    setSelectedShow(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(sync);

    // awesome code
    if ((name, description, author)) {
      try {
        setLoading(true);

        if ((dashboard, selectedShow)) {
          const fetchShow = async () => {
            setLoading(true);
            const res = await axios.get(
              `${API_INSTANCE}/get-show/${selectedShow}`
            );
            const show = res.data;
            console.log({ SHOW: show });

            setSingleShowData(show.showItem.Item);
            setShowJson(show.showJson);
            setEpisodes(show.showJson.episodes);
            setLoading(false);
          };
          fetchShow();
        }

        console.log("sending request....");
        //posting episode object to lambda endpoint,inserting all user data in data object
        const date = new Date();
        const timestamp = date.getTime();

        const TrailerObject = {
          showID : show.ID,
          Title: name.replace(/ /g, "-"),
          trailerName: name,
          showTitle: show.Title.replace(/ /g, "-"), //this must be the show title,(not episode)
          description: description,
          lastUpdated: timestamp,
          author,
          showCoverArt: show?.CoverArtLarge,
        };
        console.log({ TrailerObject });

        // const episodesEndpoint = API_INSTANCE + "/create-pt-trailer";
        const trailers = show.trailers ? show.trailers : [];
        
        const episodesEndpoint = "http://127.0.0.1:3000/create-pt-trailer";
        const config = {
          method: "post",
          url: episodesEndpoint,
          data: JSON.stringify({trailers,TrailerObject}),
        };

        const response = await axios(config);

        console.log({ createEpisodeResponse: response });

        const { largeCoverArtPreSignedUrl } = response.data;
        const { videoPresignedUrl } = response.data;

        console.log("posting thumbnail....");
        if (files.length) {
          await axios.put(largeCoverArtPreSignedUrl, files[0], {
            "Content-Type": "image/jpeg",
          });
        }
        //posting video....
        console.log("posing video...");
        if (videoFiles.length) {
          await axios.put(videoPresignedUrl, videoFiles[0], {
            "Content-Type": "video/mp4",
          });
        }

        setLoading(false);
        setOpen(false);
        console.log("episode created !!!");
        setSync(!sync);
      } catch (error) {
        setLoading(false);
        console.log("create episode error:", error);
      }
    } else {
      alert("insert data");
    }
  };

  return (
    <form style={{}}>
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
        sx={{}}
      >
        <Fade in={open}>
          <Box sx={{ ...style, height: "90vh" }}>
            <Box sx={{ margin: "0 10px" }}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h4"
              >
                CREATE EPISODES
              </Typography>
              <hr style={{ width: "100px", margin: "10px 0" }} />
            </Box>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "90%",
              }}
            >
              <Stepper activeStep={activeStep} sx={{ margin: "20px 0px" }}>
                {steps.map((step, i) => (
                  <Step key={i}>
                    <StepLabel>{step}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {/* <Button onClick={handleReset}>Reset</Button> */}
                  </Box>
                </>
              ) : (
                <>
                  {activeStep === 0 && (
                    <>
                      <Typography
                        variant="p"
                        sx={{ fontSize: "11px", margin: "12px 10px" }}
                      >
                        <b>NOTE :</b> ONLY EPISODES WITH VIDEOS UNDERNEATH THEM
                        ARE VISIBLE TO THE PUBLIC
                      </Typography>
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                          padding: "10px",
                        }}
                      >
                        <CreateEpisodeCoverArt
                          ratioRef={ratioRef}
                          files={files}
                          setFiles={setFiles}
                          handleSetFiles={handleSetFiles}
                          img={"logo.svg"}
                          determineRatio={determineRatio}
                        />
                      </Box>
                    </>
                  )}
                  {activeStep === 1 && (
                    <>
                      <Box
                        style={{
                          height: "90vh",
                          width: "70%",
                          padding: "10px",
                          marginTop: "3px",
                        }}
                      >
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
                            placeholder="EPISODE NAME"
                            onChange={(e) => SetName(e.target.value)}
                          />
                          {/* <p style={{margin:"0px 10px",fontSize:"14px"}}>{'SHOW NAME'}</p>  */}

                          <textarea
                            placeholder="EPISODE DESCRIPTION"
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

                          <input
                            type="text"
                            placeHolder="Author"
                            required
                            onChange={(e) => setAuthor(e.target.value)}
                            style={{
                              height: "50px",
                              width: "100%",
                              background: "#222",
                              display: "flex",
                              alignItems: "center",
                              padding: "10px ",
                              color: "white",
                              border: "none",
                              margin: "20px 0px",
                            }}
                          />

                          {dashboard && (
                            <Box sx={{ display: "flex", margin: "20px 0px" }}>
                              <TextField
                                select
                                label="Show"
                                value={selectedShow}
                                onChange={handleShowChange}
                                fullWidth
                              >
                                {shows.map((show, i) => (
                                  <MenuItem key={i} value={show.Title}>
                                    {show.Title}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>
                          )}
                        </form>
                      </Box>
                    </>
                  )}
                  {activeStep == 2 && (
                    <>
                      <Box sx={{ margin: "0 10px" }}>
                        <Typography
                          id="transition-modal-title"
                          variant="h6"
                          component="h5"
                          // style={{ marginTop: "30px" }}
                        >
                          UPLOAD A VIDEO FOR THIS EPISODE
                        </Typography>
                        <hr style={{ width: "100px", margin: "10px 0" }} />
                      </Box>
                      <Typography
                        style={{
                          fontSize: "10px",
                          textTransform: "uppercase",
                          textAlign: "left",
                          margin: "20px 0 0 10px",
                        }}
                      >
                        <b>NOTE: </b> Accepted files TYPES : video/mp4{" "}
                      </Typography>
                      <Box
                        style={{
                          width: "100%",
                          height: "45%",
                          padding: "10px",
                        }}
                      >
                        <BasicVideo
                          videoFiles={videoFiles}
                          handleSetVideoFiles={handleSetVideoFiles}
                          img={"logo.svg"}
                        ></BasicVideo>
                      </Box>
                      <Typography
                        id="transition-modal-title"
                        sx={{
                          margin: "0px 0 0 10px",
                          textTransform: "uppercase",
                          fontSize: "11px",
                          textAlign: "center",
                        }}
                      >
                        Start sharing your story and connect with viewers.
                        Videos that you upload will show up here
                      </Typography>
                    </>
                  )}
                </>
              )}

              <ModalLoader
                loadingOnModal={loading}
                action="uploading"
                height="90vh"
                width="100%"
                style={{ height: "100%" }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  width: "100%",
                  padding: "0 10px",
                  justifySelf: "flex-end",
                  alignSelf: "flex-end",
                }}
              >
                <Button
                  variant="outlined"
                  color={activeStep === 0 ? "error" : "info"}
                  sx={{
                    "&:hover": {
                      background: activeStep === 0 ? "red" : "#777",
                      color: "white",
                    },
                    marginTop: "50px",
                  }}
                  onClick={activeStep === 0 ? handleClose : handleBack}
                >
                  {activeStep === 0 ? "close" : "back"}
                </Button>
                <Button
                  type="submit"
                  color={
                    activeStep !== steps.length - 1 ? "primary" : "success"
                  }
                  variant="outlined"
                  disabled={
                    activeStep === 0
                      ? !correctRatio
                      : activeStep === 1
                      ? !(name, description, author)
                      : activeStep === 2
                      ? false
                      : false
                  }
                  sx={{
                    "&:hover": activeStep === steps.length - 1 && {
                      backgroundColor: "darkgreen",
                      color: "white",
                    },
                    marginTop: "50px",
                  }}
                  onClick={
                    activeStep !== steps.length - 1 ? handleNext : handleSubmit
                  }
                >
                  {activeStep !== steps.length - 1 ? "next" : "create"}
                </Button>
              </Box>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </form>
  );
}
