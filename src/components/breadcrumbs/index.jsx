import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./breadcrumbs.scss";
export default function Breadcrumbs() {
  const { singleProduct } = useSelector((state) => state.singleProduct);
  const { singleCategory } = useSelector((state) => state.categrory);
  const { favourites } = useSelector((state) => state.favourites);
  const { singleOrder } = useSelector((state) => state.singleOrder);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { apiCart } = useSelector((state) => state.apiCart);
  const isLoggedIn = user?.email ? true : false;
  const navigate = useNavigate();
  const location = window.location.pathname;
  return (
    <div>
      <div className="breadcrumbs-all-content-alignment">
        <div className="container-lg">
          {location === "/product" && (
            <span
              onClick={() => {
                navigate("/");
              }}
            >{`Home > Product : ${singleProduct?.name}`}</span>
          )}
          {location === "/category" && (
            <span
              onClick={() => {
                navigate("/");
              }}
            >{`Home > Category : ${singleCategory?.name}`}</span>
          )}
          {location === "/order-details" && (
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              {`Home > Order : ${singleOrder?.products?.length} ${
                singleOrder?.products?.length < 2 ? "product" : "products"
              }`}
            </span>
          )}
          {location === "/wishlist" && (
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              {`Home > Wishlist : ${favourites?.length} ${
                favourites?.length < 2 ? "product" : "products"
              }`}
            </span>
          )}
          {location === "/cart" && (
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              {isLoggedIn
                ? apiCart?.products?.length
                  ? `Home > Cart : ${apiCart?.products?.length} ${
                      apiCart?.products?.length < 2 ? "product" : "products"
                    }`
                  : `Home > Cart`
                : cart.length
                ? `Home > Cart : ${cart.length} ${
                    cart.length < 2 ? "product" : "products"
                  }`
                : `Home > Cart`}
            </span>
          )}
          {location === "/checkout" && (
            <span
              onClick={() => {
                navigate("/");
              }}
            >{`Home > Checkout`}</span>
          )}
        </div>
      </div>
    </div>
  );
}
