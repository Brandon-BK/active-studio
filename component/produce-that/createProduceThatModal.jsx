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
import { useDropzone } from "react-dropzone";


const thumbsContainer = {
  display: "flex",
  flexDirection: "column",
  // flexWrap: "wrap",
  // marginTop: 5,
  width: "100%",
  height: "100%",
  // border: "4px dotted gray",
  borderRadius: "10px",
  justifyContent: "center",
  alignItems: "center",
  // padding: "20%",
  // overflow:'auto'
};

const thumb = {
  borderRadius: 2,
  // marginRight: 8,
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  borderRadius: "10px",
};

const thumbInner = {
  display: "flex",
  // minWidth: 0,
  width: "100%",
  height: "100%",
  // overflow:'auto'
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  // border: "1px solid white",
  // borderRadius: "10px",
};
const container = {
  backgroundImage: `url('https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-PNG-Photos.png')`,
  backgroundPosition: "center",
  backgroundSize: "70px 70px",
  backgroundRepeat: "no-repeat",
};

const absolute = {
  position: "absolute",
  background: "red",
};


export const CreateProduceThatModal = (props) => {
    const { openDrawer , setOpenDrawer } = props.actions
      const [files, setFiles] = React.useState([]);
  const handleCheck = (e) => {
    console.log(e.target.value);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg",
    onClick: (acceptedFiles) =>
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),

    // my drag and drop functionality
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        {<img src={file.preview} style={img} />}
        {}
      </div>
      {/* <div style={{margin:"10px 0"},absolute}>file name: {file.name} </div> */}
    </div>
  ));

  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);


    return(
        <Drawer anchor="bottom" open={openDrawer}>

        <Button onClick={()=>setOpenDrawer(false)} sx={{ position:'fixed', right:0 , padding:'16px 28px' }}><CloseIcon sx={{ fontSize:'42px' , color:'#eee'}} /></Button>

            <Box sx={{ height:'80vh' , padding:'1.5rem' , background:"#333" , overflowY:'scroll' }}>
                <Grid container>
                    <Grid item xs={6} sx={{ height:'70vh', background:'' }}>
                   <section className="container" style={container}>
      <Box {...getRootProps({ className: "dropzone" })} sx={{ border:'3px dotted white' , height:"60vh" }} >
        <input
          {...getInputProps()}
          onChange={() => {
            handleCheck;
          }}
        />
        <Box
          style={{
            height: "350px",
            width: "100%",
            padding: "0 0 0",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
        <div style={{ height: "100%", width: "100%", padding: "0 0 0 0" }}>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </div>
        </Box>
      </Box>
    </section>
                    </Grid>
                    <Grid item xs={6} sx={{ padding:'2.5rem' ,minHeight:'80vh', background:'' }}>
                        <Typography sx={{ margin:'8px 0', fontWeight:600 , fontSize:'42px' }}>
                            Enter Show Information.
                        </Typography>                        
                        <TextField sx={{ margin:'16px 0' }} label="Show Name" fullWidth />
                        <TextField multiline rows={5} type="textarea" sx={{ margin:'16px 0' }} label="Show Description" fullWidth />
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