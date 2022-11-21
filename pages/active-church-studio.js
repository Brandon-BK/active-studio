import { Box } from "@mui/material";
import withAdminNav from "./hoc/withAdminNav";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Event from "../component/active-church/event";

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

const EventsAndSermons = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const eventTypes = [
    { eventType: "Sunday Service" },
    { eventType: "Active Youth" },
    { eventType: "Bible Studies" },
    { eventType: "Active Worship" },
    { eventType: "Children's Church" },
    
  ];
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
           {
            eventTypes.map((event,i)=>(
              <Tab key = {i} label={event.eventType} {...a11yProps(i)} />
            ))
           }
           
          </Tabs>
        </Box>
        
        {
          eventTypes.map((event,i)=>(
            <TabPanel key = {i} value={value} index={i}>
              <Event title = {event.eventType} eventTypes = {eventTypes} />
            </TabPanel>
          ))
        }
      </Box>
    </Box>
  );
};

export default withAdminNav(EventsAndSermons);
