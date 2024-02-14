import React, { useRef } from "react";
import "../login/login.scss";
import { useDispatch, useSelector } from "react-redux";
import OnClickOutside from "../../helpers/OnClickOutside";
import { cencelOrders, getOrders } from "../../store/ApiSlice/ordersSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Modal(props) {
  const dispatch = useDispatch();
  const wrapper = useRef();
  const navigate = useNavigate();
  const { singleOrder } = useSelector((state) => state.singleOrder);
  OnClickOutside(wrapper, () => props.setCancelModal(false));

  return (
    <div className="auth-wrapper">
      <div className="modal_cancel" ref={wrapper}>
        <div className="cancel_text">
          Are you sure you want to cancel this order ?
        </div>
        <div className="cancel_btn">
          <button
            className="btn_close"
            onClick={() => {
              props.setCancelModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="btn_yes"
            onClick={() => {
              dispatch(cencelOrders(singleOrder._id)).then((res) => {
                if (res.payload.success) {
                  props.setCancelModal(false);
                  toast.success("Order Cancelled");
                  dispatch(getOrders());
                  navigate("/profile");
                }
              });
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
