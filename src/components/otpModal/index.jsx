import React, { useRef, useState } from "react";
import "../login/login.scss";
import LoginImage from "../../assets/imges/login.png";
import HoconfabricImage from "../../assets/logo/hoconfabric.svg";
import OTPInput from "./OTPInput";
import { useDispatch } from "react-redux";
import { forgot, verifyOtp } from "../../store/ApiSlice/authSlice";
import { toast } from "react-hot-toast";
import OnClickOutside from "../../helpers/OnClickOutside";
import ResetPassword from "../resetPassword";

export default function OtpModal(props) {
  const { modal, setModal, forgotEmail } = props;
  const [otps, setOtp] = useState({});

  const dispatch = useDispatch();
  const wrapper = useRef();
  OnClickOutside(wrapper, () => setModal({}));

  const handleResend = async () => {
    const userData = {
      email: forgotEmail,
    };
    dispatch(forgot(userData)).then((res) => {
      toast.success("Verification code sent to your email");
    });
  };

  const handleSubmit = async () => {
    const userData = {
      email: forgotEmail,
      otp: otps?.OTP,
    };
    dispatch(verifyOtp(userData)).then((res) => {
      if (res.payload.success) {
        toast.success("Otp veridfied successfully");
        setModal({ ...modal, otp: false, resetPassword: true });
      } else {
        toast.error("Otp is incorrect.");
      }
    });
  };
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
                  <h4>Enter OTP</h4>
                  <p>Enter 6 digit code they you received on your email</p>
                </div>
                <div className="otp-input">
                  <OTPInput
                    isNumberInput
                    autoFocus
                    length={6}
                    value={otps?.OTP}
                    className="otpContainer"
                    inputClassName="input_item"
                    onChangeOTP={(otp) => setOtp({ ...otps, OTP: otp })}
                  />
                </div>
                <div className="resend-otp">
                  <a
                    onClick={() => {
                      handleResend();
                    }}
                  >
                    Resend OTP
                  </a>
                </div>
                <div className="button-style">
                  <button
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    RESET PASSWORD
                  </button>
                </div>
                <div className="text-style">
                  <p>
                    <a
                      onClick={() => {
                        setModal({ ...modal, otp: false, login: true });
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
