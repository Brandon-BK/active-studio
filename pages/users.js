import React from 'react'
import Box from "@mui/material/Box";
import withAdminNav from "./hoc/withAdminNav";
import BasicModal from '../component/usersProfile/BasicModal';

const usersPage = () => {
  return (
    <Box sx={{padding: '40px 0px 0px 20px'}}>
      <BasicModal />
    </Box>
  )
}

export default withAdminNav(usersPage)
