import React,{useContext} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Typography } from "@mui/material";
import { AppConfigContext } from "../context/AppConfigContext";
import { HomePageCategories } from "./home-page-categories";
import { ShowsPageCategories } from "./shows-page-categories";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function AppCategories() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { configuration, setConfiguration } = useContext(AppConfigContext);

  return (
    <Box
      sx={{
        height: "80vh",
        width: "100%",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Home Page Categories" {...a11yProps(0)} />
            <Tab label="Shows Page Categories" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <HomePageCategories
            configuration={configuration}
            setConfiguration = {setConfiguration}
           />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ShowsPageCategories 
            configuration={configuration}
            setConfiguration = {setConfiguration}
          />
        </TabPanel>
      </Box>
    </Box>
  );
}

export default AppCategories;
