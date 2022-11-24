import { Box } from "@mui/material";
import withAdminNav from "../component/hoc/withAdminNav";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Event from "../component/active-church/event";
import { API_INSTANCE } from "../app-config/index.";
import axios from "axios";

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

const EventsAndSermons = () => {
  const [value, setValue] = React.useState(0);
  const [sync, setSync] = React.useState(false);
  const [EVENTS, setEvents] = React.useState([
    {
      startTime: "",
      Title: "",
      endTime: "",
      isUpcoming: false,
      ID: "",
      type: "",
    },
  ]);
  React.useEffect(() => {
    async function getData() {
      let endpoint = API_INSTANCE + "/get-events";
      // let endpoint = "http://127.0.0.1:3000/get-events";
      const response = await axios.get(endpoint);
      console.log("successfull fetch", response.data);
      setEvents(response.data.eventsAndSermons);
    }
    getData();
  }, [sync]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const eventTypes = [
  //   { eventType: "Sunday Service" },
  //   { eventType: "Active Youth" },
  //   { eventType: "Children's Church" },
  // ];
  const types = EVENTS.map(({ type }) => type);
  const uids = [...new Set(types)];
  const eventTypes = uids.map((item)=>({eventType : item}))
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
            {eventTypes.map((event, i) => (
              <Tab key={i} label={event.eventType} {...a11yProps(i)} />
            ))}
          </Tabs>
        </Box>

        {eventTypes.map((event, i) => (
          <TabPanel key={i} value={value} index={i}>
            <Event
              EVENTS={EVENTS.filter((item) => item.type == event.eventType && !item.isUpoming)}
              UC_EVENTS = {EVENTS.filter((item)=> item.isUpcoming)}
              sync={sync}
              setSync={setSync}
              title={event.eventType}
              eventTypes={eventTypes}
              index={i}
            />
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default withAdminNav(EventsAndSermons);
