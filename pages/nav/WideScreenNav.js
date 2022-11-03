import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from 'next/router'

const WideScreenNav = () => {
    const router = useRouter()
    return (
        <>
            <Box
                sx={{
                    width: "78px",
                    height: "100%",
                    marginRight: "0.5rem !important",
                    minWidth: "unset",
                }}
            >
                <img
                    src="https://www.activetvonline.co.za/static/media/logo.718a6dab.png"
                    alt=""
                    style={{
                        height: "100%",
                        width: "100%",
                        padding: ".5rem 1rem",
                        cursor: 'pointer'
                    }}
                    onClick={() => router.push("/")}
                />
            </Box>

            <Box
                sx={{
                    height: "100%",
                    flex: 3,
                }}
            >

            </Box>

            <Box
                sx={{
                    flex: 1,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    pr: 2,
                }}
            >
                <Button
                    sx={{
                        border: "1px #fff transparent",
                        borderRadius: 0,
                        minWidth: "130px",
                        mr: "15px",
                        color: "#fff",
                    }}
                >
                    LOG IN
                </Button>

                <Button
                    sx={{
                        border: "1px #fff solid",
                        borderRadius: 0,
                        minWidth: "130px",
                        color: "#fff",
                    }}
                >
                    SIGN UP
                </Button>
            </Box>
        </>
    );
};

export default WideScreenNav
