import {
  Box,
  Grid,
  Button,
  Avatar,
  Divider,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

import React from "react";
import axios from "axios";
import LaunchIcon from "@mui/icons-material/Launch";
import CreateShowModal from "../component/Popup/Modal";
import EpisodeModal from "../component/episodes/episodeModal";
import {withSnackbar} from 'notistack'

const Home = (props) => {
  
  const [shows, setShows] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [fetchAgain, setFetchAgain] = React.useState(false);
  //modal states
  const [modalOpen, setModalOpen] = React.useState(false);
  const [files,setFiles] = React.useState([])
  const [videoFiles,setVideoFiles] = React.useState([])
  const [episodes,setEpisodes] = React.useState([])
  const [loading, setLoading] = React.useState(true);

  const [loadingOnModal, setLoadingOnModal] = React.useState(false);

  
  let monthlySubscribers = 0;

  users.map((user) => {
    if (user.subscriptionType === "Monthly") {
      monthlySubscribers = monthlySubscribers + 1;
      return user;
    }
  });
  let yearlySubscribers = 0;
  users.map((user) => {
    if (user.subscriptionType === "Yearly") {
      yearlySubscribers = yearlySubscribers + 1;
      return user;
    }
  });
  let views = 0;
  shows.forEach((show) => {
    console.log(show.views);
    if (show.views === undefined || show.views === null) {
      return;
    } else {
      views = views + show.views;
      return views;
    }
  });

  console.log("views", views);
  

  React.useEffect(async () => {
    const response = await axios.get(
      "https://p6x7b95wcd.execute-api.us-east-2.amazonaws.com/Prod/get-users"
    );
    const results = response.data;
    console.log(results);
    setUsers(results.users);
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        padding: "5rem",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ height: "80vh", border: "5px solid #111" }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              padding: "21px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: "",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                padding: "21px",
                border: "1px dashed rgba(255,255,255,.3)",
              }}
            >
              <Box>
                <img
                  src="https://www.gstatic.com/youtube/img/creator/no_content_illustration_upload_video_v3_darkmode.svg"
                  alt=""
                />
              </Box>
              <Box>
                <Typography sx={{ margin: "12px 0" }}>
                  Want to see metrics on your recent video?
                </Typography>
                <Typography sx={{ margin: "12px 0" }}>
                  Upload and publish a video to get started.
                </Typography>
                <EpisodeModal 
                dashboard
                  open ={modalOpen}
                  setOpen={setModalOpen}
                  files={files}
                  setFiles = {setFiles}
                  videoFiles = {videoFiles}
                  setVideoFiles = {setVideoFiles}
                  episodes = {episodes}
                  sync = {false}
                  setSync = {()=>true}
                  enqueueSnackbar = {props.enqueueSnackbar}  
                />
                <Button
                onClick={()=>setModalOpen(true)}
                  sx={{
                    margin: "12px 0",
                    background: "#3ea6ff",
                    color: "#eee",
                    fontWeight: 600,
                    padding: "16px 0",
                    width: "100%",
                  }}
                >
                  Upload Video
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          lg={4}
          sx={{ height: "80vh", border: "5px solid #111" }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              padding: "21px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: "",
                flexDirection: "column",
                alignItems: "",
                justifyContent: "",
                width: "100%",
                height: "100%",
                padding: "21px",
                border: "",
              }}
            >
              <Typography
                sx={{ margin: "0", fontSize: "32px", fontWeight: 600 }}
              >
                {" "}
                Analytics{" "}
              </Typography>
              <Typography sx={{ margin: "12px 0", fontSize: "16px" }}>
                {" "}
                Current Subscribers{" "}
              </Typography>
              <Typography sx={{ margin: "12px 0", fontSize: "32px" }}>
                {" "}
                {users.length}
              </Typography>
              <Divider sx={{ marginBottom: "21px" }} />

              <Typography sx={{ margin: "12px 0", fontSize: "16px" }}>
                {" "}
                Monthly Subscribers{" "}
              </Typography>
              <Typography sx={{ margin: "12px 0", fontSize: "32px" }}>
                {" "}
                {monthlySubscribers}
              </Typography>
              <Divider sx={{ marginBottom: "21px" }} />

              <Typography sx={{ margin: "12px 0", fontSize: "16px" }}>
                {" "}
                Yearly Subscribers{" "}
              </Typography>
              <Typography sx={{ margin: "12px 0", fontSize: "32px" }}>
                {" "}
                {yearlySubscribers}
              </Typography>
              <Divider sx={{ marginBottom: "21px" }} />

              <Typography sx={{ margin: "12px 0", fontSize: "16px" }}>
                {" "}
                Total Views{" "}
              </Typography>
              <Typography sx={{ margin: "12px 0", fontSize: "32px" }}>
                {" "}
                {views}
              </Typography>
              <Divider sx={{ marginBottom: "21px" }} />

              <Button
                sx={{
                  margin: "12px 0",
                  background: "#3ea6ff",
                  color: "#eee",
                  fontWeight: 600,
                  padding: "16px 0",
                  width: "100%",
                }}
              >
                View Analytics
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          lg={4}
          sx={{ height: "80vh", border: "5px solid #111" }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              padding: "21px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: "",
                flexDirection: "column",
                alignItems: "",
                justifyContent: "",
                width: "100%",
                height: "100%",
                padding: "21px",
                border: "",
              }}
            >
              <Typography
                sx={{ margin: "0", fontSize: "32px", fontWeight: 600 }}
              >
                {" "}
                New Users{" "}
              </Typography>
              {users.map((user) => {
                return (
                  <Box
                    sx={{
                      borderBottom: "1px solid rgba(255,255,255,.4)",
                      display: "flex",
                      alignItems: "center",
                      padding: "0",
                      height: "80px",
                      background: "",
                      margin: "12px 0",
                    }}
                  >
                    <Avatar src={user.imageProfile} alt={user.email} />
                    <Typography
                      sx={{
                        fontSize: "21px",
                        textAlign: "center",
                        width: "100%",
                        fontWeight: 300,
                      }}
                    >
                      {" "}
                      {user.email}{" "}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>
      </Grid>

          </Box>
  );
};

export default withSnackbar(Home)
