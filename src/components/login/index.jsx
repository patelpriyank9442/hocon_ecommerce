import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import LoginImage from "../../assets/imges/login.png";
import HoconfabricImage from "../../assets/logo/hoconfabric.svg";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../store/ApiSlice/authSlice";
import OnClickOutside from "../../helpers/OnClickOutside";
import { toast } from "react-hot-toast";
import {
  addProductToCartApi,
  getCartApiProduct,
} from "../../store/ApiSlice/cartApiSlice";

export default function Login(props) {
  const dispatch = useDispatch();
  const { modal, setModal } = props;
  const { cart } = useSelector((state) => state.cart);
  const [inputData, setInputData] = useState({});
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const wrapper = useRef();
  OnClickOutside(wrapper, () => setModal({}));

  const validation = () => {
    let formIsValid = true;
    if (!inputData?.email?.trim() && !inputData?.password?.trim()) {
      formIsValid = false;
      toast("Please enter email & password.");
    } else if (!inputData?.email?.trim()) {
      formIsValid = false;
      toast("Email is required.");
    } else if (!inputData?.password?.trim()) {
      formIsValid = false;
      toast("Password is required.");
    } else {
      return formIsValid;
    }
  };

  const handlePostCartApi = async () => {
    for (let index = 0; index < cart?.length; index++) {
      let product = {
        productId: cart[index]._id,
        quantity: cart[index].qty,
      };
      dispatch(addProductToCartApi(product)).then((data) => {
        dispatch(getCartApiProduct());
        console.log("Done Adde to cart");
      });
    }
  };

  const handleSignup = async () => {
    if (validation()) {
      const userData = {
        email: inputData.email,
        password: inputData.password,
      };
      dispatch(logIn(userData)).then((res) => {
        if (res.payload.success) {
          setModal({});
          toast.success("Login successful");
          if (cart?.length > 0) {
            handlePostCartApi();
          }
        } else {
          if (res.payload.message === "Invalid password.") {
            toast.error("Password is incorrect.");
          } else if (res.payload.message === "Not found.") {
            toast.error("User does not exist.");
          } else if (res.payload.message === "Not active.") {
            toast.error("User is not active. Please register again.");
          }
        }
      });
    }
  };

  function useKey(key, cb) {
    const callback = useRef(cb);

    useEffect(() => {
      callback.current = cb;
    });

    useEffect(() => {
      function handle(event) {
        if (event.code === key) {
          callback.current(event);
        }
      }

      document.addEventListener("keypress", handle);
      return () => document.removeEventListener("keypress", handle);
    }, [key]);
  }
  useKey("Enter", handleSignup);

  return (
    <div>
      <div className="auth-wrapper">
        <div className="login-box" ref={wrapper}>
          <div className="grid">
            <div className="grid-items">
              <img src={LoginImage} alt="LoginImage" />
            </div>
            <div className="grid-items">
              <div className="logo-alignment">
                <img src={HoconfabricImage} alt="HoconfabricImage" />
              </div>
              <div>
                <div className="box-heading">
                  <h4>Login</h4>
                </div>
                <div className="input bottom-align">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="input">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="forgot-password">
                  <span
                    onClick={() => {
                      setModal({
                        ...modal,
                        login: false,
                        forgotPassword: true,
                      });
                    }}
                  >
                    Forgot Password?
                  </span>
                </div>
                <div className="button-style">
                  <button
                    onClick={() => {
                      handleSignup();
                    }}
                  >
                    Login
                  </button>
                </div>
                <div className="text-style">
                  <p>
                    Don’t have an account?{" "}
                    <a
                      onClick={() => {
                        setModal({ ...modal, login: false, signup: true });
                      }}
                    >
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
