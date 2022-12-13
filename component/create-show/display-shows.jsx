import React from 'react'
import { Box , Typography , Paper , Grid , Checkbox } from "@mui/material"
// import { Check} from "@mui/icons-material"
import Image from 'next/image'
const DisplayShows = ({showsData}) => {

  const TableHeader = ({text,fontSize,fontWeight}) => {
    return(
      <Typography
       fontSize={fontSize ? fontSize : '12px'}
        color={"#eee"} 
        fontWeight = {fontWeight ? fontWeight : 'normal'}
      >
        {text}   
      </Typography>
    )
  }

  return (
    <Box sx={{
      padding:"8px 12px",
      height:'100vh',
      overflowY:"scroll"
    }}>
      <Paper elevation={3}>
        <Grid container >
          <Grid sx={{ padding:'8px 0', background:'#111' , ...styles.tableColumn  }} item xs={0.5}> <Checkbox /> </Grid>
          <Grid sx={{ padding:'8px 0', background:'#111' , ...styles.tableColumn  }} item xs={3}><TableHeader text={"Thumbnail"} /></Grid>
          <Grid sx={{ padding:'8px 0', background:'#111' , ...styles.tableColumn  }} item xs={2}><TableHeader text={"Title"} /></Grid>
          <Grid sx={{ padding:'8px 0', background:'#111' , ...styles.tableColumn  }} item xs={2}><TableHeader text={"Timestamp"} /></Grid>
          <Grid sx={{ padding:'8px 0', background:'#111' , ...styles.tableColumn  }} item xs={1.5}><TableHeader text={"Seasons"} /></Grid>
          <Grid sx={{ padding:'8px 0', background:'#111' , ...styles.tableColumn  }} item xs={1.5}><TableHeader text={"Visibility"} /></Grid>
          <Grid sx={{ padding:'8px 0', background:'#111' , ...styles.tableColumn  }} item xs={1.5}><TableHeader text={"Access"} /></Grid>
          </Grid>
      </Paper>
     {
      showsData.map((item , index)=>{
        console.log(item)
        return(
          <Paper key = {index} elevation={1}>
          <Grid container >
            <Grid sx={{ padding:'12px 0', ...styles.tableColumn }} item xs={0.5}><Checkbox /> </Grid>
            <Grid sx={{ padding:'12px 0' , ...styles.tableColumn  }} item xs={3}> 
            <Image
             loader={() => item.CoverArtLarge}
              src={item.CoverArtLarge}
               height={60} width={60}
               layout = 'fixed'
               objectFit = 'cover'
               style={{borderRadius:'50px'}}
              />

            </Grid>
            <Grid sx={{ padding:'12px 0' , ...styles.tableColumn }} item xs={2}><TableHeader fontWeight={'bold'} text={item.Title} /></Grid>
            <Grid sx={{ padding:'12px 0' , ...styles.tableColumn  }} item xs={2}><TableHeader text={item.timestamp} /></Grid>
            <Grid sx={{ padding:'12px 0' , ...styles.tableColumn  }} item xs={1.5}><TableHeader text={0} /></Grid>
            <Grid sx={{ padding:'12px 0' , ...styles.tableColumn  }} item xs={1.5}><TableHeader text={"Visibility"} /></Grid>
            <Grid sx={{ padding:'12px 0' , ...styles.tableColumn  }} item xs={1.5}><TableHeader text={"Access"} /></Grid>
          </Grid>
        </Paper>
        )
      })
     }
    </Box>
  )
}

export default DisplayShows

const styles = {
  tableColumn : {
    display:'flex',justifyContent:'center' ,alignItems:'center' 
  }
}