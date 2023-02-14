import * as React from "react";
import {
  Box,
  Avatar,
  Grid,
  Drawer,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";

export const ProduceThatItem = (props) => {
  const trailers = props.show.trailers ? props.show.trailers : [];
  const progressColor =
    props.progress < 40
      ? "rgba(200,0,0,.7)"
      : props.progress > 40 && props.progress < 80
      ? "orange"
      : "rgba(0,0,200,.7)";

  return (
    <Accordion
      sx={{
        margin: "2px 0",
        padding: "12px 0",
        background: "#121212",
        opacity: 0.65,
        "&:hover": { opacity: 1 },
        width: "100%",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Avatar
          src={props.show.CoverArtLarge}
          alt={props.show.Title}
          sx={{ width: "70px", height: "70px" }}
        />

        <Grid container>
          <Grid
            item
            sx={{
              background: "",
              padding: "0 12px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "",
            }}
            xs={6}
          >
            <Typography variant="h3" sx={{ fontSize: "21px", fontWeight: 600 }}>
              {props.show.Title.replace("-", " ")}
            </Typography>
            <Typography
              noWrap={true}
              variant="h3"
              sx={{ fontSize: "16px", margin: "6px 0" }}
            >
              {props.show.description}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              background: "",
              padding: "0 12px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "",
            }}
            xs={5}
          >
            <Box sx={{ width: "100%", background: "grey" }}>
              <Box
                sx={{
                  height: "32px",
                  width: `${props.progress}%`,
                  background: progressColor,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {props.progress}%
              </Box>
            </Box>
            <Typography
              noWrap={true}
              variant="h3"
              sx={{ fontSize: "12px", textAlign: "right", margin: "6px 0" }}
            >
              {Number((props.progress / 100) * 10000)}/{props.progress}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              background: "",
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            xs={0.5}
          >
            <Button
              onClick={() => {
                props.setOpenEdit(true);
                props.setOpenEditShow(props.show);
              }}
            >
              <EditIcon />
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              background: "",
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            xs={0.5}
          >
            <Button>
              <DeleteIcon sx={{ color: "#eee" }} />
            </Button>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{}}>
        <Box
          sx={{
            overflowX: "auto",
            overflowY: "hidden",
            background: "",
            display: "flex",
            width: "100%",
          }}
        >
          <Box
            onClick={() => props.setOpen(true)}
            sx={{
              height: "300px",
              width: "400px",
              border: "3px solid #121212",
            }}
          >
            <Paper
              sx={{
                display: "flex",
                background: "transparent",
                cursor: "pointer",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                padding: "21px",
                scale: "0.8",
                transition: "800ms",
                "&:hover": { scale: "1" },
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
                  <Typography sx={{ margin: "12px 0", fontWeight: 600 }}>
                    Select a video to get started.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>

          {trailers.map((item) => (
            <Box
              key={item.Title}
              sx={{
                height: "300px",
                width: "400px",
                border: "3px solid #121212",
              }}
            >
              <Typography sx={{ margin: "12px 0", fontWeight: 600 }}>
                {item?.trailerName}
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "200px",
                  background: `url(${item.CoverArtLarge})`,
                  backgroundSize: "cover",
                }}
              />
              <Box
                sx={{
                  width: "150px",
                  height: "50px",
                  margin: "0 auto",
                  background: "",
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DeleteIcon
                    title="Delete"
                    sx={{ color: "#eee", cursor: "pointer" }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
