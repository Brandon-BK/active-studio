import React from 'react'
import Box from "@mui/material/Box";
import withAdminNav from "./../component/hoc/withAdminNav";
import UserModal from '../component/usersProfile/userModal';
import axios from "axios";

const usersPage = () => {
    const [users , setUsers ] = React.useState([]);

      React.useEffect(async()=>{
        const response = await axios.get("https://p6x7b95wcd.execute-api.us-east-2.amazonaws.com/Prod/get-accounts");
        const results = response.data
        setUsers(results.users)
    },[]);

  return (
    <Box sx={{padding: '40px 0px 0px 20px', overflowY: 'auto' , display:'flex'}}>
      {
        users.map((user)=> ( <UserModal user={user} />))
      }
    </Box>
  )
}

export default withAdminNav(usersPage)
