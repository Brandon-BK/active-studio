import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import BarChartIcon from "@mui/icons-material/BarChart";
import HandymanIcon from "@mui/icons-material/Handyman";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import ChurchIcon from '@mui/icons-material/Church';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const tabs = [
  {
    title: "DASHBOARD",
    route: "/",
    icon: <DashboardIcon />,
  },
  {
    title: "CONTENT",
    route: "/content",
    icon: <PlayArrowIcon />,
  },
  {
    title: "SHOWS",
    route: "/shows",
    icon: <VideoLibraryIcon />,
  },
  {
    title: "ANALYTICS",
    route: "/analytics",
    icon: <BarChartIcon />,
  },
  {
    title: "CUSTOMIZATION",
    route: "/customization",
    icon: <HandymanIcon />,
  },
  {
    title: "MERCH",
    route: "/merch",
    icon: <LocalGroceryStoreIcon />,
  },
  {
    title: "GREENLIGHT",
    route: "/greenlight",
    icon: <LocalMoviesIcon />,
  },
  {
    title : 'ACTIVE CHURCH',
    route: "/active-church-studio",
    icon : <ChurchIcon />
  },{
    title: "USERS",
    route: "/users",
    icon: <AccountCircleIcon />,
  },

];

const withAdminNav = (Component) => {
  return function ComponentWidthAdminNavBar() {

    return (
      <Box sx={{ display: "flex", pl: 0 }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, pl: 0 }}
        >
          <Toolbar sx={{ pl: "0 !important" }}>
            <Typography sx={{ pl: 0 }} variant="h6" noWrap component="div">
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "70px",
                    height: "100%",
                    marginRight: "0.5rem !important",
                    minWidth: "unset",
                  }}
                >
                  <img
                    src="https://www.activetvonline.co.za/static/media/logo.718a6dab.png"
                    alt=""
                    style={{
                      height: "100%",
                      width: "100%",
                      padding: ".5rem 1rem",
                    }}
                  />{" "}
                </Box>
                ACTIVE STUDIO{" "}
              </Box>{" "}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {tabs.map((tab) => {
                return (
                  <Link href={tab.route} key={tab.title}>
                    <ListItem button >
                      <ListItemIcon> {tab.icon} </ListItemIcon>
                      <ListItemText primary={tab.title} />
                    </ListItem>
                  </Link>
                );
              })}
            </List>

            <Divider />
          </Box>{" "}
        </Drawer>{" "}
        <Box component="main" sx={{ flexGrow: 1,}}>
          <Toolbar />

          <Component />
        </Box>
      </Box>
    );
  };
};

export default withAdminNav;
