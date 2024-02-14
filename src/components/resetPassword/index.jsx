import React, { useRef, useState } from "react";
import "../login/login.scss";
import LoginImage from "../../assets/imges/login.png";
import HoconfabricImage from "../../assets/logo/hoconfabric.svg";
import OnClickOutside from "../../helpers/OnClickOutside";
import { toast } from "react-hot-toast";
import { resetPassword } from "../../store/ApiSlice/authSlice";
import { useDispatch } from "react-redux";
export default function ResetPassword(props) {
  const { setModal, modal } = props;
  const [inputData, setInputData] = useState({});
  const dispatch = useDispatch();
  const wrapper = useRef();
  OnClickOutside(wrapper, () => setModal({}));
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const validation = () => {
    let formIsValid = true;

    if (!inputData?.password?.trim() && !inputData?.confirmPassword?.trim()) {
      formIsValid = false;
      toast("Please enter the passwords.");
    } else if (!inputData?.password?.trim()) {
      formIsValid = false;
      toast("Please enter the password.");
    } else if (!inputData?.confirmPassword?.trim()) {
      formIsValid = false;
      toast("Please enter password to confirm.");
    } else if (inputData?.password !== inputData?.confirmPassword) {
      formIsValid = false;
      toast("Password do not matches.");
    } else {
      return formIsValid;
    }
  };

  const handleSignup = async () => {
    if (validation()) {
      const userData = {
        password: inputData.password,
      };
      dispatch(resetPassword(userData)).then((res) => {
        setModal({});
        toast.success("Password updated successfully.");
      });
    }
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
                  <h4>Reset Password</h4>
                </div>
                <div className="input bottom-align">
                  <label>New Password</label>
                  <input
                    type="text"
                    placeholder="New Password"
                    name="password"
                    value={inputData?.password}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="input bottom-align">
                  <label>Re-type Password</label>
                  <input
                    type="text"
                    placeholder="Re-type Password"
                    name="confirmPassword"
                    value={inputData?.confirmPassword}
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
                    RESET PASSWORD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
