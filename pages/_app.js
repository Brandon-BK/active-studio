import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import RouterIdicator from "../state/context/RouterIdicator";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppContext } from "../component/context/AppContext";
import { useEffect, useState } from "react";
import { API_INSTANCE } from "../app-config";
import axios from "axios";
import {
  AppConfigContext,
  initialConfigState,
} from "../component/context/AppConfigContext";
import Slide from "@mui/material/Slide";
import {SnackbarProvider} from 'notistack'
import AdminNavLayout  from '../component/hoc/withAdminNav'
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
  const [singleShowData, setSingleShowData] = useState(JSON.stringify({}));
  const [showJsonData, setShowJsonData] = useState({});

  const [showJson, setShowJson] = useState({});
  const [bannerSync, setBannerSync] = useState(false);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jsonEpisodes,setJsonEpisodes] = useState([])
  const getConfig = async () => {
    const request = await axios.get(`${API_INSTANCE}/get-config`);
    const configRequest = await axios.get(request.data.configJsonData);
    const configData = configRequest.data;

    setConfiguration({
      ...configuration,
      banners: request.status === 200 ? request.data.BannerImageUrls : [],
      sortCatergories: configData.sortCatergories,
      setCatergorySizeAndType: configData.setCatergorySizeAndType,
      authenticationImages: {
        sameImage: false,
      },
      ...configData,
    });
    setLoading(false)
  };

  const getShows = async () => {
    const res = await axios.get(API_INSTANCE + '/get-shows');
    setShows(res.data);
  };
  const getJsonEpisodes = async ()=>{
    const res = await axios.get(API_INSTANCE + '/get-episodes');
    setJsonEpisodes(res.data)
  }
  useEffect(() => {
    getJsonEpisodes()
  }, []);
  
  const [showsSync, setShowsSync] = useState(false);

  useEffect(()=>{
    getShows();

  },[showsSync])
  const [configSync, setConfigSync] = useState(false);
  useEffect(() => {
    getConfig();
  }, [configSync]);
  return (
    <SnackbarProvider
      maxSnack = {3}
      PreventDuplicate
      utoHideDuration={5000}
      TransitionComponent={Slide}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    
    >
    <AppConfigContext.Provider
      value={{
        configuration,
        setConfiguration,
        configSync,
        setConfigSync,
        loading,
        setLoading,
      }}
    >
      <AppContext.Provider
        value={{
          showsDetails,
          setShowsDetails,
          DisplayShowDetails,
          singleShowData,
          setSingleShowData,
          showJsonData,
          setShowJsonData,
          showJson,
          setShowJson,
          bannerSync,
          setBannerSync,
          shows,
          jsonEpisodes,
          configSync, setConfigSync
        }}
      >
        <ThemeProvider theme={darkTheme}>
        <RouterIdicator />
        <AdminNavLayout>
          <Component {...pageProps} />
        </AdminNavLayout>
        </ThemeProvider>
      </AppContext.Provider>
    </AppConfigContext.Provider>
    </SnackbarProvider>
  );
}

export default MyApp;
