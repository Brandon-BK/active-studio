import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import Box from "@mui/material/Box";
import { display } from "@mui/system";

const thumbsContainer = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "210px",
  border: "4px dotted gray",
  borderRadius: "10px",
  justifyContent: "center",
  alignItems: "center",
};

const thumb = {
  borderRadius: 2,
  width: "526px",
  height: "210px",
  boxSizing: "border-box",
  borderRadius: "10px",
};

const thumbInner = {
  display: "flex",
  width: "526px",
  height: "198px",
  display: "flex",
  borderRadius: "10px",
};

const img = {
  width: "526px",
  height: "210px",
  borderRadius: "10px",
};
const container = {
  backgroundImage: `url('https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-PNG-Photos.png')`,
  backgroundPosition: "center",
  backgroundSize: "70px 70px",
  backgroundRepeat: "no-repeat",
  
};

const absolute = {
  position: "absolute",
  background: "red",
};

function Previews(props) {
  console.log("uploaded", props.videoFiles[0]?.path);
  const handleCheck = (e) => {
    console.log(e.target.value);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/mp4",
    onClick: (acceptedFiles) => {
      props.handleSetVideoFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },

    // my drag and drop functionality
    onDrop: (acceptedFiles) => {
      console.log("dropped video file");
      props.handleSetVideoFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = props.videoFiles.map((file) => (
    <Box style={thumb} key={file.name}>
      <Box style={thumbInner}>
        <ReactPlayer
          playing
          height={200}
          width={526}
          url={props.videoFiles[0].preview}
          style={img}
          controls={true}
          ref = {props.videoRef}
        />
      </Box>
    </Box>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    return () =>
      props.videoFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [props.videoFiles]);

  return (
    <section className="container" style={container}>
      <Box {...getRootProps({ className: "dropzone" })}>
        <input
          {...getInputProps()}
          onChange={() => {
            handleCheck;
          }}
        />
        <Box
          style={{
            height: "230px",
            width: "100%",
            padding: "0 0 10px 0",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <aside style={thumbsContainer}>{thumbs}</aside>
        </Box>
      </Box>
    </section>
  );
}

export default Previews;
