import React from "react";
import "./Herobanner.scss";
import Slider from "react-slick";
import HeroBannerImage from "../../../assets/imges/hero-banner.png";
import { useSelector } from "react-redux";
export default function Herobanner() {
  const { banner } = useSelector(
    (state) => state?.dashboardContent?.dashboardContent
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="hero-all-content-alignment">
      <Slider {...settings}>
        {banner?.map((item, index) => {
          return (
            <div className="relative-main"  key={index}>
              <img src={item?.image} alt="HeroBannerImage" />
              <div className="container-lg">
                <div className="content-alignment">
                  <span>{item?.name}</span>
                  <h1>{item?.description}</h1>
                  <button>View Collection</button>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
