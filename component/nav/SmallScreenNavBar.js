import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


const SmallScreenNavBar = (props) => {
    const [openDrawerMenu, setOpenDrawerMenu] = useState(false);

    const toggleDrawer = (_, open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setOpenDrawerMenu(open);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                    pr: 2,
                }}
            >
                <Box
                    sx={{
                        width: "78px",
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
                    />
                </Box>

                <IconButton onClick={toggleDrawer("top", true)}>
                    <MenuIcon />
                </IconButton>
            </Box>

            <Box>
                <SwipeableDrawer
                    anchor={"top"}
                    open={openDrawerMenu}
                    onClose={toggleDrawer("top", false)}
                    onOpen={toggleDrawer("top", true)}
                >
                    <Box
                        sx={{
                            width: "100%",
                            background: "#111",
                            p: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                justifyContent: "space-between",
                                pr: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    width: "78px",
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
                                />
                            </Box>

                            <IconButton onClick={toggleDrawer("top", false)}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <List sx={{ width: "100%" }} id="small-screen-nav-routes">
                            {props.tabs.map((tab) => (
                                <div key ={index}>
                                    <Link href={tab.route}>
                                        <a
                                            key={tab.title}
                                            sx={{ color: "#212222" }}
                                            onClick={toggleDrawer("right", false)}
                                        >
                                            <ListItem button key={tab.title}>
                                                <ListItemText primary={tab.title} />

                                                <IconButton onClick={toggleDrawer("top", false)}>
                                                    <ListItemIcon sx={{ minWidth: "unset" }}>
                                                        <ArrowForwardIosIcon />
                                                    </ListItemIcon>
                                                </IconButton>
                                            </ListItem>
                                        </a>
                                    </Link>
                                </div>
                            ))}
                        </List>
                    </Box>
                </SwipeableDrawer>
            </Box>
        </Box>
    );
};


export default SmallScreenNavBar