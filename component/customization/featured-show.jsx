import React from "react";
import { AppContext } from "../context/AppContext";
import { Typography, Box, Grid, Select } from "@mui/material";
import Image from "next/image";
import { API_INSTANCE } from "../../app-config";
import { Loader } from "../loader";
import axios from "axios";
import { AppConfigContext } from "../context/AppConfigContext";

function FeaturedShow() {
  const { shows } = React.useContext(AppContext);
  const { configuration, configSync, setConfigSync,loading,setLoading } =
    React.useContext(AppConfigContext);
  console.log("config", configuration);
  // const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  console.log("SHOWS", shows);

  const switchSelect = (show, selectVal, defaultVal) => {
    if (show.Title === configuration?.featuredShow?.Title) {
      return selectVal;
    } else {
      return defaultVal;
    }
  };

  const selectShow = async (show) => {
    try {
      setSelected(show.Title);

      setLoading(true);

      if (configuration) {
        console.log("ipdating config.....");
        const postRes = await axios.post(API_INSTANCE + "/post-config/12");
        const res = await axios.put(
          postRes.data.configJson,
          JSON.stringify({
            ...configuration,
            featuredShow: show,
          })
        );

        console.log("success", res.status);
        setConfigSync(!configSync);
        // setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <Box sx={style.container}>
      <Typography variant="h3">Featured Show</Typography>
      <Grid container spacing={2}>
        {shows.map((show) => (
          <Grid item sm={4}>
            {show.Title === selected ? (
              <Loader
                loadingOnModal={loading}
                action="Updating"
                width="400px"
                height="300px"
              />
            ) : null}
            <Box
              sx={{
                ...style.show,
                background: `url(${show.CoverArtLarge})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                border: switchSelect(show, "2px solid gray", "none"),
              }}
              onClick={() => selectShow(show)}
            >
              <Box
                sx={{
                  ...style.overlay,
                  background: switchSelect(show, "transparent", "black"),
                  opacity: switchSelect(show, "0.1", "0.5"),
                }}
              ></Box>
              <Typography sx={style.showTitle}>
                {show.Title.replace(/-/g, " ")}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const style = {
  container: {
    padding: "20px 30px",
  },
  show: {
    cursor: "pointer",
    borderRadius: "20px",
    height: "300px",
    display: "flex",
    alignItems: "flex-end",
    textAlign: "center",
    justifyContent: "center",
    position: "relative",
    transition: "0.5s",
    "&:hover": {
      border: "1px solid gray",
    },
  },
  overlay: {
    background: "black",
    position: "absolute",
    height: "300px",
    width: "100%",
    borderRadius: "20px",
    opacity: "0.5",
    transition: "0.5s",
    "&:hover": {
      opacity: "0.1",
      background: "white",
    },
  },

  showTitle: {
    fontSize: "28px",
    fontWeight: "700",
    padding: "16px 0px",
    width: "100%",
    background: "#11111199",
    color: "white",
    transition: "0.5s",
  },
};
export default FeaturedShow;
