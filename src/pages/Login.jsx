import React, { useState, useEffect } from "react";
import { authApi } from "../hooks/axios_api";
import {
  Box,
  Typography,
  Button,
  Divider,
  Snackbar,
  Alert,
  Fade,
} from "@mui/material";

import loginbg from "../assets/images/loginbg.jpg";
import textBg from "../assets/images/textBg.svg";
import logo from "../assets/images/logo.png";
import { Email, Lock } from "@mui/icons-material";
import google from "../assets/images/google.svg";
import { Link, useNavigate } from "react-router-dom";
import CustomInputBox from "../components/customInputBox/CustomInputBox";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from "../redux/reducers/login_slice";
import { updateUserDetailsOnIn } from "../redux/reducers/userDetails";

const Login = () => {
  const { userDetails } = useSelector((state) => state.userDetailsReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    open: false,
    status: false,
    errorStatus: {
      email: false,
      password: false,
    },
    errorFields: {
      email: "",
      password: "",
      open: "",
    },
  });

  let horizontal = matches ? "center" : "left";
  let vertical = matches ? "top" : "bottom";

  const closeSnackbar = () => {
    setState((prev) => ({
      ...prev,
      open: false,
      errorFields: {
        ...prev.errorFields,
        open: "",
      },
    }));
  };

  useEffect(() => {
    //console.log(state)
  }, [state]);

  const onChangeEvent = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    const { email, password } = state;

    const formData = {
      email: email,
      password: password,
    };

    if (formValidation(formData)) {
      setLoading(true);
      signIn(formData);
    }
  };

  async function signIn(values) {
    try {
      let password = values.password;
      let email = values.email;
      // console.log(values)
      const url = "auth/signin";
      const data = { email, password };
      await authApi
        .post(url, data)
        .then((res) => {
          console.log("res::::", res.data);
          const user = res.data.user;
          console.log("user:::", user);
          const { name, email, role } = user;
          setLoading(false);
          dispatch(logIn());
          dispatch(updateUserDetailsOnIn(user));
          const userRole = user.role;
          if (userRole === "admin") {
            navigate("/DashboardHome");
          } else if (userRole === "user") {
            navigate("/UserHome");
          }
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            setState((prev) => ({
              ...prev,
              open: true,
              status: false,
              errorFields: {
                ...prev.errorFields,
                open: error.response.data.msg,
                // "Email already used"
              },
            }));
            console.log("error on signining in :: ", error.response.data);
          } else {
            console.log("signin eroor", error.message);
          }
          setLoading(false);
        });
    } catch (error) {
      console.log("error on signining in 2 try :: ", error);
      setLoading(false);
    }
  }

  const formValidation = (data) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    let isvalid = true;

    Object.keys(data).map((itemKey) => {
      if (itemKey === "email") {
        if (data[itemKey].trim().length <= 0) {
          isvalid = false;
          setState((prev) => ({
            ...prev,
            errorStatus: {
              ...prev.errorStatus,
              [itemKey]: true,
            },
            errorFields: {
              ...prev.errorFields,
              [itemKey]: "Email is required",
            },
          }));
        } else if (!regex.test(data[itemKey])) {
          isvalid = false;
          setState((prev) => ({
            ...prev,
            errorStatus: {
              ...prev.errorStatus,
              [itemKey]: true,
            },
            errorFields: {
              ...prev.errorFields,
              [itemKey]: "Invalid email address",
            },
          }));
        } else {
          isvalid = true;
          setState((prev) => ({
            ...prev,
            errorStatus: {
              ...prev.errorStatus,
              [itemKey]: false,
            },
            errorFields: {
              ...prev.errorFields,
              [itemKey]: "",
            },
          }));
        }
      }

      if (itemKey === "password") {
        if (data[itemKey].trim().length <= 0) {
          isvalid = false;
          setState((prev) => ({
            ...prev,
            errorStatus: {
              ...prev.errorStatus,
              [itemKey]: true,
            },
            errorFields: {
              ...prev.errorFields,
              [itemKey]: "Password is required",
            },
          }));
        } else if (
          data[itemKey].trim().length > 0 &&
          data[itemKey].trim().length < 4
        ) {
          isvalid = false;
          setState((prev) => ({
            ...prev,
            errorStatus: {
              ...prev.errorStatus,
              [itemKey]: true,
            },
            errorFields: {
              ...prev.errorFields,
              [itemKey]: "Please enter atleast 4 digits",
            },
          }));
        } else {
          setState((prev) => ({
            ...prev,
            errorStatus: {
              ...prev.errorStatus,
              [itemKey]: false,
            },
            errorFields: {
              ...prev.errorFields,
              [itemKey]: "",
            },
          }));
        }
      }
    });

    return isvalid;
  };

  return (
    <Fade in={true}>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          alignItems: {
            xs: "center",
            md: "normal",
          },
          justifyContent: {
            xs: "center",
            md: "normal",
          },
          backgroundImage: {
            xs: `url(${loginbg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            md: "none",
          },
          width: "100%",
          minHeight: "100vh",
          padding: {
            xs: "20px 20px",
            sm: "30px 40px",
            md: "0px 0px",
          },
          boxSizing: "border-box",
        }}
      >
        {!matches ? (
          <Box
            sx={{
              // flex : 1,
              backgroundImage: `url(${loginbg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right",
              width: "55%",
              height: "100vh",
              display: "flex",
              // justifyContent : "center",
              alignItems: "center",
              paddingLeft: "60px",
              paddingRight: "60px",
            }}
          >
            <Box
              sx={{
                height: {
                  md: "290px",
                  lg: "270px",
                },
                width: "100%",
                // backgroundImage: `url(${textBg})`,
                // backgroundSize: "auto 100%",
                // backgroundRepeat: "no-repeat",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 50,
                  top: 35,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    marginBottom: "15px",
                  }}
                >
                  Welcome to{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "yellow",
                    }}
                  >
                    MAAANG
                  </span>
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,.5)",
                    marginBottom: "30px",
                  }}
                >
                  MAAANG is the trading of goods and services on the internet.
                  It is your bustling city center or brick-and-mortar shop
                  translated into zeroes and ones on the internet superhighway.
                  cloud.
                </Typography>

                <Box
                  sx={{
                    backgroundColor: "primary.main",
                    maxWidth: "240px",
                    padding: "12px 15px",
                    textAlign: "center",
                    borderRadius: "20px",
                    margin: {
                      xs: "0px auto",
                      md: "0px",
                    },
                  }}
                >
                  <Link
                    component="Typography"
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                    }}
                    to="/signup"
                  >
                    Click Here To Create an Account
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: {
                xs: "90%",
                sm: "80%",
                md: "45%",
                lg: "45%",
              },
              marginBottom: {
                xs: "30px",
                sm: "60px",
                md: "0px",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "white",
                marginBottom: "15px",
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              Welcome to small{" "}
              <span style={{ fontWeight: "bold", color: "yellow" }}>
                MAAANG
              </span>
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,.5)",
                marginBottom: "15px",
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              MAAANG is the trading of goods and services on the internet. It is
              your bustling city center or brick-and-mortar shop translated into
              zeroes and ones on the internet superhighway.
            </Typography>

            <Box
              sx={{
                backgroundColor: "primary.main",
                maxWidth: "240px",
                padding: "12px 15px",
                textAlign: "center",
                borderRadius: "20px",
                margin: {
                  xs: "0px auto",
                  md: "0px",
                },
              }}
            >
              <Link
                component="Typography"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                }}
                to="/signup"
              >
                Click Here To Create an Account
              </Link>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // justifyContent : "center",
            width: {
              xs: "90%",
              sm: "80%",
              md: "45%",
              lg: "45%",
            },
            paddingLeft: {
              xs: "0px",
              md: "30px",
            },
            paddingRight: {
              xs: "0px",
              md: "30px",
            },
          }}
        >
          {/* Toast */}
          <Snackbar
            open={state.open}
            autoHideDuration={6000}
            anchorOrigin={{ horizontal, vertical }}
            onClose={closeSnackbar}
          >
            <Alert
              onClose={closeSnackbar}
              variant="filled"
              severity="error"
              sx={{ width: "100%" }}
            >
              {state.errorFields.open}
            </Alert>
          </Snackbar>

          <Box
            sx={{
              width: "100%",
              boxShadow: "0 5px 15px rgb(0, 0, 0 , 5%)",
              padding: "40px",
              backgroundColor: {
                xs: "#fff",
                md: "transparent",
              },
              borderRadius: "15px",
            }}
          >
            <Box sx={{ textAlign: "center", marginBottom: "60px" }}>
              <img style={{ maxWidth: "170px" }} src={logo} />
            </Box>

            <CustomInputBox
              name="email"
              placeholder="Email"
              type="email"
              autoFocus={true}
              onChange={onChangeEvent}
              state={state}
              icon={
                <Email
                  sx={{
                    color:
                      state.errorStatus.email === true
                        ? "danger.main"
                        : "#8a8787",
                  }}
                  className="icon"
                />
              }
            />

            <CustomInputBox
              name="password"
              placeholder="Password"
              type="password"
              autoFocus={false}
              onChange={onChangeEvent}
              state={state}
              icon={
                <Lock
                  sx={{
                    color:
                      state.errorStatus.password === true
                        ? "danger.main"
                        : "#8a8787",
                  }}
                  className="icon"
                />
              }
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  fontWeight: "500",
                  color: "#000",
                }}
                to="/forgotpassword"
              >
                Forgot Password ?
              </Link>

              <LoadingButton
                loading={loading}
                disableRipple={true}
                variant="contained"
                onClick={(event) => handleFormSubmission(event)}
              >
                Login
              </LoadingButton>
            </Box>

            <Box sx={{ marginBottom: "20px" }}>
              <Box sx={{ width: "100%" }}>
                <Divider></Divider>
              </Box>
              <Box
                sx={{
                  backgroundColor: "white",
                  marginTop: "-12px",
                  marginLeft: "50%",
                  width: "45px",
                  textAlign: "center",
                }}
              >
                <Typography color="rgba(0, 0, 0, 0.12)">or</Typography>
              </Box>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Button
                disableRipple={true}
                variant="outlined"
                onClick={() => alert("Feature coming soon")}
                startIcon={<img style={{ width: "30px" }} src={google} />}
              >
                Continue with google
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default Login;
