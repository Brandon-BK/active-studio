import React from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import EpisodeContainer from "../../component/shows-utils/EpisodeContainer";
// import data from '../../component/shows-utils/shows.json'
import { useContext,useEffect } from "react";
import { AppContext } from "../../component/context/AppContext";
import axios from "axios";
import { API_INSTANCE } from "../../app-config";
import FilterListIcon from "@mui/icons-material/FilterList";
//import episodes from "../../component/shows-utils/episodes.json";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {SpeedDial} from '@mui/material'
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EpisodeModal from "../../component/episodes/episodeModal";
import { useRouter } from "next/router";


import { MEDIA_URL_INSTANCE } from "../../app-config";
import { Loader } from "../../component/loader"; 

// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch(API_INSTANCE + '/get-shows')
//   const shows = await res.json()
  
//   // Get the paths we want to pre-render based on posts
//   const paths = shows.map((show) => ({
//     params: { id: show.Title },
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false }
// }

// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const res = await fetch(`${API_INSTANCE}/get-show/${params.id}`)
//   const show = await res.json()

//   // Pass post data to the page via props
//   return { props: { show } }
// }

const EpisodesPage = ({show}) => {
  const { setShowJson,setSingleShowData,singleShowData } = useContext(AppContext);
  
  const [episodes,setEpisodes] = useState([]);
  const router  = useRouter()

  //thumbnail and video file state
  const [files, setFiles] = useState([]);
  const [videoFiles,setVideoFiles] = useState([])

  const showTitleQuery = router.query.id

  //loader state
  const [loading,setLoading] = useState(false);

  const fetchShow = async()=>{
    alert(router.query.id)
    setLoading(true)
    const res = await axios.get(`${API_INSTANCE}/get-show/${showTitleQuery}`)
    const show = res.data
    console.log({SHOW : show})

    setSingleShowData(show.showItem.Item)
    setShowJson(show.showJson)
    setEpisodes(show.showJson.episodes)
    setLoading(false)
  };  
  const [sync,setSync] = useState(false);

  

  useEffect(()=>{
    console.log('fetching a show data ...')
    fetchShow()
  },[sync]);

  
  const [searchTerm, setSearchTerm] = useState("");
  
  const [open,setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openSpeedDail, setOpenSpeedDail] = React.useState(false);
  const handleOpenSpeedDail = () => setOpenSpeedDail(true);
  const handleCloseSpeedDail = () => setOpenSpeedDail(false);

  
  
  
  return (
    <Box sx={{ color: "#fff", background: "red" }}>
         <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: "absolute", bottom: "32px", right: "32px" }}
        icon={<SpeedDialIcon />}
        onClose={handleCloseSpeedDail}
        onOpen={handleOpenSpeedDail}
        onClick={handleOpen}
        open={openSpeedDail}
      />
        <Loader loading={loading} />
        <EpisodeModal
         open = {open}
         setOpen = {setOpen}
         episodes = {episodes}
         files = {files}
         setFiles = {setFiles}
         videoFiles = {videoFiles}
         setVideoFiles = {setVideoFiles}
         sync = {sync}
         setSync = {setSync}
      
        
        />
      <Grid container sx={{ background: "red" }}>
        <Grid
          item
          md={4}
          sm={12}
          sx={{ ...styles.gridItems, background: "#111" }}
        >
          <Box
            sx={{
              ...styles.showsImg,
              background: `url(${singleShowData?.CoverArtLarge})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* <img src={showsDetails.img} width={'100%'} height={'100%'}  style={{objectFit:'cover', backgroundRepeat:'no-repeat'}} /> */}
          </Box>

          <Box sx={{ ...styles.bottomHalf }}>
            <Box sx={{ ...styles.episodeContent }}>
              <Typography
                color="#f3f3f3"
                variant="p"
                fontSize={18}
                fontWeight={"bold"}
                letterSpacing={2}
              >
                {singleShowData?.Title}
              </Typography>
            </Box>
            <Box sx={{ ...styles.episodeContent }}>
              <Typography
                color="#f3f3f3"
                variant="p"
                fontSize={14}
                texttransform={"uppercase"}
              >
                Description :
              </Typography>
              <Typography color="#999" variant="p" fontSize={14} marginLeft={1}>
                {singleShowData?.description}
              </Typography>
            </Box>
            <Box sx={{ ...styles.episodeContent }}>
              <Typography
                color="#f3f3f3"
                variant="p"
                fontSize={14}
                texttransform={"uppercase"}
              >
                Last-updated :
              </Typography>
              <Typography color="#999" variant="p" fontSize={14} marginLeft={1}>
                {singleShowData?.timestamp}
              </Typography>
            </Box>
            <Box sx={{ ...styles.episodeContent }}>
              <Typography
                color="#f3f3f3"
                variant="p"
                fontSize={14}
                texttransform={"uppercase"}
              >
                Visibility :
              </Typography>
              <Typography color="#999" variant="p" fontSize={14} marginLeft={1}>
                {/* {showsDetails.visibility} */}
                {singleShowData?.visibility ? 'public' : 'private'}
              </Typography>
            </Box>
            <Box
              sx={{
                ...styles.episodeContent,
                flex: 2,
                borderTop: "1px solid #444",
              }}
            >
              <Avatar
                alt=""
                src="/static/images/avatar/1.jpg"
                sx={{ width: 50, height: 50, color: "#fff" }}
              />
              <Typography
                color="#f3f3f3"
                variant="p"
                fontSize={14}
                texttransform={"uppercase"}
              ></Typography>
              <Typography color="#999" variant="p" fontSize={14} marginLeft={1}>
                {/* {showsDetails.visibility} */}
                schadrackbotombe@gmail.com
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          md={8}
          sm={12}
          sx={{ ...styles.gridItems, background: "#030303", padding: 0 }}
        >
          <Box sx={{ ...styles.sortContainer }}>
            <FilterListIcon />
            <input
              // value={searchTem}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="filter..."
              style={{
                color: "#fff",
                padding: "14px 0px",
                margin: "10px 0px",
                width: "70%",
                background: "transparent",
              }}
            />
          </Box>
          <DragDropContext>
            <Droppable
              droppableId="episodeSequence"
              direction="vertical"
              type="row"
            >
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  {...provided.dragHandleProps}
                  // ref="provided.innerRef"
                  sx={{ height: "90%", overflowY: "auto" }}
                >
                    
                  {
                    !episodes.length ? 
                    <h1 style={{color:'white',textAlign : 'center'}}>THIS SHOW HAS NO EPISODES YET</h1> :
                  episodes
                    .filter((val) => {
                      if (searchTerm == "") {
                        return val;
                      }
                      if (
                        val.Title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((episode, index) => {
                      console.log(episode)
                      return(
                      <EpisodeContainer
                        key = {index}
                        index={index} 
                        title={episode.episodeName}
                        showTitle = {singleShowData?.Title.replace(/-/g,' ')}
                        sync = {sync}
                        setSync = {setSync}
                        description={episode.description}
                        img={MEDIA_URL_INSTANCE+`${showTitleQuery}/episodes/${episode.Title}/large-${episode.thumbnailFilename}`}
                        video = {MEDIA_URL_INSTANCE+`${showTitleQuery}/episodes/${episode.Title}/${episode.videoFileName}`}
                        episodes = {episodes}
                        episode = {episode}
                        files = {files}
                        setFiles = {setFiles}
                        videoFiles = {videoFiles}
                        setVideoFiles = {setVideoFiles}
                      />
                    )})}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EpisodesPage;

const styles = {
  container: {},
  gridItems: {
    //  border:'1px solid red',
    height: {
      md: "100vh",
      sm: "50vh",
    },
    padding: "10px",
  },

  showsImg: {
    width: "100%",
    height: "45%",
    // border: '1px solid blue'
  },
  titleContainer: {
    border: "1px solid red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
  },
  sortContainer: {
    borderBottom: "1px solid #111",
    height: "10%",
    display: "flex",
    // justifyContent: 'center',
    alignItems: "center",
    padding: "0 10px",
    gap: 2,
  },
  inputContainer: {
    width: "100%",
    height: "auto",
    display: "flex",
    borderTop: "1px solid #222",
    padding: "0 15px",
  },
  bottomHalf: {
    // border: '1px solid blue',
    height: "55%",
    display: "flex",
    flexDirection: "column",
    padding: "0 20px",
  },
  episodeContent: {
    flex: 1,
    // border: '1px solid yellow',
    display: "flex",
    alignItems: "center",
  },
};
