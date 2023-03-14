import React, { useEffect } from "react";
import { Box, Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const userIcon = {
  width: 150,
  height: 150,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const img = {
  width: 150,
  height: 150,
  borderRadius: "50%",
  backgroundSize: "contain",
  backgroundPosition: "center",
};

const container = {
  height: "200px",
  flexDirection: "column",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  paddingBottom: "5px",
  opacity: "0.6",
  "&:hover": {
    transform: "scale(1.05)",
    transition: "0.2s",
    opacity: "0.9"
  },
};

const UsersProfile = ({ user }) => {
  return (
    <Box
      sx={{
        width: "180px",
        marginLeft: 2.5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 0,
          width: "100%",
        }}
      >
        <Box sx={container}>
          <Box sx={userIcon}>
            <Avatar
              sx={{ width: 115, height: 115 }}
              src={user.imageProfile}
              alt={user.email}
            />
          </Box>
          <Typography
            className="active-tv-font"
            sx={{ color: "white", fontSize: "7px" }}
          >
            {user.email}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UsersProfile;
