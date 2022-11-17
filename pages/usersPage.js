import React from 'react'
import Box from "@mui/material/Box";
import withAdminNav from "./hoc/withAdminNav";
import UsersScreen from '../component/usersProfile/UsersScreen';
import BasicModal from '../component/usersProfile/BasicModal';

const usersPage = () => {
  return (
    <Box>
      {/* <UsersScreen /> */}
      <BasicModal />
    </Box>
  )
}

export default withAdminNav(usersPage)
