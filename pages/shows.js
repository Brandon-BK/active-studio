import Box from "@mui/material/Box";
import withAdminNav from "./hoc/withAdminNav";
import TransitionsModal from "../component/Popup/Modal";
import ShowContainer from "../component/shows-utils/ShowContainer";
import { useEffect, useState } from "react";
import GuideBar from "../component/shows-utils/GuideBar";
import { IconButton, Button, Grid, Typography } from "@mui/material";

import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import { API_INSTANCE } from "../app-config/index.";
import axios from "axios";
import CreateShowModal from "../component/Popup/Modal";
import { Loader } from "../component/loader/index";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import Iframe from "../component/shows-utils/Iframe";
import IframeContainer from "../component/shows-utils/iframeContainer";

const Shows = () => {
  const [filterTerm, setFilterTerm] = useState("");
  const [shows, setShows] = useState([]);
  const [freeShows, setFreeShows] = useState([]);
  const [selectedShowType, setSelectedShowType] = useState(
    "Active Tv Originals"
  );

  const [filterTime, setFilterTime] = useState(false);

  const [fetchAgain, setFetchAgain] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [errorLogs, setErrorLogs] = useState(null);
  const [loadingOnModal, setLoadingOnModal] = useState(false);

  const sortedByTitleShows = shows.sort((a, b) =>
    a.Title.localeCompare(b.Title)
  );
  const sortByTime = shows.sort((x, y) => {
    const first = new Date(x.timestamp);
    const second = new Date(y.timestamp);
    return first - second;
    // return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
  });

  const endpoint = `https://p6x7b95wcd.execute-api.us-east-2.amazonaws.com/Prod/get-shows`;
  const getData = async () => {
    try {
      setLoading(true);
      console.log("fetching data....");
      const res = await axios.get(`${API_INSTANCE}/get-shows`);
      const freeShowsResponse = await axios.get(
        `${API_INSTANCE}/get-free-shows`
      );
      console.log("Fetched sucessfully fetched!!!!!");
      setLoading(false);
      setShows(res.data);
      setFreeShows(freeShowsResponse.data);
    } catch (err) {
      console.log(err);
      setLoading(true);
      setErrorLogs(err.message);
    }
  };

  const handleTimeFilterClick = () => {
    setFilterTime(true);
  };

  useEffect(() => {
    getData();
    console.log("boom")
  }, [fetchAgain]);

  console.log(shows.sort((a, b) => a.Title.localeCompare(b.Title)));
  console.log(sortByTime);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 58px)",
        width: "100%",
        background: "#111",
      }}
    >
      <Box sx={{ display:'flex' , justifyContent:'center' }}>
        <Button
          onClick={(e) => setSelectedShowType("Active TV Originals")}
          sx={{
            margin:'4px 8px',
            borderBottom:selectedShowType !== "Free Shows" ? "2px solid yellow" : "2px solid transparent", 
            padding: "16px",
            color: "#eee",
          }}
        >
          Active Tv Originals
        </Button>
        <Button
          onClick={(e) => setSelectedShowType("Free Shows")}
          sx={{
            margin:'4px 8px',
            borderBottom:selectedShowType === "Free Shows" ? "2px solid yellow" : "2px solid transparent", 
            padding: "16px",
            color: "#eee",
          }}
        >
          Free Shows
        </Button>
      </Box>
      <Box sx={styles.inputContainer}>
        <Box
          sx={{
            width: "150px",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleTimeFilterClick}>
            <FilterListIcon
              sx={{ color: "#999", transformBox: "rotateY(360deg)" }}
            />
          </IconButton>
          <IconButton
            onClick={handleTimeFilterClick}
            sx={{ padding: "12px 12px" }}
          >
            <Typography
              color="#999"
              variant="h6"
              sx={{ fontSize: "12px", fontWeight: 600 }}
            >
              A - Z
            </Typography>
          </IconButton>
        </Box>
        <input
          placeholder="filter..."
          style={{
            color: "#fff",
            padding: "16px",
            margin: "10px ",
            width: "70%",
            background: "transparent",
          }}
          onChange={(e) => setFilterTerm(e.target.value)}
        />
      </Box>

      <CreateShowModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        loading={loading}
        loadingOnModal={loadingOnModal}
        setLoadingOnModal={setLoadingOnModal}
      />

      <GuideBar />
      {/* <Loader loading={loading} /> */}
      <Typography variant="h5" sx={{ padding: "0 16px ", margin: "12px 0" }}>
        {selectedShowType}
      </Typography>
      {loading ? (
        <Box
          sx={{
            minHeight: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {errorLogs ? (
            <Box>
              <img
                src={"network-error.png"}
                style={{ width: 200, height: 200 }}
              />
              <Typography
                variant="h3"
                fontSize={18}
                color={"red"}
                align="center"
              >
                {errorLogs}
              </Typography>
            </Box>
          ) : (
            <Loader />
          )}
        </Box>
      ) : selectedShowType === "Free Shows" ? (
        <div style={{ padding: "16px" }}>
          <Grid container>
            {freeShows.map((item, index) => {
              const newIframe = item.EmbedCode;
              const replacedHeight = newIframe.replace("560", "100%");
              const replacedWidth = replacedHeight.replace("315", "100%");
              return (
                
                <IframeContainer
                key={index}
                embedCode={replacedWidth}
                show={item}
                likes={100}
                title={item.Title.replace(/-/g, " ")}
                lastUpdated={"Yesterday"}
                description={"THis is an iframe embeded from another platform."}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                loading={loading}
                setLoading={setLoading}
                loadingOnModal={loadingOnModal}
                setLoadingOnModal={setLoadingOnModal}
              />
    
              );
            })}
          </Grid>
        </div>
      ) : (
        shows.map((item, index) => {
          const episodes = item.episodes ? item.episodes : [];
          if (
            item.Title.toLocaleLowerCase()
              .toLocaleUpperCase()
              .includes(filterTerm.toLocaleLowerCase().toLocaleUpperCase())
          ) {
            return (
              <ShowContainer
                key={index}
                show={item}
                likes={item.likes}
                title={item.Title.replace(/-/g, " ")}
                count={episodes.length}
                link={item.id}
                img={item.CoverArtLarge}
                lastUpdated={item.timestamp}
                description={item.description}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                loading={loading}
                setLoading={setLoading}
                loadingOnModal={loadingOnModal}
                setLoadingOnModal={setLoadingOnModal}
              />
            );
          }
        })
      )}

      <CreateShowModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        loading={loading}
        loadingOnModal={loadingOnModal}
        setLoadingOnModal={setLoadingOnModal}
      />
    </Box>
  );
};

export default withAdminNav(Shows);

const styles = {
  inputContainer: {
    width: "100%",
    height: "auto",
    display: "flex",
    borderTop: "1px solid #222",
    padding: "0 15px",
  },
};
