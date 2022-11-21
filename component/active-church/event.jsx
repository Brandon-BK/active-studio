import React from 'react'
import {Box,Typography} from '@mui/material'
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import EventModal from './event-modal';

function Event(props) {

    const [open,setOpen] = React.useState(false)
    const handleOpen = ()=> setOpen(!open);

  return (
    <Box>
        <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: "absolute", bottom: "32px", right: "32px" }}
        icon={<SpeedDialIcon />}
        
        onClick={handleOpen}
        
        />
        <EventModal open = {open} setOpen={setOpen} eventTypes = {props.eventTypes}/>
        <Typography sx={style.title}>{props.title}</Typography>
        <Box sx={style.mainEvent}>
            <Box sx={style.mainImg}></Box>
            <Typography sx={style.ucText}>Upcoming Events</Typography>
            <Box sx={style.upcomingEventsBox}>
                <Box sx={style.ucEvent}>event 1</Box>
                <Box sx={style.ucEvent}>Event 2</Box>
                <Box sx={style.ucEvent}>Event 3</Box>
            </Box>
        </Box>
    </Box>
  )
}

const style = {
    title : {
        textAlign: 'center',
        fontSize : '24px',
        margin : '12px 0px'
    },
    mainEvent : {
        margin : '24px 0px',
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center'
    },
    mainImg : {
        background : 'red',
        height : '400px',
        width : '400px'
    },
    ucText : {
        margin : '24px 0px',
        fontSize : '28px'
    },
    upcomingEventsBox : {
        display : 'flex',
        width : '80%',
        justifyContent : 'space-around'
    },
    ucEvent : {
        width : '300px',
        height : '250px',
        background : 'blue'
    }
};
export default Event