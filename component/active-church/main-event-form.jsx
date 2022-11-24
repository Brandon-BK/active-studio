import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import { API_INSTANCE } from "../../app-config/index.";
import axios from "axios";

function MainEventForm({ eventTypes, setOpen,index,sync,setSync }) {
  const [eventType, setEventType] = React.useState(eventTypes[index]?.eventType);
  const fileInputRef = React.useRef();
  const imageRef = React.useRef();
  const [imgSrc, setImgSrc] = useState("https://img.youtube.com/vi/S/maxresdefault.jpg");
  const [imageFile, setImageFile] = useState([]);
  const types = [
    { eventType: "Sunday Service" },
    { eventType: "Active Youth" },
    { eventType: "Children's Church" },
  ];
  const eventData = React.useRef({
    Title: "",
    type: eventType,
    startTime: "",
    endTime: "",
    isUpcoming: true,
    thumbnail : imgSrc
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

  const handleLink = (e)=>{
    let link = e.target.value.split(/[=&]/)
    if (link.length == 0 ) return
    let img = `https://img.youtube.com/vi/${link[1]}/maxresdefault.jpg`
    setImgSrc(img)
    console.log(img)
    eventData.current = { ...eventData.current, thumbnail : img };
  }
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
  const postEvent = async (e) => {
    const data = eventData.current;
    console.log({data})
    
    
    e.preventDefault()
    // return
    try {
      const response = await axios({
        url: API_INSTANCE + "/post-event",
        method: "POST",
        data: JSON.stringify(eventData.current),
      });
      console.log(response.data);
      // await axios.put(response.data.thumbnailSignedUrl, imageFile[0], {
      //   "Content-Type": "image/jpeg",
      // });
      console.log("successfully posted event");
      setSync(!sync)
      setOpen(false)
    } catch (err) {
      console.log(err);
      setOpen(false)
    }
    console.log({ eventData });
  };
  // console.log({fileInputRef})
  return (
    <form style={style.container} onSubmit={postEvent}>
      <Box sx={style.uploadBox}>
        
          <Box sx={style.upload}>
          <Image loader = {()=>imgSrc}height={280} width={340} alt="image" src={imgSrc} />
          <input
              style={style.linkInput}
              type="text"
              // onChange={}
              onChange = {handleLink}
              ref={fileInputRef}
              required
              placeholder="PASTE URL : "
            />
            <Typography>Paste the YouTube link of your video to upload its thumbnail</Typography>
          </Box>
         
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
            required
          >
            {types.map((item, index) => {
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
            onChange={(e) =>
              (eventData.current.Title = e.target.value.replace(/ /g, "-"))
            }
            placeholder="enter title"
            required
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
            required
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
            required
          />
        </Box>
        
          <label style={style.insert}>
            <input
              type="radio"
              name="eventTime"
              onChange={(e) => eventData.current = { ...eventData.current, isUpcoming:false }}
              style={{marginRight:'4px'}}
              required
            />
            <Typography sx={style.insText}>Main Event</Typography>
          </label>
        
        
          <label style={style.insert}>
            <input
              type="radio"
              name="eventTime"
              onChange={(e) => eventData.current = { ...eventData.current, isUpcoming : true}}
              style={{marginRight:'4px'}}
            />
            <Typography sx={style.insText}>Upcoming Event</Typography>
          </label>
        
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
          type = 'submit'
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
    
  },
  linkInput: {
    padding: "8px",
    background : '#777',
    margin : '24px 0px',
    borderRadius : '5px',
    border : '2px solid #333',
    width : '100%',
    height : '50px'
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
