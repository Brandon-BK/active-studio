import { Box, Select, MenuItem, Typography, Grid, Button } from "@mui/material";
import { useState } from "react";
import { ModalLoader } from "../loader";
export const CategoriesSort = () => {
  const [multiSelected, setMultiSelected] = useState("");
  const [sortedCategories, setSortedCategories] = useState({
    1: { option: "Popular Now", height: "S", width: "LG" },
    2: { option: "Latest Shows", height: "S", width: "LG" },
    3: { option: "Free To Watch", height: "S", width: "LG" },
    4: { option: "Active TV Originals", height: "S", width: "LG" },
    5: { option: "Featured Shows", height: "S", width: "LG" }
  });
  const [loading,setLoading] = useState(false)
  let sortedValues = Object.values(sortedCategories);
  let pop = 0;
  let lat = 0;
  let free = 0;
  let originals = 0;
  let featured = 0;

  const Categories = [
    "Popular Now",
    "Active TV Originals",
    "Free To Watch",
    "Latest Shows",
    "Featured Shows"
  ];

  const CategoriesSizes = ["S", "MD", "LG"];

  const handleConfirm = async () => {
    setLoading(true)
    sortedValues = Object.values(sortedCategories);

    sortedValues.map((item) => {
      console.log(item);
      if (item === "Popular Now") {
        pop++;
      } else if (item === "Latest Shows") {
        lat++;
      } else if (item === "Free To Watch") {
        free++;
      } else if (item === "Active TV Originals") {
        originals++;
      } else if (item === "Featured Shows") {
        featured++;
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
    if (featured > 1) {
      console.log("Featured Shows Selected Twice...");
      setMultiSelected("Featured Shows");
    }

    await setTimeout(() => {
      console.log('done')
    }, 15000)
    //setLoading(false)
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
      <ModalLoader loadingOnModal={loading} action = 'Uploading configuration' />
      <Typography sx={{ fontSize: "32px" }}>
        Sort Order of Categories
      </Typography>
      <Typography sx={{ fontSize: "18px", fontWeight: "600", margin: "8px 0" }}>
        Current Order of Categories
      </Typography>

      {sortedValues.map((item, index) => (
        <Typography key={index} sx={{ fontSize: "16px" }}>
          {index + 1 + "."} {item.option}
        </Typography>
      ))}

      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          lg={2.4}
          sx={{
            minHeight: "80px",
            background: "",
            padding: "6px 0px",
            margin: "18px 0"
          }}
        >
          <Typography sx={{ fontSize: "21px" }}>1st Category</Typography>
          <Select
            value={sortedCategories[1]["option"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {Categories.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({
                    ...sortedCategories,
                    1: { ...sortedCategories[1], option: item }
                  });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>

          <Typography sx={{ fontSize: "16px" }}>
            1st Category Width Size{" "}
          </Typography>
          <Select
            value={sortedCategories[1]["width"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {CategoriesSizes.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({
                    ...sortedCategories,
                    1: { ...sortedCategories[1], width: item }
                  });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>

          <Typography sx={{ fontSize: "16px" }}>
            1st Category Height Size
          </Typography>
          <Select
            value={sortedCategories[1]["height"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {CategoriesSizes.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({
                    ...sortedCategories,
                    1: { ...sortedCategories[1], height: item }
                  });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          lg={2.4}
          sx={{
            minHeight: "80px",
            background: "",
            padding: "6px 0px",
            margin: "18px 0"
          }}
        >
          <Typography sx={{ fontSize: "21px" }}>2nd Category</Typography>
          <Select
            value={sortedCategories[2]["option"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {Categories.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({
                    ...sortedCategories,
                    2: { ...sortedCategories[2], option: item }
                  });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>

          <Typography sx={{ fontSize: "16px" }}>
            2nd Category Width Size{" "}
          </Typography>
          <Select
            value={sortedCategories[2]["width"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {CategoriesSizes.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({
                    ...sortedCategories,
                    2: { ...sortedCategories[2], width: item }
                  });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>

          <Typography sx={{ fontSize: "16px" }}>
            2nd Category Height Size
          </Typography>
          <Select
            value={sortedCategories[2]["height"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {CategoriesSizes.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({
                    ...sortedCategories,
                    2: { ...sortedCategories[2], height: item }
                  });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          lg={2.4}
          sx={{
            minHeight: "80px",
            background: "",
            padding: "6px 0px",
            margin: "18px 0"
          }}
        >
          <Typography sx={{ fontSize: "21px" }}>3rd Category</Typography>
          <Select
            value={sortedCategories[3]["option"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {Categories.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({ ...sortedCategories, 3: item });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>

          <Typography sx={{ fontSize: "16px" }}>
            3rd Category Width Size{" "}
          </Typography>
          <Select
            value={sortedCategories[3]["width"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {CategoriesSizes.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({
                    ...sortedCategories,
                    3: { ...sortedCategories[3], width: item }
                  });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>

          <Typography sx={{ fontSize: "16px" }}>
            3rd Category Height Size
          </Typography>
          <Select
            value={sortedCategories[3]["height"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {CategoriesSizes.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({
                    ...sortedCategories,
                    3: { ...sortedCategories[3], height: item }
                  });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          lg={2.4}
          sx={{
            minHeight: "80px",
            background: "",
            padding: "6px 0px",
            margin: "18px 0"
          }}
        >
          <Typography sx={{ fontSize: "21px" }}>4th Category</Typography>
          <Select
            value={sortedCategories[4]["option"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {Categories.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({ ...sortedCategories, 4: item });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>

          <Typography sx={{ fontSize: "16px" }}>
            4th Category Width Size{" "}
          </Typography>
          <Select
            value={sortedCategories[4]["width"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {CategoriesSizes.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({
                    ...sortedCategories,
                    4: { ...sortedCategories[4], width: item }
                  });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>

          <Typography sx={{ fontSize: "16px" }}>
            4th Category Height Size
          </Typography>
          <Select
            value={sortedCategories[4]["height"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {CategoriesSizes.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({
                    ...sortedCategories,
                    4: { ...sortedCategories[4], height: item }
                  });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          lg={2.4}
          sx={{
            minHeight: "80px",
            background: "",
            padding: "6px 0px",
            margin: "18px 0"
          }}
        >
          <Typography sx={{ fontSize: "21px" }}>5th Category</Typography>
          <Select
            value={sortedCategories[5]["option"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {Categories.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({ ...sortedCategories, 5: item });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>

          <Typography sx={{ fontSize: "16px" }}>
            5th Category Width Size{" "}
          </Typography>
          <Select
            value={sortedCategories[5]["width"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {CategoriesSizes.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({
                    ...sortedCategories,
                    5: { ...sortedCategories[5], width: item }
                  });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>

          <Typography sx={{ fontSize: "16px" }}>
            5th Category Height Size
          </Typography>
          <Select
            value={sortedCategories[5]["height"]}
            sx={{ width: "90%", margin: "8px 0" }}
          >
            {CategoriesSizes.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                onClick={() => {
                  setSortedCategories({
                    ...sortedCategories,
                    5: { ...sortedCategories[5], height: item }
                  });
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            minHeight: "80px",
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
