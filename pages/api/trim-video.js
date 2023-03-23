const ffmpeg = require("fluent-ffmpeg");

const clipVideo = (videoFile) => {
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

export default async function trimVideohandler(req, res) {

    console.log("called")
  switch (req.method) {
    case "POST":
        const videoFile = req.body
        console.log(typeof videoFile,"=>",videoFile)
      try {
        const trimVideo = () => new Promise(async (resolve, reject) => {
            clipVideo(videoFile)
            resolve(()=>res.status(200).json({message:'success'}))
        });
        await trimVideo();
      } catch (err) {
        await err();
      }
      break;
    default:
      res.status(405).json({ message: `bad request (${req.method})` });
      break;
  }
}
