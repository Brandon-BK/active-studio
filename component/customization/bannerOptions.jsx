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

export default function ShowOptions({ bannerInfo }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [shareLink, setShareLink] = React.useState("");
  const { configuration  , setConfiguration} = React.useContext(AppConfigContext);

  const { banners } = configuration

  const generateShareLink = () => {
    const newLink = "https://www.activetvonline.co.za/shows/" + bannerInfo.title.replace(/ /g, "-")
    setShareLink(newLink)
    console.log(shareLink)
  }

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
  const handleDeleteClick = async (img) => {
    let tempBanners = banners.filter((item)=> {
      return item !== img
    })
    setConfiguration({...configuration , banners:tempBanners});
    
    // console.log(configuration);
    const postRes = await axios.post(`${API_INSTANCE}/post-config/12`);
    const putConfig = await axios.put(postRes.data.configJson , JSON.stringify(configuration))
    console.log(postRes)
    console.log(putConfig)
    setAnchorEl(false);
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
          sx={{ display: "flex", alignItems: "center" , padding:'0' }}
        >
          <ShareComponent shareLink={shareLink} img={bannerInfo.img} />
        </MenuItem>
        <MenuItem
          onClick={() => handleDeleteClick(bannerInfo.img)}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <div style={{ width:'100%' }}>
            <Button sx={{ color:"#eee" }}>
              <DeleteIcon sx={{ color:"#eee" , marginRight: "4px" }} />
              Delete
            </Button>
          </div>
        </MenuItem>
       
      </Menu>

      {/* DELETE CONFIRMATION PROMPT */}
      {/* <Modal
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
              <ModalLoader action="deleting" loadingOnModal={""} />
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
      </Modal> */}
    </div>
  );
}
