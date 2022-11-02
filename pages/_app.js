import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import RouterIdicator from "../state/context/RouterIdicator";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppContext } from "../component/context/AppContext";
import { useEffect, useRef, useState } from "react";
import UsersScreen from "../component/usersPage/UsersScreen";
import BasicModal from "../component/usersPage/BasicModel";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({ Component, pageProps }) {
  const [showsDetails, setShowsDetails] = useState({
    title: "",
    description: "",
    img: "",
    likes: "",
    EpisodeCount: "",
    lastUpdated: "",
  });

  //const DisplayShowDetails = (title, description, img, likes, EpisodeCount, lastUpdated) => {

  const [singleShowData, setSingleShowData] = useState(JSON.stringify({}));
  const [showJsonData, setShowJsonData] = useState({});

  const [showJson, setShowJson] = useState({});
  
  // //using use effect and loal storage to persist jsondata state
  // useEffect(()=>{
  //   setSingleShowData(
  //     JSON.parse(window.localStorage.getItem('singleShowData'))
  //   )
  //   console.log('BOOOOM:',singleShowData)
  // },[]);

  // useEffect(()=>{
  //   window.localStorage.setItem('singleShowData',JSON.stringify(singleShowData))
  // },[singleShowData])
  
  console.log({ singleShowData });
  const DisplayShowDetails = (
    title,
    description,
    img,
    likes,
    EpisodeCount,
    lastUpdated,
    showData
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

  return (
    <AppContext.Provider
      value={{
        showsDetails,
        setShowsDetails,
        DisplayShowDetails,
        singleShowData,
        setSingleShowData,
        showJson,
        showJsonData,
        setShowJsonData,
        setShowJson
      }}
    >
      <RouterIdicator />
      <ThemeProvider theme={darkTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
