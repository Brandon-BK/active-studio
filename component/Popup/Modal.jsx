import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Select, Grid, MenuItem, TextField, Stack } from "@mui/material";
import { Container, Stepper, Step, StepLabel } from "@mui/material";
import CreateShow from "../create-show/create-show";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

import { useState, useEffect, useContext } from "react";
const axios = require("axios");
import imageCompression from "browser-image-compression";
import { AppContext } from "../context/AppContext";

import { API_INSTANCE } from "../../app-config";
import { CloseRounded } from "@mui/icons-material";
import { ModalLoader } from "../loader";

export default function CreateShowModal({
  modalOpen,
  setModalOpen,
  loading,
  loadingOnModal,
  setLoadingOnModal,
  enqueueSnackbar,
}) {
  const { setAddedNew, showEpisodes, showsSync, setShowsSync } =
    useContext(AppContext);

  const [files, setFiles] = React.useState([]);
  const [bool, setBool] = React.useState(false);
  const [showType, setShowType] = React.useState("Free Show");

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleCreate = () => setBool(true);

  const [openSpeedDail, setOpenSpeedDail] = React.useState(false);
  const handleOpenSpeedDail = () => setOpenSpeedDail(true);
  const handleCloseSpeedDail = () => setOpenSpeedDail(false);

  // receive input values from show name and show description
  const [extraInfo, setExtraInfo] = useState({
    author: "",
    tags: [],
    visibility: "public",
  });
  const [name, SetName] = React.useState("");
  const [description, SetDescription] = React.useState("");
  const [tagValue, setTagValue] = React.useState("");
  const [tags, setTags] = React.useState([]);

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
  var compressedImage = {};
  var response = {};

  //THE CREATE SHOWS ENDPOINT

  const endpoint = `${API_INSTANCE}/create-shows`;
  //const endpoint = 'http://127.0.0.1:3000/create-shows'

  useEffect(async () => {
    console.log("new fie to be compressed");
    //original file...
    console.log("THE FILES", files[0]);
    setLoadingOnModal(false);
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

  //stepper state and functionality
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Upload Thumbnail", "Upload Logo", "Enter Show Information"];
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
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

        enqueueSnackbar(
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

  //######################################//

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("click");

    // awesome code
    if ((name, description && files.length !== 0)) {
      const showDetails = { name, description, file: files[0] };

      //show the laoder
      setLoadingOnModal(true);

      console.log("loading:", loading);
      ////file compression algorithm

      //posting shows object to lambda endpoint,inserting all user data in data object
      const date = new Date();
      const timestamp = date.toLocaleString();

      const data = JSON.stringify({
        Title: name.replace(/ /g, "-"),
        filename: showDetails.file.name,
        showName: name,
        //this should be pulled from context
        description: description,
        timestamp: timestamp,
        visibility: extraInfo.visibility,
        description: description,
        timestamp: new Date().toLocaleString(),
        seasons: extraInfo.seasons,
        visibility: extraInfo.visibility,
        tags: tags,
        author: extraInfo.author,
      });

      //shows meta data that will be posted to s3 and retrived on a 'getsingleshow call
      const showMetaData = {
        ...JSON.parse(data),
        likes: 0,
        tags: extraInfo.tags,
        episodes: [],
      };

      //configs for axios post
      var config = {
        method: "POST",
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
          const { smallCoverArtPresignedUrl } = response;
          const { largeCoverArtPreSignedUrl } = response;
          const { showsMetaDataSignedUrl } = response;

          //Posting image to presigned url
          await axios.put(smallCoverArtPresignedUrl, compressedImage, {
            "Content-Type": "image/jpeg",
          });

          await axios.put(largeCoverArtPreSignedUrl, files[0], {
            "Content-Type": "image/jpeg",
          });

          //posting json meta data to s3
          const metaDataConfig = {
            method: "put",
            url: showsMetaDataSignedUrl,
            headers: {
              "Content-Type": "application/json",
            },

            data: JSON.stringify(showMetaData, null, 2),
          };

          await axios(metaDataConfig);

          console.log(`successfully posted to images to s3!!`);
          console.log("POSTED FILES :", files[0], compressedImage);

          //setAddedNew(true)
          setLoadingOnModal(false);
          setShowsSync(!showsSync);
          setModalOpen(false);
        }
      } catch (error) {
        setLoadingOnModal(false);
        console.log("IMAGE POST ERROR", error);
      }

      console.log(showDetails);
    }
  };

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
      ></SpeedDial>
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
            <Box sx={{ margin: "0 10px", position: "relative" }}>
              {/* LOADER COMPONENT */}

              <ModalLoader
                height="80vh"
                loadingOnModal={loadingOnModal}
                action="uploading"
              />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Stack>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h4"
                  >
                    {showType != "Free Show" ? "Create Show" : "Embed Video"}{" "}
                  </Typography>

                  <Typography
                    id="transition-modal-title"
                    variant="p"
                    component="p"
                  >
                    {showType != "Free Show"
                      ? "Upload Active TV Orginal Content For Users."
                      : "Embed Code From External Video Platform By Iframe."}{" "}
                  </Typography>
                </Stack>
                <Select
                  // onChange={handleShowType}
                  sx={{ padding: "0px 0", margin: 0 }}
                  // variant
                  value={showType}
                  ariaLabel="Show Type"
                  label="Show Type"
                  placeholder="Show Type"
                >
                  {["Free Show", "Active TV Original"].map((item, index) => {
                    return (
                      <MenuItem
                        onClick={() => handleShowType(item)}
                        key={index}
                        value={item}
                      >
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Box>

              <hr style={{ width: "100px", margin: "10px 0" }} />
            </Box>
            <Stepper activeStep={activeStep} sx={{ margin: "20px 0px" }}>
              {steps.map((step, i) => (
                <Step key={step}>
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
                {showType === "Free Show" ? (
                  <Box
                    sx={{
                      minHeight: "35vh",
                      // background: "red",
                      padding: "21px 8px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      alignItems: "flex-end",
                    }}
                  >
                    <TextField
                      name="Title"
                      onChange={handleFieldChange}
                      value={iframeUploader.Title}
                      fullWidth
                      label="Show Title"
                    />
                    <TextField
                      value={iframeUploader.EmbedCode}
                      onChange={handleFieldChange}
                      name="EmbedCode"
                      type="textarea"
                      sx={{ margin: "12px 0" }}
                      fullWidth
                      label="Embed Link"
                    />
                    {/* <TextField
                  value={iframeUploader.url}
                  onChange={handleFieldChange}
                  name="url"
                  type="textarea"
                  sx={{ margin: "12px 0" }}
                  fullWidth
                  label="Url"
                /> */}
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
                      onClick={handleIframe}
                    >
                      create
                    </Button>
                    <Iframe iframe={iframeUploader.EmbedCode} />
                    {/* {iframeUploader.EmbedCode} */}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      minHeight: "35vh",
                      background: "",
                      padding: "8px 0",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      // alignItems: "flex-end",
                    }}
                  >
                    {activeStep === 0 && (
                      <Box>
                        <Typography
                          variant="p"
                          sx={{
                            fontSize: "14px",
                            margin: "0 10px",
                            width: "95%",
                          }}
                        >
                          <b>NOTE :</b> ONLY SHOWS WITH VIDEOS UNDERNEATH THEM
                          ARE VISIBLE TO THE PUBLIC
                        </Typography>
                        <Box
                          style={{
                            height: "100%",
                            width: "100%",
                            padding: "10px 0",
                          }}
                        >
                          <CreateShow
                            ratioRef={ratioRef}
                            determineRatio={determineRatio}
                            setFiles={setFiles}
                            media_type={"cover image"}
                            accepted_type={"JPEG/JPG"}
                            files={files}
                            handleSetFiles={handleSetFiles}
                            img={"logo.svg"}
                          />
                        </Box>
                      </Box>
                    )}
                    {activeStep === 1 && (
                      <Box>
                        <h2>LOGO UPLOAD</h2>
                      </Box>
                    )}
                    {activeStep === 2 && (
                      
                        
                          <Box sx={{  display: "flex",justfyContent:'center',width:'100%' }}>
                            <Box
                              style={{
                                height: "100%",
                                width: "130%",
                                display : 'flex',
                                justifyContent:'center',
                                padding: "10px",
                                marginTop: "48px",
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
                                  placeholder="SHOW NAME"
                                  onChange={(e) => SetName(e.target.value)}
                                  required
                                />
                                {/* <p style={{margin:"0px 10px",fontSize:"14px"}}>{'SHOW NAME'}</p>  */}

                                <textarea
                                  placeholder="SHOW DESCRIPTION here"
                                  onChange={(e) =>
                                    SetDescription(e.target.value)
                                  }
                                  required
                                  style={{
                                    border: "none",
                                    width: "100%",
                                    height: "170px",
                                    padding: "10px 0",
                                    background: "#222",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    padding: "10px 0",
                                    marginTop: "20px",
                                    padding: "10px",
                                    marginBottom: "21px",
                                    color: "white",
                                  }}
                                ></textarea>
                                <Box sx={{ marginTop: "0px" }}>
                                  
                                  <input
                                    onChange={(e) => {
                                      setExtraInfo({
                                        ...extraInfo,
                                        author: e.target.value,
                                      });
                                    }}
                                    placeholder="Author"
                                    name="Author"
                                    type="text"
                                    required
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

                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
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
                                            key={index}
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
                                    {["Public", "Private"].map(
                                      (item, index) => {
                                        return (
                                          <MenuItem
                                            onClick={() =>
                                              setExtraInfo({
                                                ...extraInfo,
                                                visibility: item,
                                              })
                                            }
                                            key={index}
                                            value={item}
                                          >
                                            {item}
                                          </MenuItem>
                                        );
                                      }
                                    )}
                                  </Select>
                                </Box>
                              </form>
                            </Box>
                          </Box>
                        
                      
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        width: "70%",
                        justifyContent: "space-between",
                        margin: "20px 0",
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
                      
                        }}
                        onClick={activeStep === 0 ? handleClose : handleBack}
                      >
                        {activeStep === 0 ? "close" : "back"}
                      </Button>
                      <Button
                        type={
                          activeStep !== steps.length - 1 ? "button" : "submit"
                        }
                        color={
                          activeStep !== steps.length - 1
                            ? "primary"
                            : "success"
                        }
                        disabled={
                          activeStep === 0
                            ? !correctRatio
                            : activeStep === 1
                            ? false
                            : activeStep === 2
                            ? !(name && description,extraInfo.author)
                            : false
                        }
                        variant="outlined"
                        sx={{
                          "&:hover": {
                            backgroundColor:
                              activeStep !== steps.length - 1
                                ? "blue"
                                : "darkgreen",
                            color: "white",
                          },
                        }}
                        onClick={
                          activeStep !== steps.length - 1
                            ? handleNext
                            : handleSubmit
                        }
                      >
                        {activeStep !== steps.length - 1 ? "Next" : "Upload"}
                      </Button>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
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
  width: "55%",
  boxShadow: 24,
  color: "white",
  p: 2,
};
