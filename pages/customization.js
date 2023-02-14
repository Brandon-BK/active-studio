import { Box } from "@mui/material";
import { withSnackbar } from "notistack";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import UploadBanners from "../component/customization/upload-banners";
import ProfilePictures from "../component/customization/profile-pictures";
import { LoginBackground } from "../component/customization/login-background";
import { PaymentConfig } from "../component/customization/payment-config";
import FeaturedShow from "../component/customization/featured-show";
import EpisodeBanner from "../component/customization/episode-banner";
import { AppContext } from "../component/context/AppContext";
import { AppConfigContext } from "../component/context/AppConfigContext";
import AppCategories from "../component/customization/app-categories";
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

const Customization = () => {
  const [value, setValue] = React.useState(0);
  const { jsonEpisodes } = React.useContext(AppContext);
  const { configuration, configSync, setConfigSync, loading, setLoading } =
    React.useContext(AppConfigContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        height: "100vh",
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
            <Tab label="Profile Pictures" {...a11yProps(0)} />
            <Tab label="Upload Banners" {...a11yProps(1)} />
            <Tab label="Categories" {...a11yProps(2)} />
            <Tab label="Payments" {...a11yProps(3)} />
            <Tab label="Login" {...a11yProps(4)} />
            <Tab label="Main Show" {...a11yProps(5)} />
            <Tab label="Featured Episodes" {...a11yProps(6)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ProfilePictures />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UploadBanners />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AppCategories 
          propValues = {configuration, configSync, setConfigSync, loading, setLoading}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <PaymentConfig />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <LoginBackground />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <FeaturedShow />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <EpisodeBanner
            episodes={jsonEpisodes.Episodes}
            configuration={configuration}
            configSync={configSync}
            setConfigSync={setConfigSync}
            loading={loading}
            setLoading={setLoading}
          />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default withSnackbar(Customization);
