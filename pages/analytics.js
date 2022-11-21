import { Box , Grid,Button , Paper , Typography , CircularProgress } from "@mui/material";
import withAdminNav from "./hoc/withAdminNav";
import React from "react";
import axios from"axios";
import LaunchIcon from '@mui/icons-material/Launch';

const Analytics = () => {
    const [shows , setShows ] = React.useState([]); 
    const [users , setUsers ] = React.useState([]);
    const monthlySubscribers = users.filter((user) => {
        if(user.subscriptionType === "Monthly"){
            return user
        }
    })
    const yearlySubscribers = users.filter((user) => {
        if(user.subscriptionType === "Yearly"){
            return user
        }
    })
    let views = 0
    shows.forEach((show) => {
        console.log(show.views)
        if(show.views === undefined || show.views === null ){
            return
        }else{

            views = views + show.views 
            return views
        }
    })

    console.log("views", views)
    React.useEffect(async()=>{
        const response = await axios.get("https://p6x7b95wcd.execute-api.us-east-2.amazonaws.com/Prod/get-shows");
        const results = response.data
        setShows(results)
    },[]);

    React.useEffect(async()=>{
        const response = await axios.get("https://p6x7b95wcd.execute-api.us-east-2.amazonaws.com/Prod/get-accounts");
        const results = response.data
        setUsers(results.users)
    },[]);

    return (
        <Box
        sx={{
            height: "100vh",
            width: "100%",
            padding:'5rem'
        }}
        >

        <Grid container>
         <Grid item xs={12} lg={4} sx={{ height:'50vh' , border:'5px solid #111' }}>
            <Paper sx={{  display:'flex', flexDirection:'column' , alignItems:'center',justifyContent:'space-evenly' ,width:'100%' , height:'100%' , padding:'12px 21px' }}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress size={"12.5rem"} variant="determinate" value={users.length + 80} sx={{scale:3, color:'rgb(80, 200, 120)'}} />
            <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}
          >
          <Typography variant="caption" component="div" color="text.secondary">
          {users.length}
          </Typography>
          </Box>
          </Box><Typography sx={{ fontSize:'32px', margin:'21px 0' , fontWeight:600 ,}} >
          Subscribers
          </Typography>
          <Box sx={{ height:'50px' , background:''}}>
          <Button sx={{ background:'#' , color:'rgb(80, 200, 120)' }}>View Subscribers <LaunchIcon /> </Button>
          </Box>
          </Paper>
          </Grid>            <Grid item xs={12} lg={4} sx={{ height:'50vh' , border:'5px solid #111' }}>
          <Paper sx={{  display:'flex', flexDirection:'column' , alignItems:'center',justifyContent:'space-evenly' ,width:'100%' , height:'100%' , padding:'12px 21px' }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress size={"12.5rem"} variant="determinate" value={100} sx={{scale:3 , color:'rgba(255,191,0)'}} />
          <Box
          sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}
          >
          <Typography variant="caption" component="div" color="text.secondary">
          {monthlySubscribers.length === 0 ? 0 : monthlySubscribers}
          </Typography>
          </Box>
          </Box><Typography sx={{ fontSize:'32px', margin:'21px 0' , fontWeight:600 , color:'#eee'}} >
          Monthly Subscribers
          </Typography>
          <Box sx={{ height:'50px' , background:''}}>
          <Button sx={{ background:'#' , color:'rgb(255, 191, 0)' }}>View Monthly Subscribers <LaunchIcon /> </Button>
          </Box>
          </Paper>
          </Grid>            <Grid item xs={12} lg={4} sx={{ height:'50vh' , border:'5px solid #111' }}>
          <Paper sx={{  display:'flex', flexDirection:'column' , alignItems:'center',justifyContent:'space-evenly' ,width:'100%' , height:'100%' , padding:'12px 21px' }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress size={"12.5rem"} variant="determinate" value={"90"} sx={{scale:3 , color:'rgba(0,190,190,.5)'}} />
          <Box
          sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}
          >
          <Typography variant="caption" component="div" color="text.secondary">
          {yearlySubscribers.length === 0 ? 0 : yearlySubscribers}

          </Typography>

          </Box>
          </Box><Typography sx={{ fontSize:'32px', margin:'21px 0' , fontWeight:600 , color:'#eee'}} >
          Yearly Subscribers
          </Typography>
          <Box sx={{ height:'50px' , background:''}}>
          <Button sx={{ background:'#' , color:'rgba(0,190,190,.5)' }} >View Yearly Subscribers <LaunchIcon /> </Button>
          </Box>
          </Paper>
          </Grid>
        <Grid item xs={12} lg={6} sx={{ minHeight:'50vh' , border:'5px solid #111' }}>
        <Paper sx={{  display:'flex', flexDirection:'column' , alignItems:'center',justifyContent:'space-evenly' ,width:'100%' , height:'100%' , padding:'12px 21px' }}>
        <Box sx={{ position: 'relative', background:'',width:'100%', height:'fit-content' , display: 'inline-flex' , justifyContent:'center' , alignItems:'center' }}>
        <CircularProgress size={"12.5rem"} variant="determinate" value={Number(views / 100)} sx={{ color:'rgb(136, 8, 8)'}}/>
          <Box
          sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}
          >
          <Typography variant="caption" sx={{ width:'100%' , fontSize:'21px' , textAlign:'center'}} component="div" color="text.secondary">
          {views}
          </Typography>
          </Box>
          </Box><Typography sx={{ fontSize:'24px', margin:'21px 0' , fontWeight:600 , color:'#eee'}} >
          Views
          </Typography>
          <Box sx={{ height:'50px' , background:''}}>
          <Button sx={{ background:'#' , color:"rgb(136, 8, 8)" }}>View Shows <LaunchIcon /> </Button>
          </Box>
          </Paper>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ minHeight:'50vh' , border:'5px solid #111' }}>

          <Paper sx={{  display:'flex', flexDirection:'column' , alignItems:'center',justifyContent:'space-evenly' ,width:'100%' , height:'100%' , padding:'12px 21px' }}>

          <Grid container spacing={1}>
          {
            shows.map((item , index)=>{
                if(index < 3){
                    return(
                        <Grid item xs={12} lg={6} sx={{ opacity:'.7',backgroundImage:`url(${item.CoverArtLarge})`, backgroundRepeat:'no-repeat', backgroundPosition:'center',backgroundSize:'contain',margin:'12px 0',height:{ xs:'250px', md:'200px'},padding:'12px' }} >

                        </Grid>
                        )
                    }
                })
            }
            </Grid>
            </Paper>
            </Grid>
           
          </Grid>
          </Box>
          );
}

export default withAdminNav(Analytics)