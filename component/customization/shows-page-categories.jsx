import { Box, Select, MenuItem, Typography, Grid, Button,TextField } from "@mui/material";
import axios from "axios";
import { useState, useContext , useEffect } from "react";
import { API_INSTANCE } from "../../app-config";
import { AppConfigContext } from "../context/AppConfigContext";
import { ModalLoader } from "../loader";

export const ShowsPageCategories = ({configuration, setConfiguration }) => {
  

  const { sortCategories, ShowsCatergorySizeAndType } = configuration;
  const [multiSelected, setMultiSelected] = useState("");
  const [sizeAndTypeCategories, setSizeAndTypeCategories] = useState(ShowsCatergorySizeAndType);

  
  let sortedValues = Object.values(sizeAndTypeCategories);
  // console.log(setCatergorySizeAndType);
  let pop = 0;
  let lat = 0;
  let free = 0;
  let originals = 0;
  let Favourites = 0;

  const CategoriesOptions = ShowsCatergorySizeAndType.map((item)=>item.categoryName)

  useEffect(()=>{
    setConfiguration({...configuration , ShowsCatergorySizeAndType:sizeAndTypeCategories });
    console.log(configuration)
  },[sizeAndTypeCategories]);


  const CategoriesSizes = ["SM", "MD", "LG"];

  const [loading,setLoading] = useState(false)
  const handleConfirm = async () => {
    setLoading(true)
    sortedValues = Object.values(sizeAndTypeCategories);

    sortedValues.map((item) => {
      // console.log(item);
      if (item.categoryName === "Popular Now") {
        pop++;
      } else if (item.categoryName === "Latest Shows") {
        lat++;
      } else if (item.categoryName === "Free To Watch") {
        free++;
      } else if (item.categoryName === "Active TV Originals") {
        originals++;
      } else if (item.categoryName === "Favourites") {
        Favourites++;
      }
    });

    if (pop > 1) {
      console.log("Popular Now Selected Twice...");
      setMultiSelected("Popular Shows");
    }
    if (free > 1) {
      console.log("Free Now Selected Twice...");
      setMultiSelected("Free To Watch");
    }
    if (lat > 1) {
      console.log("Latest Shows Selected Twice...");
      setMultiSelected("Latest Shows");
    }
    if (originals > 1) {
      console.log("Active TV Originals Selected Twice...");
      setMultiSelected("Active TV Originals");
    }
    if (Favourites > 1) {
      console.log("Favourites Selected Twice...");
      setMultiSelected("Favourites");
    }

    if(pop , lat , free , originals , Favourites === 1){
      try{
        const postRes = await axios.post(`${API_INSTANCE}/post-config/12`);
      const putConfig = await axios.put(postRes.data.configJson , JSON.stringify(configuration))
      console.log(postRes)
      console.log(putConfig)
      }catch(err){
        setLoading(false)
        console.log('config error',err)
      }
    }
    setLoading(false)
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "8px 32px"
      }}
    >
      <ModalLoader
       loadingOnModal={loading}
        action = 'UPDATING'
        height='100%'
        bottom = '10%'
        right = '-5%' 
        />
      <Typography sx={{ fontSize: "32px" }}>
        Sort Order of Categories
      </Typography>
      <Typography sx={{ fontSize: "18px", fontWeight: "600", margin: "8px 0" }}>
        Current Order of Categories
      </Typography>

      {CategoriesOptions.map((item, index) => (
        <Typography key={index} sx={{ fontSize: "16px" }}>
          {index + 1 + "."} {item}
        </Typography>
      ))}

      <Grid container>
        {sizeAndTypeCategories.map((item, sizeAndTypeIndex) => {
          let iterationText = "";
          let formattedIndex = sizeAndTypeIndex + 1;
          if (sizeAndTypeIndex + 1 === 1) iterationText = "1st";
          if (sizeAndTypeIndex + 1 === 2) iterationText = "2nd";
          if (sizeAndTypeIndex + 1 === 3) iterationText = "3rd";
          if (sizeAndTypeIndex + 1 > 3){
            iterationText = `${sizeAndTypeIndex+1}th`;
          } 
          


          // console.log(item);
          return (
            <Grid key={sizeAndTypeIndex} item xs={12} md={6} lg={4} sx={{       margin:'21px 0' ,     minHeight: "80px",
          }}>
            
              <Typography sx={{ fontSize: "21px" }}>
                {iterationText} Category
              </Typography>
              <Typography
                sx={{ width: "90%", margin: "12px 0" ,color : '#6082B6',fontSize:'20px',fontWeight:'700'}}
                >
                {item.categoryName}
                {/* {CategoriesOptions.map((newCategory, index) => (
                  <MenuItem
                  key={index}
                  value={newCategory}
                  onClick={() => {
                    let newArr = [...sizeAndTypeCategories];
                    newArr[sizeAndTypeIndex]["categoryName"] = newCategory;
                    setSizeAndTypeCategories(newArr)
                    }}
                  >
                    {newCategory}
                  </MenuItem>
                ))} */}
              </Typography>

              <Typography sx={{ fontSize: "16px" }}>
                {iterationText} Category Height Size
              </Typography>
              <Select
                value={item.height.toUpperCase()}
                sx={{ width: "90%", margin: "8px 0" }}
              >
                {CategoriesSizes.map((heightSize, index) => (
                 <MenuItem
                 key={index}
                 value={heightSize}
                 onClick={() => {
                   let newArr = [...sizeAndTypeCategories];
                   newArr[sizeAndTypeIndex]["height"] = heightSize;
                   setSizeAndTypeCategories(newArr);
                 }}
               >
                 {heightSize}
               </MenuItem>
                ))}
              </Select>
              <Typography sx={{ fontSize: "16px" }}>
                {iterationText} Category width Size
              </Typography>
              <Select
                value={item.width.toUpperCase()}
                sx={{ width: "90%", margin: "8px 0" }}
              >
                {CategoriesSizes.map((widthSize, index) => (
                  <MenuItem
                  key={index}
                  value={widthSize}
                  onClick={() => {
                    let newArr = [...sizeAndTypeCategories];
                    newArr[sizeAndTypeIndex]["width"] = widthSize;
                    setSizeAndTypeCategories(newArr);
                  }}
                >
                  {widthSize}
                </MenuItem>
                ))}
              </Select>
            </Grid>
          );
        })}
        <Grid
          item
          xs={12}
          sx={{
            minHeight: "100%",
            background: "",
            padding: "6px 32px",
            margin: "18px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <Typography sx={{ fontSize: "21px", color: "transparent" }}>
            5th Category
          </Typography>
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
        </Grid>
      </Grid>
    </Box>
  );
};
