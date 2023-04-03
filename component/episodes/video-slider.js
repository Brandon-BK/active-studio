import React, { useEffect, useRef, useState } from "react";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import ReactPlayer from "react-player";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

function VideoSlider({ videoFiles, videoRef, activeStep }) {
  const initalVidRef = useRef();
  const videoFile = videoFiles[0] ?? {};
  const [videoDuration,setVideoDuration] = useState(0)
  if (videoFiles.length.current){
    setVideoDuration(videoRef.current.getDuration()); 
  }
  const [endTime, setEndTime] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [videoTrimmedUrl, setVideoTrimmedUrl] = useState("");
  const [trimmedVideo, setTrimmedVideo] = useState([]);

  const [gifUrl, setGifUrl] = useState("");

  let initialSliderValue = 0;
  let ffmpeg = createFFmpeg({ log: true }); //Store the ffmpeg instance
  
  console.log(videoDuration);
  useEffect(() => {
    const loadFmmpeg = async () => {
      await ffmpeg.load();
      console.log("loaded?", ffmpeg.isLoaded());
      setIsScriptLoaded(true);
    };
    loadFmmpeg();
  }, [activeStep,videoFile]);

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

  const genRandomSection = () => {
    const videoDuration = videoRef.current.getDuration()
    console.log("videoDuration=>",videoDuration)
    if (videoDuration) {
      const end_time = Math.floor((Math.random() + 1) * (videoDuration / 2));
      const start_time = end_time - 5;

      return [start_time,end_time]
    }
  };

  //Trim functionality of the video
  const handleTrim = async () => {
    console.log("attempting trim....");
    
    if (ffmpeg.isLoaded()) {

      const { name, type } = videoFile;
      //Write video to memory
      ffmpeg.FS("writeFile", name, await fetchFile(videoFile));
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
      setTrimmedVideo(data[0]);
      const url = URL.createObjectURL(
        new Blob([data.buffer], { type: videoFile.type })
      );
      setVideoTrimmedUrl(url);
      console.log("VIDEO URL==>", videoTrimmedUrl);
    } else {
      console.log("script not loaded");
      console.log(ffmpeg.isLoaded());
      await ffmpeg.load();
    }
  };

  const convertToGif = async () => {
    const { name, type } = videoFile;
    if (!ffmpeg.isLoaded()){
      console.log("ffmpeg not loaded",ffmpeg.isLoaded())
      return
    }
    const [st,en] = genRandomSection();

    ffmpeg.FS("writeFile", name, await fetchFile(videoFile));
    console.log({ st, en});
    
    await ffmpeg.run(
      "-i",
      name,
      "-t",
      convertToHHMMSS(en),
      "-ss",
      convertToHHMMSS(st),
      "-f",
      "gif",
      "output.gif"
    );
    const gifData = ffmpeg.FS("readFile", "output.gif");
    console.log("gif data",gifData)
    const gifUrl = URL.createObjectURL(
      new Blob([gifData.buffer], { type: "image/gif" })
    );
    setGifUrl(gifUrl);
    console.log("GIF=>", gifUrl);
  };
  console.log("GIF=>", gifUrl);
  return (
    <div style={{ width: "500px", position: "relative", zIndex: "200" }}>
      {videoFiles.length ? (
        <React.Fragment>
          <br />
          Start duration: {convertToHHMMSS(startTime)} &nbsp; End duration:{" "}
          {convertToHHMMSS(endTime)}
          <br />
          <button onClick={convertToGif}>generate gif</button>
          <br />
          {gifUrl && (
            <>
            <img src={gifUrl}  height={200} width={526}/>
              {/* <ReactPlayer
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
              <button onClick={convertToGif}>Convert</button> */}
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
