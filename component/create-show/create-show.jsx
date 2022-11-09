import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  marginTop: 5,
  width: "100%",
  height: "100%",
  background: "#222",
};

const thumb = {
  borderRadius: 2,
  marginRight: 8,
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  width: "100%",
  height: "100%",
  // overflow: 'auto',
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
};
const container = {
  // overflow:"auto"
};

const absolute = {
  position: "absolute",
  background: "red",
};

function CreateShow(props) {
  // fetch()
  const handleCheck = (e) => {
    console.log(e.target.value);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg",
    onClick: (acceptedFiles) =>
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),

    // my drag and drop functionality
    onDrop: (acceptedFiles) => {
      props.handleSetFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = props.files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        {<img src={file.preview} style={img} />}
        {}
      </div>
      {/* <div style={{margin:"10px 0"},absolute}>file name: {file.name} </div> */}
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    props.files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [props.files]);

  return (
    <section className="container" style={container}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input
          {...getInputProps()}
          onChange={() => {
            handleCheck;
          }}
        />
        <p style={{ fontSize: "12px", textTransform: "uppercase" }}>
          Drag 'n' drop the show {props.media_type}
        </p>
        <p
          style={{
            fontSize: "10px",
            textTransform: "uppercase",
            margin: "10px 0 5px 0",
          }}
        >
          Accepted files TYPES : {props.accepted_type}
        </p>
        <div style={{ height: "250px", width: "100%", padding: "0 0 10px 0" }}>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </div>
      </div>
    </section>
  );
}

export default CreateShow;
