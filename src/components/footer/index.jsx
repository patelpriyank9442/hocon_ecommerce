import React from "react";
import "./footer.scss";
import Logo from "../../assets/logo/logo.svg";
import PaymentIcon from "../../assets/icons/payment.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const { socialMedia } = useSelector((state) => state.socialMedia);
  const navigate = useNavigate();
  return (
    <div>
      <div className="first-footer">
        <div className="container-md">
          <div className="footer-alignment">
            <div className="left-content">
              <img src={Logo} alt="Logo" />
              <h6>Monday – Saturday: 8:00 – 18:00</h6>
            </div>
            <div className="right-content">
              <div>
                <h5>Categories</h5>
                <a>Ethnic Wear</a>
                <a>Western Wear</a>
                <a>Formal Wear</a>
                <a>Fabrics</a>
              </div>
              <div className="quicklinks">
                <h5>Quick links</h5>

                <span
                  className="fLink"
                  onClick={() => {
                    navigate("/terms&conditions");
                  }}
                >
                  Terms & Conditions
                </span>

                <span
                  className="fLink"
                  onClick={() => {
                    navigate("/aboutus");
                  }}
                >
                  About
                </span>
                <span
                  className="fLink"
                  onClick={() => {
                    navigate("/privacypolicy");
                  }}
                >
                  Privacy Policy
                </span>
              </div>
              <div>
                <h5>Follow Us</h5>
                {socialMedia?.map((data, i) => {
                  return (
                    <a href={data?.link} target="_blank" key={i}>
                      <div className="icon-text">
                        <div>
                          <img src={data?.image} alt="InstagramIcon" />
                        </div>
                        <div>
                          <span>{data?.name}</span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-md">
        <div className="last-footer-content-alignment">
          <div className="left-content">
            <span>© Hoconn – All Rights Reserved</span>
          </div>
          <div className="right-content">
            <img src={PaymentIcon} alt="PaymentIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}
