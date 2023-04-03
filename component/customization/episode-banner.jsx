import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { API_INSTANCE } from "../../app-config";
import { ModalLoader as Loader } from "../loader";
import axios from "axios";

function EpisodeBanner({
  episodes,
  configuration,
  loading,
  setLoading,
  configSync,
  setConfigSync,
}) {
  const [featuredEpisodes, setFeaturedEpisodes] = React.useState(
    configuration.featuredEpisodes
      ? configuration.featuredEpisodes
      : [{ Title: "" }, { Title: "" }, { Title: "" }, { Title: "" }]
  );

  const selectFeaturedEpisodes = (episode, i) => {
    console.log(episode);
    let newArray = [...featuredEpisodes];
    newArray[i] = episode;
    setFeaturedEpisodes(newArray);
  };
  console.log(featuredEpisodes);
  console.log("config", configuration);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      if (configuration) {
        const postRes = await axios.post(API_INSTANCE + "/post-config/12");
        const res = await axios.put(
          postRes.data.configJson,
          JSON.stringify({
            ...configuration,
            featuredEpisodes,
          })
        );
      }
      setConfigSync(!configSync);
      console.log("success");
      setLoading(false);
    } catch (err) {
      console.log("update featured episodes error", err);
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{ padding: "20px 40px", display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h4">Choose Your Featured Episodes</Typography>
      <Grid container spacing={2}>
        {["f1", "f2", "f3", "f4"].map((item, i) => {
          return (
            <Grid key={item} item xs={3}>
              <Typography sx={{ margin: "12px 0px" }}>
                Featured Episode {i + 1}
              </Typography>
              <Loader
                loadingOnModal={loading}
                action="UPDATING"
                height="100%"
                bottom="10%"
                right="-5%"
              />
              <TextField
                select
                // label={`Featured Episode ${i + 1}`}
                value={featuredEpisodes[i].Title}
                fullWidth
                // onChange={(e) => handleChange(e, i)}
              >
                {episodes.map((episode) => (
                  <MenuItem
                    key={episode.Title}
                    value={episode.Title}
                    title={episode.description}
                    onClick={(e) => selectFeaturedEpisodes(episode, i)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ marginRight: "auto" }}>
                        {episode.Title}
                      </Typography>
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "20px",
                          marginLeft: "30px",
                        }}
                      >
                        <img
                          src={episode.CoverArtLarge}
                          style={{
                            width: "100%",
                            height: "100%",
                            marginLeft: "auto",
                            borderRadius: "10px",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition:'center',
                          }}
                        />
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          );
        })}
      </Grid>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          margin: "40px 0px",
        }}
      >
        <Button
          color="success"
          sx={{
            padding: "12px 10px",
            margin: "0 8px",
            color: "green",
            border: "1px solid green",
            "&:hover": {
              background: "green",
              color: "#000",
              border: "1px solid transparent",
            },
          }}
          onClick={handleConfirm}
          disabled={
            !featuredEpisodes.every((item) => Object.keys(item).length > 1)
          }
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
}

export default EpisodeBanner;
