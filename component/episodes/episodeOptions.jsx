import * as React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import { Backdrop, Box, Typography, Button, Fade } from "@mui/material";
import { ModalLoader } from "../loader";
import { AppContext } from "../context/AppContext";
import { API_INSTANCE } from "../../app-config";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import EditEpisodeModal from "./edit-episode-modal";
const modalStyle = {
  position: "absolute",
  background: "#111",
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

export default function EpisodeOptions({
  title,
  setSync,
  sync,
  index,
  episodes,
  episode,
  files,
  setFiles, 
  videoFiles, 
  setVideoFiles ,
  imageUrl
}) {
  const { singleShowData, showJson, setShowJson } =
    React.useContext(AppContext);
    console.log({episode})
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  //EDIT FUNCTION
  const [openEPModal, setOpenEPModal] = React.useState(false);
  const openEpisodeModal = () => {
    setOpenEPModal(true);
  };
  //DELETE FUNCTION
  const handleDeleteClick = async () => {
    const prevEpisodes = episodes;

    setLoading(true);

    const deleteEndpoint = `${API_INSTANCE}/delete-episode`;

    //const deleteEndpoint = 'http://127.0.0.1:3000/delete-episode'

    try {
      console.log(title);

      console.log("deleting...");

      const deleteEpisodeConfig = {
        method: "Delete",
        url: deleteEndpoint,
        data: JSON.stringify({ showTitle: singleShowData.Title, title }),
      };
      console.log("deleteData:", deleteEpisodeConfig.data);

      const response = await axios(deleteEpisodeConfig);
      console.log(response);
      const { deleteSignedUrl } = response.data;
      console.log({ deleteSignedUrl });
      const newJson = {
        ...showJson,
        episodes: prevEpisodes,
      };
      newJson.episodes.splice(index, 1);
      const jsonDataConfig = {
        method: "put",
        url: deleteSignedUrl,
        headers: {
          "Content-Type": "application/json",
        },

        data: JSON.stringify(newJson, null, 2),
      };
      //prevEpisodes.splice(index,1)
      console.log("deleteData22:", jsonDataConfig.data);
      await axios(jsonDataConfig);

      setLoading(false);

      //,{header:{'Content-Type' : 'application/json'}});
      console.log("RESPONSE:", response);
      setAnchorEl(null);
      setSync(!sync);
      setOpenModal(false);
      console.log("DELETED!!!!");
    } catch (error) {
      console.log("endpoint :", deleteEndpoint);

      console.log("DELETE ERROR:", error);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div>
      <MoreHorizIcon
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        cursor="pointer"
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem
          onClick={openEpisodeModal}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <EditIcon sx={{ marginRight: "4px" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleModalOpen}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <DeleteIcon sx={{ marginRight: "4px" }} />
          Delete
        </MenuItem>
      </Menu>

        {/* EDIT EPISODE MODAL */}
      {/* DELETE CONFIRMATION PROMPT */}
      <EditEpisodeModal 
        open = {openEPModal}
        setOpen = {setOpenEPModal}
        files = {files}
         setFiles = {setFiles}
         videoFiles = {videoFiles}
         setVideoFiles = {setVideoFiles}
         episode = {episode} 
          episodes = {episodes}
          sync = {sync}
          setSync = {setSync}
          index = {index}
          imageUrl = {imageUrl}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        open={openModal}
        onClose={handleModalClose}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <Box style={modalStyle}>
            <Box sx={{ margin: "0 10px", position: "relative" }}>
              <ModalLoader action="deleting" loadingOnModal={loading} />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h4"
                sx={{ textAlign: "center" }}
              >
                WARNING
              </Typography>
              <hr style={{ width: "100%", margin: "10px 0" }} />
            </Box>
            <Box sx={{ margin: "20px 0px" }}>
              <Typography sx={{ textAlign: "center" }}>
                Are you sure you want to delete <b>{title}</b> ?
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                sx={{
                  "&:hover": { background: "red", color: "white" },
                  width: "20%",
                }}
                onClick={handleModalClose}
              >
                CANCEL
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
                  width: "20%",
                }}
                onClick={handleDeleteClick}
              >
                YES
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
