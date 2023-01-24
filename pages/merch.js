import { Box } from "@mui/material";
import {withSnackbar} from 'notistack'

const Merch = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
            }}
        >
            <h1>MERCH</h1>
        </Box>
    );
}

export default withSnackbar(Merch)
