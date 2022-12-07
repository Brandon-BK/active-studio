import React from "react";
import { Box, Typography } from "@mui/material";

import EventModal from "./event-modal";
import Image from "next/image";
function Event(props) {
  const  {open,handleOpen,setOpen} = props
  const EVENT  = props.EVENTS[0];
  const {UC_EVENTS} = props

  console.log('uc event',UC_EVENTS)
  return (
    <Box>

      <EventModal
        index={props.index}
        open={open}
        setOpen={setOpen}
        eventTypes={props.eventTypes}
        sync = {props.sync}
        setSync = {props.setSync}
        EVENT = {EVENT}
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
    overflowX : 'scroll'
  },
  ucEvent: {
    width: "300px",
    height: "250px",
    background: "blue",
  },
};
export default Event;
