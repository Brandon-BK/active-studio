import React from "react";
import Box from "@mui/material/Box";
import withAdminNav from "./../component/hoc/withAdminNav";
import UserModal from "../component/usersProfile/userModal";
import { Loader } from "../component/loader/index";
import { useState } from "react";
import axios from "axios";

const usersPage = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://p6x7b95wcd.execute-api.us-east-2.amazonaws.com/Prod/get-accounts"
      );
      const results = response.data;
      setUsers(results.users);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);
      setErrorLogs(err.message);
    }
  }, []);

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            padding: "40px 0px 0px 20px",
            overflowY: "auto",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {users.map((user) => (
            <UserModal key={user.displayName} user={user} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default withAdminNav(usersPage);
