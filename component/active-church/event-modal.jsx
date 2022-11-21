import React from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import MainEventsForm from "./main-event-form";
import UcEventsForm from "./uc-events-form";

function EventModal({ open, setOpen,eventTypes }) {
  const [eventType, setEventType] = React.useState("Main Event");
  return (
    <Modal
      
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box sx={style.container}>
        {/* <Button onClick={() => setOpen(false)}>Close</Button> */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack>
            <Typography id="transition-modal-title" variant="h6" component="h4">
              {eventType == "Main Event" ? "Main Event" : "Upcoming Events"}{" "}
            </Typography>

            <Typography id="transition-modal-title" variant="p" component="p">
              {eventType == "Main Event"
                ? "Upload The content of the Main Event for the Active Church"
                : "Upcload upcoming events that will be occuring for the Active Church."}{" "}
            </Typography>
          </Stack>
          <Select
            // onChange={handleShowType}
            sx={{ padding: "0px 0", margin: 0 }}
            // variant
            value={eventType}
            ariaLabel="Event-Type"
            label="Event-Type"
            placeholder="Event-Type"
          >
            {["Main Event", "Upcoming Events"].map((item, index) => {
              return (
                <MenuItem
                  onClick={() => setEventType(item)}
                  key={index}
                  value={item}
                >
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <hr style={{ width: "100px", margin: "10px 0" }} />
        {eventType == "Main Event" ? <MainEventsForm  setOpen = {setOpen} eventTypes = {eventTypes} /> : <UcEventsForm />}
      </Box>
      
    </Modal>
  );
}
const style = {
  container: {
    position: "absolute",

    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // minHeight: showType === "Free Show" ? '350px' : '450px',
    height: "80%",
    bgcolor: "#111",
    border: "2px solid #111",
    padding: "20px 0",
    overflowY: "auto",
    width: "75%",
    boxShadow: 24,
    color: "white",
    p: 2,
  },
};
export default EventModal;
