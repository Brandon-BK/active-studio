import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import {API_INSTANCE} from '../../app-config/index.'
import axios from 'axios'

function MainEventForm({ eventTypes, setOpen }) {
  const [eventType, setEventType] = React.useState(eventTypes[0]?.eventType);
  const fileInputRef = React.useRef();
  const imageRef = React.useRef();
  const [imgSrc, setImgSrc] = useState(".jpg");
  const [imageFile, setImageFile] = useState([]);
  const eventData = React.useRef({
    Title: "",
    type: "",
    startTime: "",
    endTime: "",
  });
  const handleFile = () => {
    const files = fileInputRef.current.files;
    setImageFile(files);
    if (files && files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImgSrc(e.target.result);
      };

      reader.readAsDataURL(files[0]);
    }
  };
  const handleSelect = (e) => {
    if (e.target.value === "") alert("");
    console.log(e.target.value);
    eventData.current = { ...eventData.current, type: e.target.value };
    console.log({ eventData });
  };

  function handleStartTime(e) {
    if (e.target.value) {
      eventData.current = { ...eventData.current, startTime: e.target.value };
      console.log({ eventData });
    }
  }
  function handleEndTime(e) {
    if (e.target.value) {
      eventData.current = { ...eventData.current, endTime: e.target.value };
    }
  }
  const postEvent = async () => {
    const data = eventData.current
    
    try{
      const response = await axios({
        url : API_INSTANCE + '/post-event',
        method : 'POST',
        data : JSON.stringify(eventData.current)
      })
      console.log(response.data)
      await axios.put(response.data.thumbnailSignedUrl,imageFile[0],{
        'Content-Type': 'image/jpeg'
      })
      console.log('successfully posted event')
    }catch(err){
      consol.log(err)
    }
    console.log({ eventData });
  };
  // console.log({fileInputRef})
  return (
    <form style={style.container}>
      <Box sx={style.uploadBox}>
        {imgSrc != ".jpg" ? (
          <Image height={280} width={300} alt="image" src={imgSrc} />
        ) : (
          <label style={style.upload}>
            <input
              style={style.fileInput}
              type="file"
              accept="image/jpeg"
              name="choose thumbnail"
              onChange={handleFile}
              ref={fileInputRef}
            />
            <CloudUploadIcon sx={{ fontSize: "28px" }} />
            <Typography>Select a thumbnail to upload</Typography>
            <Typography>accept : 'image/jpeg'</Typography>
          </label>
        )}
      </Box>
      <Box sx={style.form}>
        <Box sx={style.insert}>
          <Typography sx={style.insText}>Event Type : </Typography>
          <Select
            // onChange={handleShowType}
            sx={{ padding: "8px", margin: 0, height: "40px" }}
            // variant
            value={eventType}
            ariaLabel="Event-Type"
            label="Event-Type"
            placeholder="Event-Type"
            onChange={handleSelect}
          >
            {eventTypes.map((item, index) => {
              return (
                <MenuItem
                  onClick={() => setEventType(item.eventType)}
                  key={index}
                  value={item.eventType}
                >
                  {item.eventType}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <Box sx={style.insert}>
          <Typography sx={style.insText}>Event/Sermon Title : </Typography>
          <input
            style={style.input}
            onChange={(e) => (eventData.current.Title = e.target.value.replace(/ /g,'-'))}
            placeholder="enter title"
          />
        </Box>
        <Box sx={style.insert}>
          <Typography sx={style.insText}>
            Event/Sermon <b>Start</b> Time :{" "}
          </Typography>
          <input
            key={"1"}
            style={style.input}
            type="time"
            name="startTime"
            onChange={handleStartTime}
          />
        </Box>
        <Box sx={style.insert}>
          <Typography sx={style.insText}>
            Event/Sermon <b>End Time</b> :{" "}
          </Typography>
          <input
            key={"2"}
            style={style.input}
            type="time"
            name="endTime"
            onChange={handleEndTime}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", marginLeft: "80%" }}>
        <Button
          variant="outlined"
          color="error"
          sx={{
            "&:hover": {
              background: "red",
              color: "white",
            },
          }}
          onClick={() => setOpen(false)}
        >
          close
        </Button>
        <Button
          variant="outlined"
          color="success"
          sx={{
            marginLeft: "18px",
            "&:hover": {
              background: "green",
              color: "white",
            },
          }}
          onClick={postEvent}
        >
          confirm
        </Button>
      </Box>
    </form>
  );
}

const style = {
  container: {},
  uploadBox: {
    display: "flex",
    justifyContent: "center",
  },
  upload: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "280px",
    width: "40%",
    border: "2px dashed green",
    cursor: "pointer",
    textAlign: "center",
  },
  fileInput: {
    padding: "30px",
    display: "none",
  },
  insert: {
    display: "flex",
    alignItems: "center",
    margin: "24px 0px",
  },
  input: {
    background: "#333",
    height: "40px",
    padding: "8px",
  },
  form: {
    width: "50%",
  },
  insText: {
    width: "50%",
  },
};
export default MainEventForm;
