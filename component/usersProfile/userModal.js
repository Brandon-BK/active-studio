import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Modal , Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import UsersProfile from "./UsersProfile"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#333333",
  border: "1px solid #665d5d",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const UserModal = ({user}) => {
  const [open, setOpen] = useState(false);
  const [points, setPoints] = useState(user.points);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  console.log(user)
  return (
    <div>
      <Box onClick={handleOpen} sx={{width:'200px', height: '250px'}}>
        <UsersProfile user={user} />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

        <Avatar sx={{ width:115 , height:115 }} src={user.imageProfile} alt={user.email} />
          <Typography
            style={{ color: "#ffffff", marginBottom:"8px", fontSize: '10px' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="active-tv-font"
          >
            {user.name || user.email}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ marginBottom:"16px", color: "#ffffff", fontSize: '10px' }}
            className="active-tv-font"
          >
            Last Paid 26 December 2009
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
            className="active-tv-font"
              sx={{
                color: "#ffffff",
                marginBottom:"4px",
                fontSize:'8px'
              }}
            >
              EMAIL:
            </Typography>
            <TextField
            value={user.email}
              sx={{ background: "white", width: "100%",marginBottom:"16px",color:"black" }}
              id="filled-basic"
            />
          </Box>

          <Box
            sx={{
              padding: "0px 0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
            className="active-tv-font"
              sx={{
                color: "#ffffff",
                marginBottom:"4px",
                fontSize:'8px'
              }}
            >
              Tier Access Type:
            </Typography>
            <TextField
              value={user.subscriptionType || "none"}
              sx={{ background: "white", width: "100%",marginBottom:"16px",color:"black" }}
              id="filled-basic"
            />
          </Box>

          <Box
            sx={{
              padding: "0px 0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
            className="active-tv-font"
              sx={{
                color: "#ffffff",
                marginBottom:"4px",
                fontSize: '8px'
              }}
            >
              Produce That Points:
            </Typography>
            <TextField
              onChange={()=>setPoints(0)}
              value={points}
              sx={{ background: "white", width: "100%",marginBottom:"16px",color:"black" }}
              id="filled-basic"
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              sx={{
                background: "#ff0000",
                color: "white",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              sx={{
                background: "#009900",
                color: "white",
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UserModal
