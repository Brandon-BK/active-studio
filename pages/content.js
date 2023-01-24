import { Box } from "@mui/material";
import {withSnackbar} from 'notistack'

const Content = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
            }}
        >
            <h1>CONTENT</h1>
        </Box>
    );
}

export default withSnackbar(Content)