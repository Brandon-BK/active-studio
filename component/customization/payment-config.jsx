import {
  Box,
  Select,
  MenuItem,
  Typography,
  Grid,
  Button,
  Paper,
  Stack
} from "@mui/material";
import axios from "axios";
import { useState, useContext, useEffect, useRef } from "react";
import { API_INSTANCE } from "../../app-config/index.";
import { AppConfigContext } from "../context/AppConfigContext";
import { Edit } from "@mui/icons-material";

export const PaymentConfig = () => {
  const { configuration, setConfiguration } = useContext(AppConfigContext);
  const [edit, setEdit] = useState(false);
  const { paymentConfiguation } = configuration;
  const [paymentConfigData, setPaymentConfigData] =
    useState(paymentConfiguation);

  const priceInput0 = useRef(null);
  const priceInput1 = useRef(null);
  const handleEditPrice = (priceInput) => {
    // alert("clicked");
    priceInput.current.focus();
  };

  const handleInputChange = (e, subscriptionType, index,fieldChanging) => {
    console.log("Changed Value")
    if (subscriptionType === "Monthly") {
      let newArr = [...paymentConfigData];
      newArr[index][fieldChanging] = Number(e.target.value);
      // console.log(newArr)
      setConfiguration({...configuration ,
        paymentConfiguation: newArr})
        // console.log(configuration)
    }

    if (subscriptionType === "Annually") {
      let newArr = [...paymentConfigData];
      newArr[index][fieldChanging] = Number(e.target.value);
      // console.log(newArr)
      setConfiguration({...configuration ,
        paymentConfiguation: newArr})
        // console.log(configuration)
      }

  };

  const handleConfirm = async () => {
    const postRes = await axios.post(`${API_INSTANCE}/post-config/12`);
    const putConfig = await axios.put(postRes.data.configJson , JSON.stringify(configuration))
    console.log(postRes)
    console.log(putConfig)
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Grid container spacing={6}>
        {paymentConfigData.map((paymentItem, index) => {
          return (
            <Grid
              key={paymentItem.subscriptionType + index}
              item
              xs={12}
              lg={6}
            >
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: "70%",
                  margin: "0 auto",
                  height: "450px",
                  background: "",
                  padding: "12px 0"
                }}
              >
                <Box
                  onClick={() =>
                    handleEditPrice(
                      paymentItem.subscriptionType === "Monthly"
                        ? priceInput0
                        : priceInput1
                    )
                  }
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "",
                    padding: "12px",
                    "&:hover":{
                      filter:'invert(1)'
                    }
                  }}
                >
                  <Edit />
                </Box>
                {paymentItem.subscriptionType === "Monthly" ? (
                  <img
                    style={{ width: "120px", objectFit: "contain" }}
                    src="https://cdn-icons-png.flaticon.com/512/2413/2413871.png"
                    alt=""
                  />
                ) : (
                  <img
                    style={{ width: "120px", objectFit: "contain" }}
                    src="https://cdn-icons-png.flaticon.com/512/2413/2413876.png"
                    alt=""
                  />
                )}
                <Typography sx={{ fontSize: "40px", fontWeight: "600" }}>
                  {paymentItem.subscriptionType}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{ fontSize: "18px",textAlign:"right", fontWeight: "300", width: "100%" }}
                  >
                    Plan Prices :
                  </Typography>
                  <input
                    ref={
                      paymentItem.subscriptionType === "Monthly"
                        ? priceInput0
                        : priceInput1
                    }
                    disabled={edit}
                    type="number"
                    style={{
                      height: "fit-content",
                      width: "80%",
                      background: "transparent",
                      display: "flex",
                      alignItems: "center",
                      textAlign:'left',
                      padding: "10px ",
                      // margin:'0 auto',
                      fontSize: "18px",
                      color: "white",
                      border: "none"
                    }}
                    value={paymentItem.price}
                    placeholder="Number of Banners Displayed"
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        paymentItem.subscriptionType,
                        index,
                        "price"
                      )
                    }
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{ fontSize: "16px",textAlign:"right", fontWeight: "300", width: "100%" }}
                  >
                    Plan Produce That! Points :
                  </Typography>
                  <input
                    disabled={edit}
                    type="number"
                    style={{
                      height: "fit-content",
                      width: "80%",
                      background: "transparent",
                      display: "flex",
                      alignItems: "center",
                      textAlign:'left',
                      padding: "10px ",
                      // margin:'0 auto',
                      fontSize: "18px",
                      color: "white",
                      border: "none"
                    }}
                    value={paymentItem.pTPoints}
                    placeholder="Number of Banners Displayed"
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        paymentItem.subscriptionType,
                        index,
                        "pTPoints"
                      )
                    }
                  />
                </Box>
              </Paper>
            </Grid>
          );
        })}
        <Grid item xs={12} sx={{ display:'flex' , justifyContent:'flex-end' }}>
          <Box sx={{ width:{ xs:"100%" , lg:'30%'} , padding:{xs:'12px 32px' , lg:"0 32px"} }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              margin: "8px 0"
            }}
          >
            <Button
              sx={{
                padding: "12px 10px",
                margin: "0 8px",
                color: "red",
                border: "1px solid red",
                "&:hover": {
                  background: "red",
                  color: "#000",
                  border: "1px solid transparent"
                }
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              sx={{
                padding: "12px 10px",
                margin: "0 8px",
                color: "green",
                border: "1px solid green",
                "&:hover": {
                  background: "green",
                  color: "#000",
                  border: "1px solid transparent"
                }
              }}
            >
              Confirm
            </Button>
          </Box>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
};
