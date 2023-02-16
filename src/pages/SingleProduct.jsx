import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Box, Typography, Button } from "@mui/material";
import { Slider } from "react-draggable-slider";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import ProductImagesSlider from "../components/Productview/ProductImagesSlider";
import Productwarranty from "../components/Productwarranty/Productwarranty";
import FloatingActionButtonZoom from "../components/Review/FloatingActionButtonZoom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import "./Productpage.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import ButtonGroup from "@mui/material/ButtonGroup";

// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2)
//   },
//   rootFirstSelect: {
//     padding: "4px 0px"
//   },
//   rootSecondSelect: {
//     padding: "10px 80px"
//   }
// }));

const ProductDiv = styled.div`
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);

  height: 100%;
`;

const OutofStock = styled.span`
  width: 6rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  border-radius: 6px;
  color: rgb(183, 29, 24);
  font-size: 0.75rem;
  font-family: Public Sans, sans-serif;
  background-color: rgba(255, 86, 48, 0.16);
  font-weight: 700;
  text-transform: uppercase;
`;
const SaleDiv = styled.div`
  font-weight: 700;
  line-height: 1.5;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-family: Public Sans, sans-serif;
  color: rgb(255, 86, 48);
  margin: 16px 0px 0px;
`;

const Product = () => {
  // const classes = useStyles();
  let { productId } = useParams();
  const [singleproduct, setSingleProduct] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const productone = await axios.get(
        `https://dummyjson.com/products/${productId}`
      );
      // console.log(user.data)
      setSingleProduct(productone.data);
      const colors = ["red", "blue", "black"];
      setSingleProduct((prevState) => {
        return {
          ...prevState,
          colors: colors,
        };
      });
      let offerprice = (
        ((100 - productone.data.discountPercentage) * productone.data.price) /
        100
      ).toFixed(2);
      // console.log("offerprice:::",offerprice)
      setSingleProduct((prevState) => {
        return {
          ...prevState,
          offerprice: offerprice,
        };
      });
      // console.log("offerprice:::",offerprice)
    };
    getData();
  }, []);

  const [size, setSize] = useState("");

  const handleChange = (event) => {
    setSize(event.target.value);
    console.log(event.target.value);
  };

  const [color, setColor] = useState(null);
  const handlecolor = (e) => {
    console.log("color::::", e.target.value);
    setColor(e.target.value);
  };

  const [quandity, setQuandity] = useState(1);

  const handleIncrement = () => {
    setQuandity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quandity > 1) {
      setQuandity((prev) => prev - 1);
    }
  };

  return (
    <ProductDiv>
      {singleproduct ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                flex: 4,
                // background: "red",
                width: "100%",
                // height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "600px",
                  // height: "500px",
                  backgroundColor: "#fff",
                  boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
                }}
              >
                <ProductImagesSlider
                  images={singleproduct && singleproduct.images}
                />
              </div>

              {/* <img
              src={singleproduct && singleproduct.thumbnail}
               alt=""
               style={{ objectFit: "cover", width: "90%" }}
             /> */}
            </Box>
            <Box
              sx={{
                flex: 3,
                // background: "yellow",
                display: "flex",
                flexDirection: "column",
                marginRight: "50px",
                boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
              }}
            >
              <OutofStock> out OF STOCK</OutofStock>
              <SaleDiv>sale</SaleDiv>
              <Typography
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  fontFamily: "Public Sans, sans-serif",
                  lineHeight: "1.5",
                  color: "rgb(33, 43, 54)",
                  margin: "16px 0px 0px",
                }}
              >
                {singleproduct.title}
              </Typography>

              <Typography
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  margin: "16px 0px 0px",
                }}
              >
                <Rating
                  name="read-only"
                  value={singleproduct.rating}
                  readOnly
                />
                {singleproduct && singleproduct.rating}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "40px",
                  alignItems: "center",
                  fontWeight: "600",
                  fontSize: "2rem",
                  lineHeight: "3.5",
                  margin: "16px 0px 0px",
                }}
              >
                <del
                  style={{
                    color: "rgb(145, 158, 171)",
                    fontWeight: "700",
                    lineHeight: "1.5",
                    fontSize: "1.5rem",
                  }}
                >
                  $ {singleproduct && singleproduct.price}
                </del>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: "1.5rem",
                    lineHeight: "1.5",
                  }}
                >
                  $ {singleproduct && singleproduct.offerprice}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "16px 0px 0px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    margin: "0px",
                    fontWeight: "600",
                    lineHeight: "1.57143",
                    fontSize: "0.875rem",
                  }}
                >
                  Colors
                </Typography>
                <Box sx={{ display: "flex", marginRight: "10px" }}>
                  {singleproduct.colors.map((item, index) => (
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value={index}
                        onChange={handlecolor}
                      />
                      <span
                        className="value"
                        style={{ background: color == index ? "white" : item }}
                      >
                        <span className="checked">
                          <CheckCircleRoundedIcon
                            sx={{ color: item, fontSize: "1.8rem" }}
                          />
                        </span>
                      </span>
                    </label>
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "16px 0px 0px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    margin: "0px",
                    fontWeight: "600",
                    lineHeight: "1.57143",
                    fontSize: "0.875rem",
                  }}
                >
                  Size
                </Typography>
                <Box>
                  <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                    <Select
                      value={size}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ borderRadius: "8px" }}
                    >
                      <MenuItem value="">
                        <em></em>
                      </MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={8.5}>8.5</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "16px 0px 0px",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    margin: "0px",
                    fontWeight: "600",
                    lineHeight: "1.57143",
                    fontSize: "0.875rem",
                  }}
                >
                  Quantity
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "4px 6px",
                    // width: "96px",
                    borderRadius: "8px",
                    marginRight: "10px",
                    border: "1px solid rgba(145, 158, 171, 0.32)",
                  }}
                >
                  <Button
                    size="small"
                    onClick={handleIncrement}
                    sx={{ minWidth: "35px" }}
                  >
                    +
                  </Button>
                  <Box
                    sx={{ padding: "5px", padding: "4px 5px", width: "20px" }}
                  >
                    {quandity}
                  </Box>
                  <Button
                    size="small"
                    onClick={handleDecrement}
                    sx={{ minWidth: "35px" }}
                  >
                    -
                  </Button>
                </Box>
              </Box>
              <Typography
                sx={{
                  lineHeight: 1.5,
                  fontSize: "0.75rem",
                  fontFamily: "Public Sans, sans-serif",
                  fontWeight: "400",
                  color: "rgb(99, 115, 129)",
                  textAlign: "right",

                  margin: "10px 25px 10px 0",
                }}
              >
                Available : 98
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "24px 0px 0px",
                  justifyContent: "center",
                  gap: "3rem",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<AddShoppingCartIcon />}
                  sx={{
                    fontWeight: "700",
                    lineHeight: "1.71429",
                    textTransform: "capitalize",
                    fontFamily: "Public Sans, sans-serif",
                    minWidth: "64px",
                    padding: "8px 22px",
                    borderRadius: "8px",
                    color: "rgb(33, 43, 54)",
                    backgroundColor: "rgb(255, 171, 0)",
                    width: "14rem",
                    boxShadow: "none",
                    height: "48px",
                    fontSize: "15px",
                  }}
                >
                  Add to cart
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: "700",
                    lineHeight: "1.71429",
                    textTransform: "capitalize",
                    fontFamily: "Public Sans, sans-serif",
                    minWidth: "12px",
                    padding: "8px 22px",
                    borderRadius: " 8px",
                    color: "rgb(255, 255, 255)",
                    backgroundColor: "rgb(0, 171, 85)",
                    width: "14rem",
                    boxShadow: "none",
                    height: "48px",
                  }}
                >
                  Buy now
                </Button>
              </Box>
            </Box>
          </Box>
          <Productwarranty />
          <FloatingActionButtonZoom/>
        </Box>
      ) : (
        <div>loading</div>
      )}
    </ProductDiv>
  );
};

export default Product;
