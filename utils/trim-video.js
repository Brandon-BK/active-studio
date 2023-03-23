const ffmpeg =require("fluent-ffmpeg")

const trimVideo = (videoFile) => {
  ffmpeg.ffprobe(videoFile, (err, metaData) => {
    const duration = metaData.format;
    const startTime = parseInt(duration / 2);
    const clipDuration = 5;

    ffmpeg()
      .input(videoFile)
      .inputOptions([`_ss ${startTime}`])
      .outputOptions([`-t ${clipDuration}`])
      .noAudio()
      .output(`./${videoFile.name}.mp4`)
      .on("end", () => console.log("done..."))
      .on("error", (err) => console.log(err))
      .run();
  });
};
trimVideo("./call cycles.com sprint 1_ detail 2.mp4")