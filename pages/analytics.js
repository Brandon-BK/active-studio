import { Box } from "@mui/material";
import withAdminNav from "./hoc/withAdminNav";

const Analytics = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
            }}
        >
            <h1>ANALYTICS</h1>
        </Box>
    );
}

export default withAdminNav(Analytics)