import React, { useState } from "react";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { profileData } from "./ProfileData";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { InsertEmoticon } from "@mui/icons-material";
import profile from "../../assets/images/Profile.png";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import LiveHelpRoundedIcon from "@mui/icons-material/LiveHelpRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/reducers/login_slice";
import {authApi } from "../../hooks/axios_api";
import { updateUserDetailsOnOut } from "../../redux/reducers/userDetails";

const UserLink = styled(Link)`
  margin-bottom: 0;
  padding: 5px 25px;
  cursor: pointer;
  border-bottom: 1px solid #dee2e6;
  line-height: 1;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: start;
  // fontSize: 10px;
  font-weight: 400;
  gap: 10px;
  font-size: 0.875rem;
  color: #1f1f1f;
`;

const headingFont = createTheme({
  typography: {
    fontFamily: ["Cormorant", "serif"].join(","),
  },
});

function Profilediv({ handleprofileDiv }) {
  const { loginStatus } = useSelector((state) => state.loginActions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.userDetailsReducer);

  const handleLogout = async () => {
    const url = "auth/logout";
    try {
      await authApi
        .get(url)
        .then((res) => {
          console.log("logout res:::", res.data);
          handleprofileDiv();
          dispatch(logOut());
          dispatch(updateUserDetailsOnOut());
          navigate('/login')
        })
        .catch((err) => {
          console.log("logout error::::", err.response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={headingFont}>
      <Box
        sx={{
          // minWidth: "10rem",
          backgroundColor: "greeen",
          position: "absolute",
          right: "10px",
          top: "90px",
          backgroundColor: "#fff",
          minWidth: "14rem",
          paddingTop: "0.6rem",
          paddingBottom: "0.6rem",
          zIndex: "1000",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: "0.25rem",
          transition: "all 50ms ease-in-out",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar alt="Travis Howard" src={profile} />
          <Typography
            sx={{
              fontSize: "0.812rem",
              margin: "1rem 0 0.5rem 0",
              lineHeight: "1.3rem",
            }}
          >
            {" "}
            {userDetails.name}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.812rem",
              marginBottom: "0.5rem",
              lineHeight: "1.3rem",
              fontWeight: "300",
              color: "#737F8B",
            }}
          >
            {" "}
            {userDetails.email}
          </Typography>
        </Box>
        <Box>
          <Box onClick={handleprofileDiv} sx={{ padding: "0rem 1rem" }}>
            <UserLink to="/profile">
              <PermIdentityOutlinedIcon sx={{ color: "#1F3BB3" }} /> My Profile{" "}
            </UserLink>
          </Box>
          <Box onClick={handleprofileDiv} sx={{ padding: "0rem 1rem" }}>
            <UserLink to="/messages">
              <MessageOutlinedIcon sx={{ color: "#1F3BB3" }} /> Messages{" "}
            </UserLink>
          </Box>
          <Box onClick={handleprofileDiv} sx={{ padding: "0rem 1rem" }}>
            <UserLink to="/activity">
              <FactCheckOutlinedIcon sx={{ color: "#1F3BB3" }} /> Activity{" "}
            </UserLink>
          </Box>
          <Box onClick={handleprofileDiv} sx={{ padding: "0rem 1rem" }}>
            <UserLink to="/faq">
              <LiveHelpRoundedIcon sx={{ color: "#1F3BB3" }} /> FAQ{" "}
            </UserLink>
          </Box>
          <Box onClick={handleLogout} sx={{ padding: "0rem 1rem" }}>
            <UserLink >
              <PowerSettingsNewRoundedIcon sx={{ color: "#1F3BB3" }} /> Sign out{" "}
            </UserLink>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Profilediv;
