import { Box, useMediaQuery } from "@mui/material";
import WideScreenNav from "./WideScreenNav";

export default function Nav() {
  return (
    <Box
      sx={{
        height: "60px",
        width: "100%",
        background: "midnightblue",
        display: "flex",
        position:'fixed',
        top:0,
        left:0,
        right:0,
        zIndex:100
      }}
    >
       <WideScreenNav />
    </Box>
  );
}

