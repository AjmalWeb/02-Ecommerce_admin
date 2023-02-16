import React, { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sidebar from "../components/Sidebar/Sidebar";
// import Header from "../components/Header/Header";
import Navbar from "../components/Header/Navbar";


const MainLayout = (props) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div style={{ transition: "all 250ms ease-in-out" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          // width: "100%",
          transition: "all 250ms ease-in-out",
        }}
      >
        <Sidebar sidebar={sidebar} showSidebar={showSidebar} />
        <Box
          sx={{
            width: "100%",
            // backgroundColor: "gray",
            transition: "all 250ms ease-in-out",
          }}
        >
          <Navbar />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
          {props.children}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default MainLayout;;
