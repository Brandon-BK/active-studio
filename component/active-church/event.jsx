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
    <Typography variant = 'h2' sx={{textAlign : "center",color : '#ccc'}}>Main Event</Typography>

    <Box sx={{display:"flex",justifyContent:'center'}}>
    <hr style={{width:'30%'}}/>
    </Box>

    <Typography sx={style.title}>{props.title}</Typography>
    <Box sx={{...style.mainEvent,
    '&::before':{
      content:"''",position : 'absolute',
      top : '0px',left:'0px',background:`url(${EVENT.thumbnail})`,
      width : '100%',height:'100%',filter : 'blur(10px)'
    }
  }}
  >
  <Image
  width={400}
  height={400}
  src={EVENT?.thumbnail}
  loader = {()=>EVENT.thumbnail}
  sx={style.mainImg}
  alt = 'NO IMAGE'
  />
  </Box>

  <Typography sx={style.ucText}>Upcoming Events</Typography>
  <Box sx={style.upcomingEventsBox}>
  {
    props.UC_EVENTS.map((item)=>(

      <Box sx={style.ucEvent}>
      <Image 
      src = {item.thumbnail}
      loader = {()=>item.thumbnail}
      width = {300}
      height = {250}
      />
      </Box>

      ))
  }
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
    position : 'relative'
  },
  mainImg: {
    background: "red",
    height: "400px",
    width: "400px",
  },
  ucText: {
    margin: "24px 0px",
    fontSize: "28px",
    textAlign : 'center',
    fontWeight : '700'
  },
  upcomingEventsBox: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    overflowX : 'scroll',
    padding : '0px 40px'
  },
  ucEvent: {

    margin : '0px 12px',
  },
};
export default Event;
