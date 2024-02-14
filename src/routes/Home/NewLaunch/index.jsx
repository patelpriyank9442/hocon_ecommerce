import React from "react";
import "./NewLaunch.scss";
import LineVector from "../../../assets/imges/line.svg";
import AddImage from "../../../assets/imges/add-image.png";
import SliderArrow from "../../../assets/icons/slider-arrow.svg";
import Slider from "react-slick";
import ProductCard from "../../../components/ProductCard";
import { useSelector } from "react-redux";
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
export default function NewLaunch() {
  const { newLaunch } = useSelector((state) => state.newLaunch);

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
    <div>
      {newLaunch?.length > 0 && (
        <div className="new-launch-all-content-alignment">
          <div className="container-lg">
            <div className="new-launch-text">
              <h2>New Launch</h2>
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
              {newLaunch?.map((data, i) => {
                return (
                  <div key={i}>
                    <ProductCard product={data} />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}
