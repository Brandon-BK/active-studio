import React from 'react'
import Login from '../component/Login&&Signin/Login';
import withAdminNav from "./../component/hoc/withAdminNav";


const login = () => {

  return (
   <>
       
    <Login/>
 
   
   </>
  )
}
export default withAdminNav(login)







