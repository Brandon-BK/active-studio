import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";

const thumbsContainer = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  marginTop: 5,
  width: "100%",
  height: "100%",
  border: "4px dotted green",
  justifyContent: "center",
  alignItems: "center",
  padding: "25%",
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

function Previews(props) {
  console.log('KRRRR',props.videoFiles[0].path)
  const handleCheck = (e) => {
    console.log(e.target.value);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/mp4",
    onClick: (acceptedFiles) =>
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),

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
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        {
          //   <img
          //   src={file.preview}
          //   style={img}
          //   />
          <ReactPlayer url={props.videoFiles[0]} style={img}  />
          
        }

        {}
        <video></video>
      </div>
      {/* <div style={{margin:"10px 0"},absolute}>file name: {file.name} </div> */}
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    props.videoFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [props.videoFiles]);

  return (
    <section className="container" style={container}>
      <div
        {...getRootProps({ className: "dropzone" })}
        style={{ display: "flex", flexDirection: "column",alignItems:'center' }}
      >
        <input
          {...getInputProps()}
          onChange={() => {
            handleCheck;
          }}
        />
        <p
          style={{
            fontSize: "12px",
            texttransform: "uppercase",
            textAlign: "center",
          }}
        >
          Drag 'n' drop the show cover image
        </p>
        <p
          style={{
            fontSize: "10px",
            texttransform: "uppercase",
            margin: "10px 0 5px 0",
            textAlign :'center'
          }}
        >
          Accepted files TYPES : video/mp4{" "}
        </p>
        <div style={{ height: "200px", width: "100%", padding: "0 0 10px 0" }}>
          <aside style={thumbsContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-cloud-arrow-up-fill"
              viewBox="0 0 16 16"
              style={{ color: "lightgrey" }}
            >
              <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z" />
            </svg>
            <p>
              Drag <span style={{ color: "red" }}>&</span> Drop / Choose File
            </p>
            {thumbs}
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Previews;
