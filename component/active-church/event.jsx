import React from "react";
import { Box, Typography } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import EventModal from "./event-modal";
import Image from "next/image";
function Event(props) {
  const EVENT  = props.EVENTS[0];
  const {UC_EVENTS} = props
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  console.log('uc event',UC_EVENTS)
  return (
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: "absolute", bottom: "32px", right: "32px" }}
        icon={<SpeedDialIcon />}
        onClick={handleOpen}
      />
      <EventModal
        index={props.index}
        open={open}
        setOpen={setOpen}
        eventTypes={props.eventTypes}
        sync = {props.sync}
        setSync = {props.setSync}
      />
      <Typography sx={style.title}>{props.title}</Typography>
      <Box sx={style.mainEvent}>
        <Image
          width={400}
          height={400}
          src={EVENT?.thumbnail}
          loader = {()=>EVENT.thumbnail}
          sx={style.mainImg}
          alt = 'NO IMAGE'
        ></Image>
        <Typography sx={style.ucText}>Upcoming Events</Typography>
        <Box sx={style.upcomingEventsBox}>
          {
            props.UC_EVENTS.map((item)=>(
              <Image 
                src = {item.thumbnail}
                loader = {()=>item.thumbnail}
                sx={style.ucEvent}
                width = {300}
                height = {250}
              />
              
            ))
          }
        </Box>
      </Box>
    </Box>
  );
}

const style = {
  title: {
    textAlign: "center",
    fontSize: "24px",
    margin: "12px 0px",
  },
  mainEvent: {
    margin: "24px 0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mainImg: {
    background: "red",
    height: "400px",
    width: "400px",
  },
  ucText: {
    margin: "24px 0px",
    fontSize: "28px",
  },
  upcomingEventsBox: {
    display: "flex",
    width: "80%",
    justifyContent: "space-around",
  },
  ucEvent: {
    width: "300px",
    height: "250px",
    background: "blue",
  },
};
export default Event;
