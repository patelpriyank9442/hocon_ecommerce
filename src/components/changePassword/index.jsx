import React, { useRef, useState } from "react";
import "../login/login.scss";
import LoginImage from "../../assets/imges/login.png";
import { forgot } from "../../store/ApiSlice/authSlice";
import HoconfabricImage from "../../assets/logo/hoconfabric.svg";
import { useDispatch } from "react-redux";
import OnClickOutside from "../../helpers/OnClickOutside";
import { toast } from "react-hot-toast";

export default function ForgotPassword(props) {
  const { forgotEmail, setForgotEmail, modal, setModal } = props;
  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (!forgotEmail) {
      toast.error("Please enter registered email*");
    } else {
      const userData = {
        email: forgotEmail,
      };
      dispatch(forgot(userData)).then((res) => {
        if (res.payload.success) {
          setModal({ ...modal, forgotPassword: false, otp: true });
          toast.success("Otp sent to your email.");
        } else {
          toast.error("Email is not registered.");
        }
      });
    }
  };

  const wrapper = useRef();
  OnClickOutside(wrapper, () => setModal({}));

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
                  <h4>Forgot Password</h4>
                  <p>We’ll send you an email to reset your password.</p>
                </div>
                <div className="input bottom-align">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => {
                      setForgotEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="button-style">
                  <button
                    onClick={() => {
                      handleSignup();
                    }}
                  >
                    SEND
                  </button>
                </div>
                <div className="text-style">
                  <p>
                    <a
                      onClick={() => {
                        setModal({
                          ...modal,
                          forgotPassword: false,
                          login: true,
                        });
                      }}
                    >
                      Back to Login
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
