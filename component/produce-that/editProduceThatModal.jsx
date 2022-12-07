import * as React from 'react';
import { Box , Avatar , Grid , Drawer , Paper , Typography , TextField , Button} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from"axios";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';


export const EditProduceThatModal = (props) => {
    const { openEdit , setOpenEdit } = props.actions
    return(
        <Drawer anchor="bottom" open={openEdit}>

        <Button onClick={()=>setOpenEdit(false)} sx={{ position:'fixed', right:0 , padding:'16px 28px' }}><CloseIcon sx={{ fontSize:'42px' , color:'#eee'}} /></Button>

            <Box sx={{ height:'80vh' , padding:'1.5rem' , background:"#121212" , overflowY:'scroll' }}>
                <Grid container>
                    <Grid item xs={6} sx={{ background:'' }}>
                    <Paper sx={{ height:'350px',  display:'flex', flexDirection:'column' , alignItems:'center',justifyContent:'center' ,width:'100%' , padding:'21px' }}>
            <Box sx={{ display:'flex' , background:`url(${props.show.CoverArtLarge}) no-repeat center`,flexDirection:'column' , alignItems:'center',justifyContent:'center' ,width:'100%' , height:'100%' , padding:'21px' , border:'1px dashed rgba(255,255,255,.3)' }} >
              
            
            </Box>
          </Paper>
          <Box sx={{ overflowX:'auto' , overflowY:'hidden' , background:'' , display:'flex' , width:'100%' }}>

            <Box sx={{ height:'300px', width:'400px'  , border:'3px solid #121212' ,}}>
                                        <Typography sx={{ margin:'12px 0', fontWeight:600 }}>
              Trailer 2
            </Typography>
                <Box sx={{ width:"100%" , height:'200px' , background:'url("https://i.ytimg.com/vi/2Y9hZnPQFog/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLArng_OxbBkuirx6oxgpOPdFXSzsg") no-repeat center' , backgroundSize:'cover'}} />
            <Box sx={{width:'150px' , height:'50px', margin:'0 auto' , background:'' , display:'flex'}}>
                    <Box sx={{flex:1 , display:'flex' , alignItems:'center' , justifyContent:'center'}}>
                        <DeleteIcon title="Delete" sx={{ color:'#eee' , cursor:'pointer' }} />
                    </Box>

                </Box>
            </Box>
            <Box sx={{ height:'300px', width:'400px'  , border:'3px solid #121212' ,}}>
                                         <Typography sx={{ margin:'12px 0', fontWeight:600 }}>
              Trailer 3
            </Typography>
                <Box sx={{ width:"100%" , height:'200px' , background:'url("https://i.ytimg.com/an_webp/8PLOu9O3-Bs/mqdefault_6s.webp?du=3000&sqp=CJuUnJwG&rs=AOn4CLBx3GRbTvp2zm1kIoyAGzcLTmIC0w") no-repeat center' , backgroundSize:'cover'}} />
            <Box sx={{width:'150px' , height:'50px', margin:'0 auto' , background:'' , display:'flex'}}>
                    <Box sx={{flex:1 , display:'flex' , alignItems:'center' , justifyContent:'center'}}>
                        <DeleteIcon title="Delete" sx={{ color:'#eee' , cursor:'pointer' }} />
                    </Box>

                </Box>
            </Box>
            <Box sx={{ height:'300px', width:'400px'  , border:'3px solid #121212' ,}}>
                                          <Typography sx={{ margin:'12px 0', fontWeight:600 }}>
              Trailer 4
            </Typography>
                <Box sx={{ width:"100%" , height:'200px' , background:'url("https://i.ytimg.com/an_webp/NDkUy6sgFDw/mqdefault_6s.webp?du=3000&sqp=CIS9nJwG&rs=AOn4CLD1RNtze8HcUDEE_qq5DsUw1Ydo0w") no-repeat center' , backgroundSize:'cover'}} />
            <Box sx={{width:'150px' , height:'50px', margin:'0 auto' , background:'' , display:'flex'}}>
                    <Box sx={{flex:1 , display:'flex' , alignItems:'center' , justifyContent:'center'}}>
                        <DeleteIcon title="Delete" sx={{ color:'#eee' , cursor:'pointer' }} />
                    </Box>

                </Box>
            </Box>





          </Box>
                         <Paper sx={{ height:'350px',  display:'flex', flexDirection:'column' , alignItems:'center',justifyContent:'center' ,width:'100%' , padding:'21px' }}>
            <Box sx={{ display:'flex',flexDirection:'column' , alignItems:'center',justifyContent:'center' ,width:'100%' , height:'100%' , padding:'21px' , border:'1px dashed rgba(255,255,255,.3)' }} >
              
            <UploadIcon sx={{fontSize:"62px"}} />
             <Typography sx={{ margin:'8px 0', fontWeight:600 , fontSize:'21px' }}>
                            Upload Trailer.
                        </Typography> 
            </Box>
          </Paper>
                    </Grid>
                    <Grid item xs={6} sx={{ padding:'2.5rem' ,minHeight:'80vh', background:'' }}>
                        <Typography sx={{ margin:'8px 0', fontWeight:600 , fontSize:'42px' }}>
                            Enter Show Information.
                        </Typography>                        
                        <TextField sx={{ margin:'16px 0' }} value={props.show.Title} label="Show Name" fullWidth />
                        <TextField multiline rows={5} value={props.show.description} type="textarea" sx={{ margin:'16px 0' }} label="Show Description" fullWidth />
                        <TextField sx={{ margin:'16px 0' }} label="Target Points" fullWidth />
                   <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ "&:hover": { background: "red", color: "white" } }}

                    >
                      close
                    </Button>
                    <Button
                      type="submit"
                      color="success"
                      variant="outlined"
                      sx={{
                        "&:hover": {
                          backgroundColor: "darkgreen",
                          color: "white",
                        },
                      }}
                    >
                      create
                    </Button>
                  </Box>
                    </Grid>
                </Grid>
            </Box>
        </Drawer>
        )

}