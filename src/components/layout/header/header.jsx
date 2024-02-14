import React, { useRef, useState } from "react";
import "./header.scss";
import Logo from "../../../assets/logo/logo.svg";
import SearchIcon from "../../../assets/icons/search.svg";
import PeopleIcon from "../../../assets/icons/people.svg";
import HeartIcon from "../../../assets/icons/heartHeader.svg";
import ShopIcon from "../../../assets/icons/shop.svg";
import Cart from "../../../assets/icons/cart.svg";
import { useNavigate } from "react-router-dom";
import Login from "../../login";
import Signup from "../../signup";
import OtpModal from "../../otpModal";
import ResetPassword from "../../resetPassword";
import ForgotPassword from "../../changePassword";
import { useDispatch, useSelector } from "react-redux";
import {
  Product,
  ResetSearch,
  searchProduct,
} from "../../../store/ApiSlice/singleProduct";
import useOnClickOutside from "../../../helpers/useOnClickOutside";
export default function Header() {
  const { cart } = useSelector((state) => state.cart);
  const { apiCart } = useSelector((state) => state.apiCart);
  const { user } = useSelector((state) => state.auth);
  const { favourites } = useSelector((state) => state.favourites);
  const { searchProducts } = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();
  const [mobileheader, setMobileheader] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const isLoggedIn = user?.email ? true : false;
  const [modal, setModal] = useState({
    signup: false,
    login: false,
    forgotPassword: false,
    resetPassword: false,
    otp: false,
  });
  const navigate = useNavigate();
  const [forgotEmail, setForgotEmail] = useState("");
  const wrapperRef = useRef();
  const wrapperRef1 = useRef();
  useOnClickOutside(wrapperRef1, wrapperRef, () => setSearchBox(false));
  return (
    <>
      <header>
        <div className="container-lg">
          <div className="header-alignment">
            <div
              className="logo"
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={Logo} alt="Logo" />
            </div>
            {searchBox && (
              <div className="header_search" ref={wrapperRef1}>
                <div className="search_box">
                  <div className="search_header">
                    <div className="section_input">
                      <input
                        placeholder="Search product"
                        onChange={(e) => {
                          dispatch(searchProduct(e.target.value));
                        }}
                      />{" "}
                      <img
                        src={SearchIcon}
                        onClick={() => {
                          setSearchBox(!searchBox);
                        }}
                      />
                    </div>
                  </div>

                  {searchProducts?.length > 0 && (
                    <div className="search_content">
                      {searchProducts?.map((row, i) => {
                        return (
                          <div
                            key={i}
                            className="search_item"
                            onClick={() => {
                              dispatch(Product(row));
                              navigate("/product");
                              setSearchBox(false);
                              dispatch(ResetSearch());
                              window.scrollTo(0, 0);
                            }}
                          >
                            {row?.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="menu">
              <a>Ethnic Wear</a>
              <a>Western Wear</a>
              <a>Formal Wear</a>
              <a>Fabrics</a>
            </div>

            <div className="right-icon" ref={wrapperRef}>
              <div>
                <img
                  src={SearchIcon}
                  alt="SearchIcon"
                  onClick={() => {
                    setSearchBox(!searchBox);
                  }}
                />
              </div>

              {isLoggedIn ? (
                <div
                  className={isLoggedIn ? "profile_auth" : "profile"}
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Hi, {user?.firstName ? user?.firstName : "User"}{" "}
                </div>
              ) : (
                <div
                  className="profile"
                  onClick={() => {
                    setModal({ ...modal, login: true });
                  }}
                >
                  <img src={PeopleIcon} alt="PeopleIcon" />
                </div>
              )}

              <div
                className="iconRelative"
                onClick={() => {
                  if (isLoggedIn) {
                    navigate("/wishlist");
                  } else {
                    setModal({ ...modal, login: true });
                  }
                }}
              >
                <img src={HeartIcon} alt="ShopIcon" />
                {favourites?.length > 0 && (
                  <div className="round">{favourites?.length}</div>
                )}
              </div>
              <div
                className="iconRelative"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <img src={Cart} alt="ShopIcon" />
                {isLoggedIn
                  ? apiCart?.products?.length > 0 && (
                      <div className="round">{apiCart?.products?.length}</div>
                    )
                  : cart?.length > 0 && (
                      <div className="round">{cart?.length}</div>
                    )}
              </div>
            </div>
            <div
              className="mobile-menu"
              onClick={() => setMobileheader(!mobileheader)}
            >
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
      </header>
      {mobileheader && <div className="mobile-view-header-wrapper"></div>}
      <div
        className={
          mobileheader
            ? "mobile-header-design header-show"
            : "mobile-header-design header-hidden"
        }
      >
        <div className="small-header">
          <img src={Logo} />
          <i
            className="fa-solid fa-xmark"
            onClick={() => setMobileheader(false)}
          ></i>
        </div>
        <div className="small-header-body">
          {/* <a>Home</a> */}
          <a>Ethnic Wear</a>
          <a>Western Wear</a>
          <a>Formal Wear</a>
          <a>Fabrics</a>
          {/* <a>About</a> */}
          {/* <a>Contact</a> */}
          <div className="right-icon">
            <div>
              <img src={SearchIcon} alt="SearchIcon" />
            </div>

            <div
              className="profile"
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/profile");
                  setMobileheader(false);
                } else {
                  setMobileheader(false);
                  setModal({ ...modal, login: true });
                }
              }}
            >
              <img src={PeopleIcon} alt="PeopleIcon" />
            </div>

            <div
              className="iconRelative"
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/wishlist");
                } else {
                  setModal({ ...modal, login: true });
                }
              }}
            >
              <img src={HeartIcon} alt="ShopIcon" />
              {favourites?.length > 0 && (
                <div className="round">{favourites?.length}</div>
              )}
            </div>
            <div
              className="iconRelative"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <img src={Cart} alt="ShopIcon" />
              {isLoggedIn
                ? apiCart?.products?.length > 0 && (
                    <div className="round">{apiCart?.products?.length}</div>
                  )
                : cart?.length > 0 && (
                    <div className="round">{cart?.length}</div>
                  )}
            </div>
          </div>
        </div>
      </div>
      {modal.login && <Login modal={modal} setModal={setModal} />}
      {modal.signup && <Signup modal={modal} setModal={setModal} />}
      {modal.otp && (
        <OtpModal forgotEmail={forgotEmail} modal={modal} setModal={setModal} />
      )}
      {modal.resetPassword && (
        <ResetPassword modal={modal} setModal={setModal} />
      )}
      {modal.forgotPassword && (
        <ForgotPassword
          forgotEmail={forgotEmail}
          setForgotEmail={setForgotEmail}
          modal={modal}
          setModal={setModal}
        />
      )}
    </>
  );
}
