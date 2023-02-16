import React, { useState } from "react";
import {authApi } from "../hooks/axios_api";
import {
  Box,
  Button,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
  Fade,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import loginbg from "../assets/images/loginbg.jpg";
import textBg from "../assets/images/textBg.svg";
import logo from "../assets/images/logo.png";
import google from "../assets/images/google.svg";
import CustomInputBox from "../components/customInputBox/CustomInputBox";
import { Lock, Phone, Email, AccountCircle } from "@mui/icons-material";
// import { Auth } from "aws-amplify";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Signup = () => {
  let navigate = useNavigate();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    open: false,
    status: false,
    confirmPassword: "",
    errorStatus: {
      name: false,
      phone: false,
      email: false,
      password: false,
      confirmPassword: false,
    },
    errorFields: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      open: "",
    },
  });

  const [termsStatus, setTermsStatus] = useState(false);
  const [isAcceptTerms, setIsAcceptTerms] = useState(true);

  let horizontal = matches ? "center" : "left";
  let vertical = matches ? "top" : "bottom";

  const closeSnackbar = () => {
    setState((prev) => ({
      ...prev,
      open: false,
      status: false,
      errorFields: {
        ...prev.errorFields,
        open: "",
      },
    }));
  };

  const onChangeEvent = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleForSubmission = async (event) => {
    const { name, phone, email, password, confirmPassword } = state;
    const formData = {
      name,
      phone,
      email,
      password,
      confirmPassword,
      termsStatus,
    };
    if (formValidation(formData)) {
      if (formData.termsStatus) {
        setLoading(true);
        setIsAcceptTerms(true);
        signingUp(formData);
      } else {
        setIsAcceptTerms(false);
      }
    }
  };

  async function signingUp(values) {
    try {
      let fullname = values.name;
      let password = values.password;
      let email = values.email;
      let phone = values.phone ? "+" + values.phone : "";
      // console.log(values)
      const url = "auth/signup";
      const data = { email, password, fullname, phone };
      await authApi
        .post(url, data)
        .then((res) => {
          console.log("res::::", res.data);
          // setState( (prev) => ({
          //        ...prev,
          //        open:true,
          //        status:true,
          //        errorFields : {
          //            ...prev.errorFields,
          //            open : "User registered successfully"
          //        }
          //    }))
          const user = res.data.user;
          console.log("user:::", user);
          setLoading(false);
          navigate("/login");
        })
        .catch((error) => {
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
          setLoading(false);
        });
    } catch (error) {
      console.log("error on signining in 2 try :: ", error.response.data);
      setLoading(false);
    }
  }

  // async function signingUp(values) {
  //     try {

  //       let username = values.email;
  //       let password = values.password;
  //       let email = values.email;
  //       let name = values.name;
  //       let phone_number = values.phone ? "+" + values.phone : "";

  //       console.log(values)

  //       await Auth.signUp({
  //         username,
  //         password,
  //         attributes: {
  //           name,
  //           email,
  //           phone_number, // optional - E.164 number convention
  //           // other custom attributes
  //         },
  //       })
  //         .then((user) => {
  //             setState( (prev) => ({
  //                 ...prev,
  //                 open:false,
  //                 errorFields : {
  //                     ...prev.errorFields,
  //                     open : ''
  //                 }
  //             }))
  //             navigate("/confirmsignup", { state: {email: email, password: password} });
  //             setLoading(false)
  //         }
  //         )
  //         .catch((error) => {
  //             if(error.code==='UsernameExistsException'){
  //                 console.log('done');
  //                 setState( (prev) => ({
  //                     ...prev,
  //                     open:true,
  //                     errorFields : {
  //                         ...prev.errorFields,
  //                         open : error.message
  //                     }
  //                 }))
  //             }
  //             console.log("error on signining in :: ", error)
  //             setLoading(false)
  //         }
  //         );

  //     } catch (error) {
  //         console.log("error on signining in 2 try :: ", error);
  //         setLoading(false)
  //     }
  //   }

  const formValidation = (data) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const phoneRegex =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    const passwprdRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`])\S{8,99}$/;
    let isvalid = true;

    Object.keys(data).map((itemKey) => {
      if (itemKey === "name") {
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
              [itemKey]: "User name is required",
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

      if (itemKey === "phone") {
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
              [itemKey]: "Phone number is required",
            },
          }));
        } else if (!phoneRegex.test(data[itemKey])) {
          isvalid = false;
          setState((prev) => ({
            ...prev,
            errorStatus: {
              ...prev.errorStatus,
              [itemKey]: true,
            },
            errorFields: {
              ...prev.errorFields,
              [itemKey]: "Invalid Phone Number",
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
        } else if (!passwprdRegex.test(data[itemKey])) {
          isvalid = false;
          setState((prev) => ({
            ...prev,
            errorStatus: {
              ...prev.errorStatus,
              [itemKey]: true,
            },
            errorFields: {
              ...prev.errorFields,
              [itemKey]:
                "Password Requires atleast one lowercase and uppercase letters,numbers and special characters, Whitespace not allowed and Minimum 8 characters, maximum 99 characters",
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

      if (itemKey === "confirmPassword") {
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
        } else if (data["password"] !== data[itemKey]) {
          isvalid = false;
          setState((prev) => ({
            ...prev,
            errorStatus: {
              ...prev.errorStatus,
              [itemKey]: true,
            },
            errorFields: {
              ...prev.errorFields,
              [itemKey]: "Password not matching",
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
          // border:!matches?'20px solid black ':'none',
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
              minHeight: "100vh",
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
                  sx={{ color: "white", marginBottom: "15px" }}
                >
                  Welcome to{" "}
                  <span style={{ fontWeight: "bold", color: "yellow" }}>
                    MAAANG
                  </span>
                </Typography>

                <Typography
                  sx={{ color: "rgba(255,255,255,.5)", marginBottom: "15px" }}
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
                    style={{ textDecoration: "none", color: "#fff" }}
                    to="/login"
                  >
                    Login to Access Dashboard
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
                marginBottom: "30px",
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
                padding: "5px 15px",
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
                style={{ textDecoration: "none", color: "#fff" }}
                to="/login"
              >
                Login to Access Dashboard
              </Link>
            </Box>
          </Box>
        )}

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
            severity={state.status ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {state.errorFields.open}
          </Alert>
        </Snackbar>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
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
            paddingTop: {
              xs: "0px",
              md: "30px",
            },
            paddingBottom: {
              xs: "0px",
              md: "30px",
            },
          }}
        >
          {/* Toast */}
          {/*       <Snackbar
            open={state.open}
            autoHideDuration={6000}
            anchorOrigin={{ horizontal, vertical }}
            onClose={closeSnackbar}
          >
            <Alert
              onClose={closeSnackbar}
              variant="filled"
               severity={state.status?"success":"error"}
              sx={{ width: "100%" }}
            >
              {state.errorFields.open}
            </Alert>
          </Snackbar>*/}

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
              name="name"
              placeholder="Company Admin (Full Name)"
              type="text"
              autoFocus={true}
              onChange={onChangeEvent}
              state={state}
              icon={
                <AccountCircle
                  sx={{
                    color:
                      state.errorStatus.name === true
                        ? "danger.main"
                        : "#8a8787",
                  }}
                  className="icon"
                />
              }
            />
            <CustomInputBox
              name="phone"
              placeholder="Mobile Number"
              type="text"
              autoFocus={false}
              onChange={onChangeEvent}
              state={state}
              icon={
                <Phone
                  sx={{
                    color:
                      state.errorStatus.phone === true
                        ? "danger.main"
                        : "#8a8787",
                  }}
                  className="icon"
                />
              }
            />
            <CustomInputBox
              name="email"
              placeholder="Email Addsress"
              type="email"
              autoFocus={false}
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
            <CustomInputBox
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              autoFocus={false}
              onChange={onChangeEvent}
              state={state}
              icon={
                <Lock
                  sx={{
                    color:
                      state.errorStatus.confirmPassword === true
                        ? "danger.main"
                        : "#8a8787",
                  }}
                  className="icon"
                />
              }
            />

            <Box sx={{ textAlign: "left", marginBottom: "20px" }}>
              <FormControlLabel
                sx={{
                  fontSize: "13px",
                  color: !isAcceptTerms ? "danger.main" : "#636262",
                }}
                control={
                  <Checkbox onChange={() => setTermsStatus(!termsStatus)} />
                }
                label="I agree to Terms of Services & Privacy Policy"
              />
            </Box>

            <Box sx={{ textAlign: "right", marginBottom: "20px" }}>
              {/* <Button variant="contained" disableRipple={true} onClick= {(event) => handleForSubmission(event)}> Create Account </Button> */}
              {/* <LoadingButton style={{width: 240, height: 50}} loading={loading} disableRipple={true}  variant="contained" onClick= {(event) => handleForSubmission(event)}>
                                Create Account
                            </LoadingButton> */}
              <LoadingButton
                style={{ width: 240, height: 50 }}
                loading={loading}
                disableRipple={true}
                variant="contained"
                onClick={(event) => handleForSubmission(event)}
              >
                Create Account
              </LoadingButton>

              {/*<Button
                style={{ width: 240, height: 50 }}
                // loading={loading}
                disableRipple={true}
                variant="contained"
                onClick={(event) => handleForSubmission(event)}
              >
                Create Account
              </Button>*/}
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

export default Signup;
