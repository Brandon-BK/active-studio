import React from 'react';
import {Box,Button,Dialog} from '@mui/material'
function InfoModal (props){
    const {open,setOpen}= props
    console.log(open)
    return(
        <Dialog open = {open} onClose={()=>setOpen(false)} >
            <Box>
                <Button onClick={()=>setOpen(false)}>Close</Button>
            </Box>
        </Dialog>
    )
};

export default InfoModal