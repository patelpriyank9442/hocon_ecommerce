import React from "react";
import "./NewsLetter.scss";
import NewsImage from "../../../assets/imges/news-image.png";
import NewsImage3 from "../../../assets/imges/news2.png";
import { useState } from "react";
import axios from "axios";
import { authHeaderSignup } from "../../../helpers/authHelper";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const addNewsLetter = async () => {
    const body = {
      email: email,
    };
    await axios
      .post(
        "https://9b83-2405-201-200d-1c68-89cc-bcd4-c2c0-6cc1.in.ngrok.io/hoconn/api/v1/newsLetter",
        body
      )
      .then((res) => {
        if (res.data.message == "Success.") {
          toast.success("You have successfully subscribed to our newsletter");
          setEmail("");
        }
      });
  };
  return (
    <div>
      <Toaster />
      <div className="news-letter-all-content-alignment">
        <div className="container-lg">
          <div className="grid">
            <div className="grid-items">
              <h4>Join our newsletter</h4>
              <p>
                Join our email subscription now to get updates on promotions and
                coupons.
              </p>
              <div className="search-grid">
                <div>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      addNewsLetter();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="grid-items">
              <div className="image-grid">
                <div className="first-image">
                  <img src={NewsImage} alt="NewsImage" />
                </div>
                <div className="sec-image">
                  <img src={NewsImage3} alt="NewsImage3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
