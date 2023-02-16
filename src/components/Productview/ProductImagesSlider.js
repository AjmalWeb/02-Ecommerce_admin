import "./product.css";
import PropTypes from "prop-types";
import styled from "styled-components";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from "swiper";
import "swiper/swiper-bundle.css";


SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

const NumberText = styled.div`
  // color: #f2f2f2;
  // text-shadow: 0 0 4px blue;
  // font-size: 12px;
  // padding: 8px 12px;
  // position: absolute;
  // right: 23;
  // bottom: 11;
    backdrop-filter: blur(6px);
    background-color: rgba(22, 28, 36, 0.48);
    z-index: 9;
    align-items: center;
    position: absolute;
    bottom: 1rem;
    right: 0.44rem;
    padding: 2px;
    color: rgb(255, 255, 255);
    border-radius: 8px;
    width: 5.7rem;
    text-align: center;
    padding: 5px;
`;


const ProductImagesSlider = (props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [controlledSwiper, setControlledSwiper] = useState(null);

    return (
        <>
            <Swiper
             style={{
                      "--swiper-navigation-color": "white",
                      "--swiper-navigation-padding": "10px",
                      "--swiper-navigation-size": "15px",
                      "--swiper-navigation-background": "grey",
                    }}
                id="main"
                thumbs={{ swiper: thumbsSwiper }}
                loop={true}
                
                tag="section"
                wrapperTag="ul"
                navigation
                // pagination
                spaceBetween={0}
                slidesPerView={1}
                onInit={(swiper) => console.log("Swiper initialized!", swiper)}
                onSlideChange={(swiper) => {
                    console.log("Slide index changed to: ", swiper.activeIndex);
                }}
                onReachEnd={() => console.log("Swiper end reached")}
                className="product-images-slider"
            >
                {props.images.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className='main-slider'>
                         <NumberText>
                          {index + 1}/{props.images.length}
                        </NumberText>
                        <img src={item} alt="product images" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                id="thumbs"
                spaceBetween={15}
                loop={true}
                watchSlidesProgress={true}
                centeredSlides={true}
                centeredSlidesBounds={true}
                slidesPerView={6}
                onSwiper={setThumbsSwiper}
                className="product-images-slider-thumbs"
            >
             
                {props.images.map((item, index) => (
               
                    <SwiperSlide key={index}>
                        <div className="product-images-slider-thumbs-wrapper">
                            <img src={item} alt="product images" />
                        </div>
                    </SwiperSlide>
                
                ))}

            </Swiper>
        </>
    );
};

// ProductImagesSlider.propTypes = {
//     images: PropTypes.array.isRequired
// }

export default ProductImagesSlider;
