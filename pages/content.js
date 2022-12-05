import { Box } from "@mui/material";
import withAdminNav from "./../component/hoc/withAdminNav";

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

export default withAdminNav(Content)