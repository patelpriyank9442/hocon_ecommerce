import React from "react";
import "./ProductCard.scss";
import Slider from "react-slick";
import ProductImage from "../../assets/imges/product.jpg";
import HeartFilled from "../../assets/icons/heartFilled.svg";
import HeartIcons from "../../assets/icons/outline-heart.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getFavourite,
  toggleFavourite,
} from "../../store/ApiSlice/favouritesSlice";
import { useNavigate } from "react-router-dom";
import { Product } from "../../store/ApiSlice/singleProduct";
import { toast } from "react-hot-toast";
export default function ProductCard(props) {
  const { favourites } = useSelector((state) => state.favourites);
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = user?.email ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = props;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let isFav;
  if (favourites?.length > 0) {
    isFav = favourites?.find((row) => {
      return row?.productId?._id === product?._id ? true : false;
    });
  }

  return (
    <div>
      <div className="main-product-card-details-content-alignment">
        <div className="product-image">
          <Slider {...settings}>
            {product?.images?.length > 0 ? (
              product?.images?.map((data, i) => {
                return (
                  <div
                    className="image-style"
                    key={i}
                    onClick={() => {
                      dispatch(Product(product));
                      navigate("/product");
                      window.scrollTo(0, 0);
                    }}
                  >
                    <img src={data.src} alt="ProductImage" />
                  </div>
                );
              })
            ) : (
              <div className="image-style">
                <img src={ProductImage} alt="ProductImage" />
              </div>
            )}
          </Slider>
          <div className="heart-icons-alignment">
            <div
              onClick={() => {
                if (isLoggedIn) {
                  dispatch(toggleFavourite(product?._id)).then((res) => {
                    dispatch(getFavourite());
                    if (res.payload.payload.action === "remove") {
                      toast.success("Product Removed from wishlist.");
                    } else {
                      toast.success("Product Added to wishlist.");
                    }
                  });
                } else {
                  toast.error("Please Login to add to wishlist.");
                }
              }}
            >
              <img src={isFav ? HeartFilled : HeartIcons} alt="HeartIcon" />
            </div>
          </div>
        </div>
        <div className="product-details">
          <p>{product?.name}</p>
          <span>
            ₹{product?.offerPrice} <del>{product?.price}</del>
          </span>
        </div>
      </div>
    </div>
  );
}
