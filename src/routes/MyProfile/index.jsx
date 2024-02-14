import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/breadcrumbs";
import { resetAuth } from "../../store/ApiSlice/authSlice";
import { resetCart } from "../../store/ApiSlice/cartApiSlice";
import { ResetCouponData } from "../../store/ApiSlice/couponSlice";
import { resetFav } from "../../store/ApiSlice/favouritesSlice";
import EditProfile from "./EditProfile";
import Help from "./Help";
import MyOrders from "./MyOrders";
import "./MyProfile.scss";
export default function MyProfile() {
  const { help } = useSelector((state) => state.footerContent.footerContent);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    navigate("/");
    dispatch(resetAuth());
    dispatch(resetCart());
    dispatch(resetFav());
    dispatch(ResetCouponData());
    sessionStorage.clear();
    localStorage.clear();
    localStorage.removeItem("authUser");
    toast.success("Logout successful");
  };
  useEffect(() => {
    document.title = "Hoconn : Profile";
  }, []);
  return (
    <div>
      <div className="my-profile-breadcumbs-alignment">
        <Breadcrumbs />
      </div>
      <div className="my-profile-all-content-alignment-for-page">
        <div className="container-lg">
          <div className="grid">
            <div className="grid-items">
              <div className="profile-tab">
                <span
                  className={tab === 0 ? "span_active" : "span_tab"}
                  onClick={() => {
                    setTab(0);
                  }}
                >
                  My profile
                </span>
                <span
                  className={tab === 1 ? "span_active" : "span_tab"}
                  onClick={() => {
                    setTab(1);
                  }}
                >
                  Orders
                </span>
                <span
                  className={tab === 2 ? "span_active" : "span_tab"}
                  onClick={() => {
                    setTab(2);
                  }}
                >
                  Help
                </span>
                <span
                  className="span_tab"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Log Out
                </span>
              </div>
            </div>
            <div className="grid-items">
              {tab === 0 && <EditProfile />}
              {tab === 1 && <MyOrders />}
              {tab === 2 && <Help />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
