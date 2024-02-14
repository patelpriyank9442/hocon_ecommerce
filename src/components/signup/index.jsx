import React, { useEffect, useRef, useState } from "react";
import "../login/login.scss";
import LoginImage from "../../assets/imges/login.png";
import HoconfabricImage from "../../assets/logo/hoconfabric.svg";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/ApiSlice/authSlice";
import { toast } from "react-hot-toast";
import confetti from "canvas-confetti";
import OnClickOutside from "../../helpers/OnClickOutside";

export default function Signup(props) {
  const dispatch = useDispatch();
  const { modal, setModal } = props;
  const [inputData, setInputData] = useState({});
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const wrapper = useRef();
  OnClickOutside(wrapper, () => setModal({}));

  const validation = () => {
    let formIsValid = true;

    if (
      !inputData?.firstName?.trim() &&
      !inputData?.lastName?.trim() &&
      !inputData?.mobile?.trim() &&
      !inputData?.email?.trim() &&
      !inputData?.password?.trim() &&
      !inputData?.confirmPassword?.trim()
    ) {
      formIsValid = false;
      toast("Please fill the registration form.");
    } else if (!inputData?.firstName?.trim()) {
      formIsValid = false;
      toast("Please enter firstname.");
    } else if (!inputData?.lastName?.trim()) {
      formIsValid = false;
      toast("Please enter lastname.");
    } else if (!inputData?.mobile?.trim()) {
      formIsValid = false;
      toast("Please enter contact.");
    } else if (!inputData?.email?.trim()) {
      formIsValid = false;
      toast("Please enter email address.");
    } else if (!inputData?.password?.trim()) {
      formIsValid = false;
      toast("Please enter password.");
    } else if (inputData?.password !== inputData?.confirmPassword) {
      formIsValid = false;
      toast("Passwords do not match.");
    } else {
      return formIsValid;
    }
  };

  const handleSignup = async () => {
    if (validation()) {
      const userData = {
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        mobile: inputData.mobile,
        email: inputData.email,
        password: inputData.password,
      };
      dispatch(signUp(userData)).then((res) => {
        if (res.payload.success) {
          setModal({});
          confetti({
            particleCount: 300,
            startVelocity: 60,
            spread: 360,
          });
          toast.success("Welcome to Hoconn fashion");
        } else {
          if (res.payload.message === "Email is already registered.") {
            toast.error("Email already exists.");
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
                  <h4>Sign Up</h4>
                </div>
                <div className="input bottom-align">
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="input bottom-align">
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="input bottom-align">
                  <label>Contact</label>
                  <input
                    type="number"
                    placeholder="Mobile No"
                    name="mobile"
                    value={inputData.mobile}
                    onChange={(e) => {
                      e.target.value.length <= 10 && handleChange(e);
                    }}
                  />
                </div>
                <div className="input bottom-align">
                  <label>Email Address</label>
                  <input
                    type="text"
                    placeholder="Email Address"
                    name="email"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="input bottom-align">
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
                <div className="input bottom-align">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>

                <div className="button-style">
                  <button
                    onClick={() => {
                      handleSignup();
                    }}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="text-style">
                  <p>
                    Already have an account?{" "}
                    <a
                      onClick={() => {
                        setModal({ ...modal, signup: false, login: true });
                      }}
                    >
                      Login
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
