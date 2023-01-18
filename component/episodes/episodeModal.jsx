import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { Box, Select, MenuItem } from "@mui/material";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import BasicVideo from "../Popup/Basic-video";
import { useState } from "react";
import CreateEpisodeCoverArt from "./create-episode-coverArt";
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

export default function EpisodeModal({
  open,
  setOpen,
  sync,
  setSync,
  files,
  setFiles,
  videoFiles,
  setVideoFiles,
  episodes,
}) {
  const {
    singleShowData,
    setShowJsonData,
    showJson,
    setShowJson,
    jsonEpisodes,
  } = React.useContext(AppContext);
  console.log("json episodes", jsonEpisodes);
  const [bool, setBool] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCreate = () => setBool(true);

  // receive input values from show name and show description
  const [name, SetName] = useState("");
  const [description, SetDescription] = useState("");
  const [imagecover, SetImageCover] = useState("");

  //episode info stored in state

  const [author, setAuthor] = useState("");
  const [seasonNum, setSeasonNum] = useState(1);

  //modal loader state
  const [loading, setLoading] = useState(false);

  //CREATE EPISODE BUTTON HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(sync);

    // awesome code
    if ((name, description, author)) {
      try {
        setLoading(true);

        const prevEpisodes = episodes;

        const showDetails = { name, description, file: files[0] };

        console.log("sending request....");
        //posting episode object to lambda endpoint,inserting all user data in data object
        const date = new Date();
        const timestamp = date.getTime();

        const EpisodeObject = {
          Title: name.replace(/ /g, "-"),
          episodeName: name,
          showTitle: singleShowData.Title?.replace(/ /g, "-"), //this must be the show title,(not episode)
          thumbnailFilename: showDetails.file.name,
          videoFileName: videoFiles[0]?.name,
          description: description,
          timestamp: timestamp,
          author,
          seasonNum,
          episodeType,
          
        };
        console.log({ EpisodeObject });

        const episodesEndpoint = API_INSTANCE + "/create-episode";
        const config = {
          method: "post",
          url: episodesEndpoint,
          data: JSON.stringify(EpisodeObject),
        };

        const response = await axios(config);

        console.log({ createEpisodeResponse: response });
        const { showMetaDataSignedUrl } = response.data;
        const { allEpisodesSignedUrl } = response.data;
        const {mediaUrls} = response.data
        
        EpisodeObject['CoverArtLarge'] = mediaUrls.largeCoverArt
        
        //posting the json data
        console.log("posting json data...");
        const jsonDataConfig = {
          method: "put",
          url: showMetaDataSignedUrl,
          headers: {
            "Content-Type": "application/json",
          },

          data: JSON.stringify(
            {
              ...showJson,
              episodes: [...episodes, EpisodeObject],
            },
            null,
            2
          ),
        };

        //for the episodes json on s3
        const episodesConfig = {
          method: "put",
          url: allEpisodesSignedUrl,
          headers: { "Content-Type": "application/json" },
          data: [...jsonEpisodes.Episodes, EpisodeObject],
        };
        await axios(jsonDataConfig);
        await axios(episodesConfig);
        //posting the thumbnail
        const { largeCoverArt } = response.data;

        console.log("posting thumbnail....");
        await axios.put(largeCoverArt, files[0], {
          "Content-Type": "image/jpeg",
        });

        //posting the video file
        const { episodeVideoSignedUrl } = response.data;

        //posting video....
        console.log("posing video...");
        await axios.put(episodeVideoSignedUrl, videoFiles[0], {
          "Content-Type": "video/mp4",
        });
        console.log(sync);

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

  const handleSetFiles = (file) => {
    setFiles(file);
  };
  const handleSetVideoFiles = (file) => {
    console.log({ video: file });
    setVideoFiles(file);
  };

  const [episodeType, setEpisodeType] = useState("none");

  const handleEventType = (e) => {
    setEpisodeType(e.target.value);
  };

  return (
    <form style={{ height: "auto" }}>
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
          <Box sx={style}>
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
            <Typography variant="p" sx={{ fontSize: "11px", margin: "0 10px" }}>
              <b>NOTE :</b> ONLY EPISODES WITH VIDEOS UNDERNEATH THEM ARE
              VISIBLE TO THE PUBLIC
            </Typography>
            <ModalLoader
              loadingOnModal={loading}
              action="uploading"
              height="90vh"
              width="100%"
              style={{ height: "100%" }}
            />
            <Box sx={{ display: "flex" }}>
              <Box style={{ height: "100%", width: "50%", padding: "10px" }}>
                <CreateEpisodeCoverArt
                  files={files}
                  handleSetFiles={handleSetFiles}
                  img={"logo.svg"}
                />
              </Box>
              <Box></Box>
              <Box
                style={{
                  height: "100%",
                  width: "50%",
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
                    type="number"
                    min={1}
                    placeHolder="SEASON NUMBER"
                    onChange={(e) => setSeasonNum(e.target.value)}
                    style={{
                      border: "none",
                      width: "100%",
                      height: "34px",
                      padding: "10px 0",
                      background: "#222",
                      display: "flex",
                      alignItems: "flex-start",
                      padding: "10px 0",
                      marginTop: "20px",
                      padding: "10px",
                      color: "white",
                    }}
                  />
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {/*<Typography>Episode Type : </Typography>*/}
                    <Select
                      label="Episode Type"
                      placeholder="Episode Type"
                      value={episodeType}
                      ariaLabel="Episode Type"
                      onChange={handleEventType}
                    >
                      <MenuItem value="none">None</MenuItem>
                      <MenuItem value="featured episode">
                        Featured Episode
                      </MenuItem>
                    </Select>
                  </Box>
                </form>
              </Box>
            </Box>

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
              Start sharing your story and connect with viewers. Videos that you
              upload will show up here
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                width: "100%",
                padding: "0 10px",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                sx={{
                  "&:hover": { background: "red", color: "white" },
                  marginTop: "50px",
                }}
                onClick={handleClose}
              >
                close
              </Button>
              <Button
                type="submit"
                color="success"
                variant="outlined"
                sx={{
                  "&:hover": { backgroundColor: "darkgreen", color: "white" },
                  marginTop: "50px",
                }}
                onClick={handleSubmit}
              >
                create
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </form>
  );
}
