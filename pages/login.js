import React from 'react'
import Login from '../component/Login&&Signin/Login';
import {withSnackbar} from 'notistack'


const login = () => {

  return (
   <>
       
    <Login/>
 
   
   </>
  )
}
export default withSnackbar(login)







