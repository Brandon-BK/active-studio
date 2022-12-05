import { Box } from "@mui/material";
import withAdminNav from "./../component/hoc/withAdminNav";



const Greenlight = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
            }}
        >
            <h1>GREENLIGHT</h1>
        </Box>
    );
}

export default withAdminNav(Greenlight)
