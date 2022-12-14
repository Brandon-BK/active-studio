import { Box } from "@mui/material";
import withAdminNav from "./../component/hoc/withAdminNav";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import UploadBanners from "../component/customization/upload-banners";
import ProfilePictures from "../component/customization/profile-pictures";
import {LoginBackground} from "../component/customization/login-background";
import { CategoriesSort } from "../component/customization/categories-sort";
import { PaymentConfig } from "../component/customization/payment-config";


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
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const Customization = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%"
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
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ProfilePictures />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UploadBanners />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CategoriesSort />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <PaymentConfig />
        </TabPanel>
                <TabPanel value={value} index={4}>
        <LoginBackground />
          
        </TabPanel>
      </Box>
    </Box>
  );
};

export default withAdminNav(Customization);
