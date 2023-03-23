import React, { useEffect, useRef, useState } from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import ReactPlayer from "react-player";
import {createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";


function VideoSlider({ videoFiles, videoRef }) {
  const videoFile = videoFiles[0] ?? {};
  const [videoDuration, setVideoDuration] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [videoTrimmedUrl, setVideoTrimmedUrl] = useState("");
  
  const [gifUrl,setGifUrl] = useState("")
  
  let initialSliderValue = 0;
  let ffmpeg = createFFmpeg({log:true}); //Store the ffmpeg instance
  const loadFmmpeg = async ()=>{
    await ffmpeg.load()
    console.log("loaded?",ffmpeg.isLoaded())
    setIsScriptLoaded(true)
  }

  //Created to load script by passing the required script and append in head tag
  const loadScript = (src) => {
    
    return new Promise((onFulfilled, _) => {
      const script = document.createElement("script");
      let loaded;
      script.async = "async";
      script.defer = "defer";
      script.setAttribute("src", src);
      script.onreadystatechange = script.onload = () => {
        if (!loaded) {
          onFulfilled(script);
        }
        loaded = true;
      };
      script.onerror = function () {
        console.log("Script failed to load");
      };
      document.getElementsByTagName("head")[0].appendChild(script);
    });
  };

  //Convert the time obtained from the video to HH:MM:SS format
  const convertToHHMMSS = (val) => {
    const secNum = parseInt(val, 10);
    let hours = Math.floor(secNum / 3600);
    let minutes = Math.floor((secNum - hours * 3600) / 60);
    let seconds = secNum - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    let time;
    // only mm:ss
    if (hours === "00") {
      time = minutes + ":" + seconds;
    } else {
      time = hours + ":" + minutes + ":" + seconds;
    }
    return time;
  };

  useEffect(() => {
    //Load the ffmpeg script

    async function callFfmpeg() {
      try {
        await loadScript(
          "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.2/dist/ffmpeg.min.js"
        );
        if (typeof window !== "undefined") {
          // creates a ffmpeg instance.
          // ffmpeg = window.FFmpeg.createFFmpeg({ log: true });
          //Load ffmpeg.wasm-core script
          await ffmpeg.load();
          //Set true that the script is loaded
          setIsScriptLoaded(true);
        }
      } catch (err) {
        console.log("load err =>", err);
      } finally {
        await ffmpeg.load();
        setIsScriptLoaded(true);
      }
    }
    // callFfmpeg();
    console.log("loading ffmpeg...")
    loadFmmpeg()
    return () => {};
  }, []);

  //Get the duration of the video using videoRef
  useEffect(() => {
    console.log("videoref", videoRef);
    if (videoRef && videoRef.current && videoFiles.length) {
      const currentVideo = videoRef.current;

      console.log("called");
      setVideoDuration(videoRef.current.getDuration());
      setEndTime(videoRef.current.getDuration());
      console.log(
        "video duration",
        videoDuration,
        "=>",
        videoRef.current.getDuration()
      );
    }
  }, [videoFile.preview]);

  //Called when handle of the nouislider is being dragged
  const updateOnSliderChange = (values, handle) => {
    setVideoTrimmedUrl("");
    let readValue;
    if (handle) {
      readValue = values[handle] | 0;
      if (endTime !== readValue) {
        setEndTime(readValue);
      }
    } else {
      readValue = values[handle] | 0;
      if (initialSliderValue !== readValue) {
        initialSliderValue = readValue;
        if (videoRef && videoRef.current) {
          videoRef.current.currentTime = readValue;
          setStartTime(readValue);
        }
      }
    }
  };

  //Trim functionality of the video
  const handleTrim = async () => {
    console.log("attempting trim....");
    await ffmpeg.load()
    if (isScriptLoaded) {
      const { name, type } = videoFile;
      //Write video to memory
      ffmpeg.FS("writeFile", name, await `fetchFile`(videoFile));
      const videoFileType = type.split("/")[1];
      //Run the ffmpeg command to trim video
      await ffmpeg.run(
        "-i",
        name,
        "-ss",
        `${convertToHHMMSS(startTime)}`,
        "-to",
        `${convertToHHMMSS(endTime)}`,
        "-acodec",
        "copy",
        "-vcodec",
        "copy",
        `out.${videoFileType}`
      );
      //Convert data to url and store in videoTrimmedUrl state
      const data = ffmpeg.FS("readFile", `out.${videoFileType}`);
      const url = URL.createObjectURL(
        new Blob([data.buffer], { type: videoFile.type })
      );
      setVideoTrimmedUrl(url);
      console.log("VIDEO URL==>", videoTrimmedUrl);
    } else {
      console.log("script not loaded");
      console.log(ffmpeg.isLoaded())
    }
  };

  const convertToGif = async () => {
    const { name, type } = videoFile;
    await ffmpeg.run(
      "-i",
      name,
      "-s",
      "480x320",
      "-r",
      "3",
      "-t",
      endTime,
      "-ss",
      startTime,
      "-f",
      "gif",
      "output.gif"
    );
    const data = ffmpeg.FS("readFile", "output.gif");
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );
    setGifUrl(url)
  };
  console.log("GIF=>",gifUrl)
  return (
    <div style={{ width: "500px", position: "relative", zIndex: "200" }}>
      {videoFiles.length ? (
        <React.Fragment>
          {/* <video
            src={videoFile.preview}
            ref={videoRef}
            onTimeUpdate={handlePauseVideo}
          >
            <source src={videoFile.preview} type={videoFile.type} />
          </video>
          <br /> */}
          <Nouislider
            behaviour="tap-drag"
            step={1}
            margin={3}
            limit={5}
            range={{ min: 0, max: 5 }}
            start={[0,5]}
            connect
            onUpdate={updateOnSliderChange}
          />
          <br />
          Start duration: {convertToHHMMSS(startTime)} &nbsp; End duration:{" "}
          {convertToHHMMSS(endTime)}
          <br />
          
          <button onClick={handleTrim}>Trim</button>
          <br />
          {videoTrimmedUrl && (
            <>
              <ReactPlayer
                playing
                height={200}
                width={526}
                url={videoFile.preview}
                style={{
                  width: "526px",
                  height: "210px",
                  borderRadius: "10px",
                }}
                controls={true}
              />
              <button onCLick={convertToGif}>Convert</button>
            </>
          )}
        </React.Fragment>
      ) : (
        ""
      )}
    </div>
  );
}

export default VideoSlider;
