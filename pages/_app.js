import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import RouterIdicator from "../state/context/RouterIdicator";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppContext } from "../component/context/AppContext";
import { useEffect, useState } from "react";
import { API_INSTANCE } from "../app-config/index.";
import axios from "axios";
import {
  AppConfigContext,
  initialConfigState,
} from "../component/context/AppConfigContext";
import BasicModal from "../component/usersPage/BasicModel";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({ Component, pageProps }) {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState({});
  const [configuration, setConfiguration] = useState(initialConfigState);
  const [showsDetails, setShowsDetails] = useState({
    title: "",
    description: "",
    img: "",
    likes: "",
    EpisodeCount: "",
    lastUpdated: "",
    lastUpdated: "",
  });

  const DisplayShowDetails = (
    title,
    description,
    img,
    likes,
    EpisodeCount,
    lastUpdated
  ) => {
    setShowsDetails({
      title: title,
      description: description,
      img: img,
      likes: likes,
      EpisodeCount: EpisodeCount,
      lastUpdated: lastUpdated,
    });
  };

  const getConfig = async () => {
    const request = await axios.get(`${API_INSTANCE}/get-config`);
    const configRequest = await axios.get(request.data.configJsonData);
    const configData = configRequest.data;

    setConfiguration({
      ...configuration,
      banners: request.status === 200 ? request.data.BannerImageUrls : [],
      sortCatergories: configData.sortCatergories,
      setCatergorySizeAndType: configData.setCatergorySizeAndType,
    });
  };

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <AppConfigContext.Provider value={{ configuration, setConfiguration }}>
      <AppContext.Provider
        value={{ showsDetails, setShowsDetails, DisplayShowDetails }}
      >
        <RouterIdicator />
        <ThemeProvider theme={darkTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AppContext.Provider>
    </AppConfigContext.Provider>
  );
}

export default MyApp;
