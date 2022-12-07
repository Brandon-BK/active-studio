import * as React from "react";

import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import ShareIcon from "@mui/icons-material/Share";
import { AppConfigContext } from "../context/AppConfigContext";

import { Backdrop, Box, Typography, Fade } from "@mui/material";
import { ModalLoader } from "../loader";
import { Edit } from "@mui/icons-material";
import ShareComponent from "../shows-utils/ShareComponent";
import EditShowModal from "../shows-utils/EditShow";
import { API_INSTANCE } from "../../app-config/index.";
// import { ModalLoader } from "../loader";
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

export default function BannerOptions({
  imgUrl,
  title,
  img,
  loadingOnModal,
  setLoadingOnModal,
  setBannerSync,
  bannerSync,
  apiPath,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [shareLink, setShareLink] = React.useState("");

  const generateShareLink = () => {
    const newLink =
      "https://www.activetvonline.co.za/shows/" + title.replace(/ /g, "-");
    setShareLink(newLink);
    console.log(shareLink);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
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
    const endpoint = API_INSTANCE + apiPath;
    try {
      const response = await axios(endpoint, {
        method: "DELETE",
        data: JSON.stringify({ key: imgUrl }),
      });
      console.log("banner delete response", response);
      setBannerSync(!bannerSync);
      setLoadingOnModal(false);
      setOpenModal(false);
    } catch (err) {
      setLoadingOnModal(false);
      console.log("banner error", err);
    }
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
          sx={{ display: "flex", alignItems: "center", padding: "0" }}
        >
          <ShareComponent shareLink={shareLink} img={img} />
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <div style={{ width: "100%" }}>
            <Button sx={{ color: "#eee" }}>
              <DeleteIcon sx={{ color: "#eee", marginRight: "4px" }} />
              Delete
            </Button>
          </div>
        </MenuItem>
      </Menu>

      {/* DELETE CONFIRMATION PROMPT */}

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

export const ProfilePictureOptions = ({
  show,
  title,
  img,
  fetchAgain,
  setFetchAgain,
  loadingOnModal,
  setLoadingOnModal,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);

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

  //DELETE FUNCTION
  const handleDeleteClick = async () => {
    setLoadingOnModal(true);
    const showTitle = title.replace(/ /g, "-");
    //const deleteEndpoint = `http://127.0.0.1:3000/delete-show/${showTitle}`

    //const deleteEndpoint = `${API_INSTANCE}/delete-show/${showTitle}`;
    const deleteEndpoint = `https://nahgp463k7.execute-api.us-east-2.amazonaws.com/Prod/delete-show/${showTitle}`;

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
    } catch (error) {
      console.log("endpoint :", deleteEndpoint);

      console.log("DELETE ERROR:", error);
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
        <MenuItem
          onClick={handleDelete}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <div style={{ width: "100%" }}>
            <Button sx={{ color: "#eee" }}>
              <DeleteIcon sx={{ color: "#eee", marginRight: "4px" }} />
              Delete
            </Button>
          </div>
        </MenuItem>
      </Menu>

      {/* DELETE CONFIRMATION PROMPT */}
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
};
