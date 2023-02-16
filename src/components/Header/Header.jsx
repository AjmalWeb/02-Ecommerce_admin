import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const { userDetails } = useSelector((state) => state.userDetailsReducer);
  // console.log(userDetails, "::::usedetails");

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: "10px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Manrope, sans-serif",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "28px",
              lineHeight: "38px",
              color: "#8D8D8D",
              marginRight: "10px",
            }}
          >
            Good Morning,
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Manrope, sans-serif",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "28px",
              lineHeight: "38px",
              color: "#000",
              textTransform: "capitalize",
            }}
          >
            {userDetails.name.toLowerCase()}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: "Manrope, sans-serif",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "16px",
              lineHeight: "22px",
              color: "#8D8D8D",
              marginBottom: 0,
            }}
          >
            Your performance summary this week
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Header;
