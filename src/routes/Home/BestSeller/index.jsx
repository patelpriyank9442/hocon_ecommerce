import React from "react";
import "./BestSeller.scss";
import LineVector from "../../../assets/imges/line.svg";
import AddImage from "../../../assets/imges/add-image.png";
import SliderArrow from "../../../assets/icons/slider-arrow.svg";
import Slider from "react-slick";
import ProductCard from "../../../components/ProductCard";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="right-arrow-alignment" onClick={onClick}>
      <img src={SliderArrow} alt="SliderArrow" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="left-arrow-alignment" onClick={onClick}>
      <img src={SliderArrow} alt="SliderArrow" />
    </div>
  );
}
export default function BestSeller() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <>
      <div className="container-lg">
        <div className="best-seller-all-content-alignment">
          <div className="best-seller-text">
            <h2>Best Seller</h2>
            <div className="line-center-alignment">
              <img src={LineVector} alt="LineVector" />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida.
            </p>
          </div>
          <Slider {...settings}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((data, i) => {
              return (
                <div key={i}>
                  <ProductCard />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <div className="container-lg">
        <div className="add-image">
          <img src={AddImage} alt="AddImage" />
        </div>
      </div>
    </>
  );
}
