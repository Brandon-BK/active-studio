import React, { useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ShareIcon from "@mui/icons-material/Share";
import { CopyAll } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShareComponent({ shareLink , img, open , setOpen }) {
  
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied!");
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(shareLink);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      
      <Dialog
        sx={{ width: "100%" }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Share with friends"}</DialogTitle>
        <DialogContent sx={{ width: "500px" }}>
          <DialogContentText id="alert-dialog-slide-description">
            {/* {shareLink} */}
            {/* <Box sx={{ backgroundImage:`url(${img})` , height:'250px' , width:'250px' }} /> */}
          </DialogContentText>
          <Box sx={{ width: "100%" }}>
            <input
              style={{ padding: "16px 12px", width: "85%", fontSize: "14px" }}
              disabled
              ref={textAreaRef}
              value={shareLink}
              />
            <Button onClick={copyToClipboard}>
              <CopyAll sx={{ color: "#eee" }} />
            </Button>
              {
                /* Logical shortcut for only displaying the 
              button if the copy command exists */
                document.queryCommandSupported("copy") && (
                  <div>
                    {copySuccess}
                  </div>
                )
              }
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
