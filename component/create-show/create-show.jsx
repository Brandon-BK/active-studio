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
  objectFit: "cotain",
  aspectRation: "16/9",
};
const container = {
  // overflow:"auto"
};

const absolute = {
  position: "absolute",
  background: "red",
};

function CreateShow(props) {

  const imageRef = React.useRef({});
  
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
  const [aspectRatio, setAspectRatio] = useState(0);

  const handleCheck = (e) => {
    console.log(e.target.value);
  };

  

  function getAspectRatio(w, h) {
    let u = w;
    let v = h;
    function gcd(u, v) {
      if (u === v) return u;
      if (u === 0) return v;
      if (v === 0) return u;

      if (~u & 1)
        if (v & 1) return gcd(u >> 1, v);
        else return gcd(u >> 1, v >> 1) << 1;

      if (~v & 1) return gcd(u, v >> 1);

      if (u > v) return gcd((u - v) >> 1, v);

      return gcd((v - u) >> 1, u);
    }

    /* returns an array with the ratio */
    function ratio(w, h) {
      var d = gcd(w, h);
      return [w / d, h / d];
    }
    let Ratio = ratio(w, h);
    let res = `${Ratio[0].toString()}:${Ratio[1].toString()}`;
    console.log("THE RATIO", res);
    return res;
  }
  const loadImage = async () => {
    // Make sure to revoke the data uris to avoid memory leaks
    const image = new Image();
    image.src = imageRef.current.src;
    // if (!props.files.length) {
    //   console.log("no file yet", props.files.length);
    //   console.log('w',image.width)
    //   return;
    // }
    console.log("IMAGE", imageRef.current.aspectRatio);

    image.onload = async () => {
      setImgDimensions({ width: image.width, height: image.height });
      const Ratio = await getAspectRatio(image.width, image.height);

      props.ratioRef.current = Ratio;
      setAspectRatio(Ratio);
      console.log("r2", Ratio);
      props.determineRatio(Ratio);
    };
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
      loadImage()
    },
  });
  const thumbs = props.files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        {<img ref={imageRef} src={file.preview} style={img} />}
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
        <p
          style={{
            fontSize: "12px",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
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
        <div
          style={{
            height: "250px",
            width: "100%",
            padding: "0 0 10px 0",
            borderRadius: "50px",
          }}
        >
          <aside style={thumbsContainer}>{thumbs}</aside>
        </div>
      </div>
    </section>
  );
}

export default CreateShow;
