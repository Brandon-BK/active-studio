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
  width: "100%",
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
  objectFit: "contain",
};
const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",

  border: "2px dashed green",
  width: "100%",
  aspectRatio: "16/9",
};

const absolute = {
  position: "absolute",
};

const CreateEpisodeCoverArt = (props) => {
  const imageRef = React.useRef({});
  const asideRef = React.useRef({});
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
  const [aspectRatio, setAspectRatio] = useState(0);
  function getAspectRatio(w, h) {
    return new Promise((resolve, reject) => {
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
      resolve(`${Ratio[0].toString()}:${Ratio[1].toString()}`);
      console.log("THE RATIO", `${Ratio[0].toString()}:${Ratio[1].toString()}`);
    });
  }

  // fetch()
  const handleCheck = (e) => {
    console.log(e.target.value);
  };
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

  // useEffect(() => {
  //   return () => {
  //     setAspectRatio(0);
  //     props.setFiles([]);
  //     props.ratioRef.current = 0;
  //   };
  // }, []);
  useEffect(() => {
    return () =>
      props.files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [props.files]);

  console.log("RATIO", aspectRatio);

  console.log("PROPS FOR IMAGE", imgDimensions);
  console.log('file',props.files)
  const[state,setState] = useState(true)
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg",
    onClick: (acceptedFiles) => {
      props.setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    // my drag and drop functionality
    onDrop: (acceptedFiles) => {
      props.setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      
          setState(!state)

      setTimeout(() => {
        console.log("NOW!!!");
        loadImage();
        
      }, 100);
    },
  });

  const thumbs = props.files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        {<img src={file.preview} ref={imageRef} style={img} />}
        {state}
      </div>
      {/* <div style={{margin:"10px 0"},absolute}>file name: {file.name} </div> */}
    </div>
  ));

  return (
    <section className="container" style={container}>
      <div
        {...getRootProps({ className: "dropzone" })}
        style={{ width: "100%" }}
      >
        <input
          {...getInputProps()}
          onChange={() => {
            handleCheck;
          }}
        />

        <div
          style={{
            aspectRatio: "16/9",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <aside ref={asideRef} style={thumbsContainer}>
            {thumbs}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CreateEpisodeCoverArt;
