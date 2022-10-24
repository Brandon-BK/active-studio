import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexWrap: "wrap",
  marginTop: 5,
  width: "100%",
  height: "100%",
  background: "#222",
  
};

const thumb = {
  borderRadius: 2,
  width : '100%',
  height: "100%",
};

const thumbInner = {
  width: "100%",
  height: "100%",
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit : 'cover'
};
const container = {
  display : 'flex',
  justifyContent : 'center',
  alignItems : 'center',
  marginBottom:'20px',
  height : '200px'
};

const absolute = {
  position: "absolute",
  
};

const CreateEpisodeCoverArt = (props)=> {
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
      <div {...getRootProps({ className: "dropzone" }) } style={{width:'32%'}}>
        <input
          {...getInputProps()}
          onChange={() => {
            handleCheck;
          }}
        />
        {/* <p style={{ fontSize: "12px", texttransform: "uppercase" }}>
          Drag 'n' drop the show cover image
        </p>
        <p
          style={{
            fontSize: "10px",
            texttransform: "uppercase",
            margin: "10px 0 5px 0",
          }}
        >
          Accepted files TYPES : jpeg/jpg{" "}
        </p> */}
        <div style={{height:'200px', width: "100%",display:'flex',alignItems:'center'  }}>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </div>
      </div>
    </section>
  );
}

export default CreateEpisodeCoverArt;
