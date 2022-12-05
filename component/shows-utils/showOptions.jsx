import * as React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import { Backdrop, Box, Typography, Button, Fade } from "@mui/material";
import { ModalLoader } from "../loader";
import { API_INSTANCE } from "../../app-config/index.";
import ShareIcon from "@mui/icons-material/Share";
import { Edit } from "@mui/icons-material";
import ShareComponent from "./ShareComponent";
import EditShowModal from "./EditShow";

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

export default function ShowOptions({
  show,
  title,
  img,
  fetchAgain,
  setFetchAgain,
  loadingOnModal,
  setLoadingOnModal,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [shareLink, setShareLink] = React.useState("");
  const [shareOpen, setShareOpen] = React.useState(false);

  const generateShareLink = () => {
    const newLink =
      "https://www.activetvonline.co.za/shows/" + title.replace(/ /g, "-");
    setShareLink(newLink);
    console.log(shareLink);
    setShareOpen(true);
  };
  console.log(show);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleShare = () => {};
  //DELETE FUNCTION
  const handleDeleteClick = async () => {
    setLoadingOnModal(true);
    const showTitle = title.replace(/ /g, "-");
    //const deleteEndpoint = `http://127.0.0.1:3000/delete-show/${showTitle}`

    const deleteEndpoint = `${API_INSTANCE}/delete-show/${showTitle}`;
    //const deleteEndpoint = `https://nahgp463k7.execute-api.us-east-2.amazonaws.com/Prod/delete-show/${showTitle}`

    console.log("endpoint :", deleteEndpoint);

    try {
      console.log(title);

      console.log("deleting...");
      const response = await axios.delete(deleteEndpoint);
      console.log(deleteEndpoint);
      //,{header:{'Content-Type' : 'application/json'}});
      console.log("RESPONSE:", response);
      setAnchorEl(null);
      setFetchAgain(!fetchAgain);
      setOpenModal(false);
      setLoadingOnModal(true);
    } catch (error) {
      console.log("endpoint :", deleteEndpoint);

      console.log("DELETE ERROR:", error);
      setLoadingOnModal(false);
      setOpenModal(false);
    }
    setLoadingOnModal(false);
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
          onClick={() => generateShareLink()}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ShareIcon sx={{ marginRight: "4px" }} />
          <Typography sx={{width:'80%'}}>Share</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <DeleteIcon sx={{ color: "#eee", marginRight: "4px" }} />
          <Typography sx={{width:'80%'}}>Delete</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => setOpenEditModal(true)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Edit sx={{ color: "#eee", marginRight: "4px" }} />
          <Typography sx={{width:'80%'}}>Edit</Typography>
        </MenuItem>
      </Menu>

      {/* DELETE CONFIRMATION PROMPT */}
      <ShareComponent
        open={shareOpen}
        setOpen={setShareOpen}
        shareLink={shareLink}
        img={img}
      />
      <EditShowModal
        show={show}
        openModal={openEditModal}
        setFetchAgain={setFetchAgain}
        fetchAgain={fetchAgain}
        setOpenModal={setOpenEditModal}
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
              <ModalLoader action="deleting" loadingOnModal={loadingOnModal} />
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
