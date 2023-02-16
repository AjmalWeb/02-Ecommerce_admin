import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SoldIcon from "../assets/images/sold.png";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const NavLink = styled(Link)`
  text-transform: capitalize;
  color: #c72468;
  transition: 0.3s;
  &:hover {
    color: cornflowerblue;
  }
`;

const DetailsDiv = styled.div`
  background: #fff;
  padding: 30px;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 30px;
`;

const ImageDiv = styled.div`
  width: 100%;
  border: 1px solid #eee;
  padding: 5px;
  overflow: hidden;
  position: relative;

  & .prev,
  .next {
    position: absolute;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    width: auto;
    padding: 10px;
    color: white;
    margin-top: -50px;
    font-weight: bold;
    font-size: 20px;
    border-radius: 0 3px 3px 0;
    user-select: none;
    &:hover {
      background: rgb(0, 0, 0, 0.8);
    }
  }

  & .next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }
`;

const SlidesDiv = styled.div`
  position: relative;
  width: 100%;
  height: 330px;

  & > img {
    width: 100%;
    height: 100%;
    display: inline-block;
    object-fit: cover;
  }
`;

const NumberText = styled.div`
  color: #f2f2f2;
  text-shadow: 0 0 4px blue;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  left: 0;
  top: 0;
`;

const Slider2Div = styled.div`
  width: 100%;
  height: 50px;
  overflow-x: scroll;
  display: flex;
  user-select: none;
`;

const SliderBox = styled.div`
  width: 50px;
  height: 50px;
  min-width: 50px;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid #ddd;
  padding: 2px;

  & > img {
    width: 100%;
    height: 100%;
    display: inline-block;
    object-fit: cover;
  }
`;

const PageDetails = styled.div``; //product-page-details
const InfoDiv = styled.div``; //product-all-info




function SingleProductnew() {

  const [slideIndex,setSlideIndex]=useState(1)
  let { productId } = useParams();
  const [singleproduct, setSingleProduct] = useState(null);
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
  console.log(singleproduct);
  useEffect(() => {
    getData();
  }, []);

  const plusSlide=(n)=>{
    setSlideIndex((prev)=>prev+n)
    slideShow(slideIndex+1)
  }

  const slideShow=(n)=>{
    if(n>singleproduct.images.length){setSlideIndex(1)}
    if(n<1){setSlideIndex(singleproduct.images.length)}

  }



  return (
    <div
      style={{
        width: "95%",
        maxWidth: "1024px",
        margin: "30px auto",
        fontFamily: "Poppins",
      }}
    >
      {singleproduct ? (
        <div>
          <div style={{ marginBottom: "10px" }}>
            <NavLink>Home</NavLink> {">"}
            <NavLink style={{ marginLeft: "5px" }}>Laptop</NavLink>
          </div>

          <div>
            <DetailsDiv>
              <ImageDiv>
                {singleproduct &&
                  singleproduct.images.map((image, index) => {
                    console.log("images::::", image);
                    return (
                      <SlidesDiv key={index} style={{display:(index+1)===slideIndex ? "block" : "none"}}>
                        <NumberText>
                          {index + 1}/{singleproduct.images.length}
                        </NumberText>
                        <img src={image} />
                      </SlidesDiv>
                    );
                  })}
                <a href="#!" className="prev" onClick={()=>plusSlide(-1)}>
                  &#10094;
                </a>
                <a href="#!" className="next" onClick={()=>plusSlide(1)}>
                  &#10095;
                </a>
                <Slider2Div>
                  {singleproduct &&
                    singleproduct.images.map((image, index) => (
                      <SliderBox key={index} >
                        <img src={image} />
                      </SliderBox>
                    ))}
                </Slider2Div>
              </ImageDiv>
              <PageDetails>
                <strong>{singleproduct.title}</strong>
                <p className="product-category">
                  {singleproduct.brand} - {singleproduct.category}
                </p>
                <p className="product-price">
                  $
                  {Math.round(
                    singleproduct.price -
                      (singleproduct.price * singleproduct.discountPercentage) /
                        100
                  )}{" "}
                  <del>{singleproduct.price}</del>
                </p>
                <p className="small-disc">{singleproduct.description}</p>
                <div className="product-option">
                  {singleproduct &&
                    singleproduct.colors.map((color) => (
                      <div key={color}>
                        <button></button>
                      </div>
                    ))}
                </div>
                <div className="product-page-offer">
                  <LocalOfferIcon />
                  {singleproduct.discountPercentage}% Discount
                </div>
                <div className="product-sold">
                  {" "}
                  <img src={SoldIcon} alt="SoldIcon" />{" "}
                  <strong>
                    {" "}
                    123 <span>Products Sold.</span>
                  </strong>
                </div>
                <div className="cart-buttons">
                  <a href="#!" className="add-cart">
                    Add to Cart
                  </a>
                  <a href="#!" className="add-cart buy-now">
                    Buy Now
                  </a>
                </div>
              </PageDetails>
            </DetailsDiv>

            <InfoDiv></InfoDiv>
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default SingleProductnew;
