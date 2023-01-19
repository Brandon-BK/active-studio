import React from "react";
import {
  Typography,
  Modal,
  Box,
  Paper,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

function InfoModal({ EVENT, open, setOpen }) {
  return (
    <Modal open={open} onClose={() => setOpen(false)} sx={style.container}>
      <Card sx={style.card}>
        <CardMedia sx={{ height: 220 }} image={EVENT.thumbnail} title="title" />
        <CardContent>
          <Typography
            
            component="div"
            noWrap={true}
            align="center"
            sx={style.headerText}
          >
            {EVENT.Title.replace(/-/g,' ')}
          </Typography>
          <Box sx={{width : '100%',height:'2px',background: 'white',marginBottom:'14px'}} />
          <Box sx={{ padding: "0px 12px" }}>
            <Box sx={{ display: "flex", justifyContent:'center' }}>
              <Typography
                variant="b"
                sx={{
                  fontWeight: "700",
                  fontSize: "24px",
                  marginBottom: "8px",
                }}
              >
                Start Time :{" "}
              </Typography>
              <Typography sx={{ fontSize: "24px" }}>
                {" "}
                {" " + EVENT.startTime}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent:'center' }}>
              <Typography
                variant="b"
                sx={{
                  fontWeight: "700",
                  fontSize: "24px",
                  marginBottom: "8px",
                }}
              >
                End Time :{" "}
              </Typography>
              <Typography sx={{ fontSize: "24px" }}>
                {" "}
                {" " + EVENT.endTime}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Modal>
  );
}
const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "450px",
    height: "450px",
    borderRadius  :'20px',
    border : '1px solid none black'
  },
  headerText: {
    fontSize: "28px",
    fontWeight: "700",
    padding: "12px 14px",
  },
};
export default InfoModal;
