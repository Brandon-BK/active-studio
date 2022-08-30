import Box from '@mui/material/Box';
import withAdminNav from "./hoc/withAdminNav";
import TransitionsModal from '../component/Popup/Modal'
import ShowContainer from '../component/shows-utils/ShowContainer';
import { useEffect, useState } from 'react';
import GuideBar from '../component/shows-utils/GuideBar';
import data from '../component/shows-utils/shows.json'
import { IconButton, Typography } from '@mui/material';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';

// icons
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import { API_INSTANCE } from '../app-config/index.';
import axios from 'axios';


const Shows = () => {

    const [filterTerm, setFilterTerm] = useState("")
    const [shows, setShows] = useState([])
    const [filterTime, setFilterTime] = useState(false)

    const getData = async () => {
        const res = await axios.get(`${API_INSTANCE}/latest-shows`)
        setShows(res.data)
        console.log(res)
    }

    const handleTimeFilterClick = () => {
        setFilterTime(true)
    }

    useEffect(() => {
        getData()
    }, [])


    const FilterByTime = ({ shows }) => {
        let localShows = shows.sort((a, b) => {
            let A = a.timestamp
            let B = b.timestamp
            return A - B
        })

        console.log(localShows);
        return localShows.map((item) => {
            const episodes = item.episodes ? item.episodes : [];

            return (
                <ShowContainer likes={item.likes} title={item.Title} count={episodes.length} link={item.id} img={item.CoverArtLarge} lastUpdated={item.timestamp} description={item.description} />
            )
        })
    }

    const RenderShowsBySelectedOptions = () => {
        if (filterTime) {
            return <FilterByTime shows={shows} />
        } else {
            return shows.filter((filterVal) => {
                if (filterTerm == "") {
                    return filterVal
                } else if (filterVal.Title.toLocaleLowerCase().toLocaleUpperCase().includes(filterTerm.toLocaleLowerCase().toLocaleUpperCase())) {
                    return filterVal
                }
            }).map((item) => {
                const episodes = item.episodes ? item.episodes : [];

                return (
                    <ShowContainer show={item} likes={item.likes} title={item.Title} count={episodes.length} link={item.id} img={item.CoverArtLarge} lastUpdated={item.timestamp} description={item.description} />
                )
            })
        }
    }


return (
    <Box
        sx={{
            minHeight: "100vh",
            width: "100%",
            background: '#111',
        }}
    >

        <Typography color="#222" variant='h1' sx={{ padding: "8px" }}>
            Watch shows
        </Typography>
        <Box sx={styles.inputContainer}>
            <Box sx={{ width: '150px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <IconButton onClick={handleTimeFilterClick}>
                    <FilterListIcon sx={{ color: '#999', transformBox: 'rotateY(360deg)' }} />
                </IconButton>
                <IconButton onClick={handleTimeFilterClick} sx={{ padding: '12px 12px' }}>
                    <Typography color="#999" variant='h6' sx={{ fontSize: "12px", fontWeight: 600 }}>
                        A - Z
                    </Typography>
                </IconButton>
            </Box>
            <input
                placeholder='filter...'
                style={{ color: "#fff", padding: '16px', margin: '10px ', width: '70%', background: 'transparent' }}
                onChange={(e) => setFilterTerm(e.target.value)}
            />

        </Box>

        <GuideBar />
        {
            shows.map((item) => {
                const episodes = item.episodes ? item.episodes : [];
                if (item.Title.toLocaleLowerCase().toLocaleUpperCase().includes(filterTerm.toLocaleLowerCase().toLocaleUpperCase())) {
                    return (
                        <ShowContainer show={item} likes={item.likes} title={item.Title} count={episodes.length} link={item.id} img={item.CoverArtLarge} lastUpdated={item.timestamp} description={item.description} />
                    )
                }
            })
        }

    </Box>
);
}


export default withAdminNav(Shows)



const styles = {
    inputContainer: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        borderTop: '1px solid #222',
        padding: '0 15px'
    }
}


