import * as React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  SpeedDial,
} from "@mui/material";
import { withSnackbar } from "notistack";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import UploadIcon from "@mui/icons-material/Upload";
import { ProduceThatItem } from "../component/produce-that/produceThatItem";
import { EditProduceThatModal } from "../component/produce-that/editProduceThatModal";
import { API_INSTANCE } from "../app-config";
import ProduceThatShowModal from "../component/produce-that/produce-that-show-modal";
import ProduceThatTrailerModal from "../component/produce-that/produce-that-trailer-modal";

const ProduceThat = (props) => {
  const [shows, setShows] = React.useState([]);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openEditShow, setOpenEditShow] = React.useState({});
  const [openTrailerModal,setOpenTrailerModal] = React.useState(false)

  const [searchTerm, setSearchTerm] = React.useState("");
  const [sync, setSync] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    async function getData() {
      const response = await axios.get(API_INSTANCE + "/get-pt-shows");
      const results = response.data.produceThatShows
        ? response.data.produceThatShows
        : response.data.shows;
      setShows(results);
    }
    getData();
  }, [sync]);

  const progresses = [90, 32, 45, 87, 21, 98, 45, 22];

  let searchResults = [];

  const handleOpen = () => {
    setOpenDrawer(true);
  };
  shows?.map((item) => {
    if (item.Title.toLowerCase().includes(searchTerm.toLowerCase())) {
      searchResults.push(item);
    }
  });

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        overflowY: "flow",
        padding: "2.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          padding: "12px",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#121212",
        }}
      >
        <Grid container>
          <Grid item xs={7}>
            <Typography sx={{ fontSize: "54px", fontWeight: 600 }}>
              {" "}
              PRODUCE THAT !!!
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ padding: "21px 0" }}>
            <Box sx={{ display: "flex", width: "100%" }}>
              <TextField
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                label="Search for your show here...."
                sx={{ width: "100%" }}
              />
              <Button sx={{ background: "#eee" }}>
                <SearchIcon sx={{ color: "#111" }} />
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              height: "100%",
              background: "",
              display: "flex",
              alignItems: "center",
              padding: "21px 0",
            }}
          >
            <Button
              onClick={() => setOpenDrawer(true)}
              sx={{ background: "#eee", height: "58px", margin: "auto" }}
            >
              <UploadIcon sx={{ color: "#111" }} />
            </Button>
          </Grid>
        </Grid>
      </Box>

      {searchTerm.trim() === "" ? (
        <Box>
          {shows.map((item, index) => {
            return (
              <>
                <ProduceThatItem
                  setOpenEditShow={setOpenEditShow}
                  setOpenEdit={setOpenEdit}
                  openEdit={openEdit}
                  setOpen={setOpenTrailerModal}
                  key={item.Title}
                  show={item}
                  progress={progresses[index]}
                />
                <ProduceThatTrailerModal
                  open={openTrailerModal}
                  setOpen={setOpenTrailerModal}
                  sync={sync}
                  setSync={setSync}
                  show = {item}
                  enqueueSnackbar = {props.enqueueSnackbar}
                />
              </>
            );
          })}
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          {searchResults.map((item, index) => {
            return (
              <ProduceThatItem
                setOpenEditShow={setOpenEditShow}
                setOpenEdit={setOpenEdit}
                openEdit={openEdit}
                setOpenDrawer={setOpenDrawer}
                key={item.Title}
                show={item}
                progress={item.targetPoints}
              />
            );
          })}
        </Box>
      )}

      <ProduceThatShowModal
        modalOpen={openDrawer}
        setModalOpen={setOpenDrawer}
        loadingOnModal={loading}
        setLoadingOnModal={setLoading}
        enqueueSnackbar={props.enqueueSnackbar}
        sync={sync}
        setSync={setSync}
      />

      <EditProduceThatModal
        show={openEditShow}
        actions={{ openEdit, setOpenEdit }}
      />
    </Box>
  );
};

export default withSnackbar(ProduceThat);
