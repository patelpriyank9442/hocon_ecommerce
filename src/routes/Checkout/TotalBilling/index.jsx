import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  applyCoupons,
  ResetCouponData,
  setCouponApplied,
  setFinalAmount,
} from "../../../store/ApiSlice/couponSlice";
import "./TotalBilling.scss";
export default function TotalBilling(props) {
  const { pay, orderPlace, setInputData, inputData } = props;
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { apiCart } = useSelector((state) => state.apiCart);
  const isLoggedIn = user?.email ? true : false;
  const [isChecked, setIsChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const { couponAmount, isApplied } = useSelector((state) => state.couponData);
  const [couponText, setCouponText] = useState("");
  const dispatch = useDispatch();

  let finalTotal = 0;
  let subTotal = 0;
  if (isLoggedIn) {
    var cartTotal = apiCart?.products?.forEach((row) => {
      finalTotal =
        finalTotal + Number(row?.productId?.offerPrice) * Number(row.quantity);
      subTotal =
        subTotal + Number(row?.productId?.price) * Number(row.quantity);
    });
  } else {
    var cartTotal = cart.forEach((row) => {
      finalTotal = finalTotal + Number(row?.offerPrice) * Number(row.qty);
      subTotal = subTotal + Number(row?.price) * Number(row.qty);
    });
  }

  const submitCoupon = () => {
    if (couponText?.length === 0) {
      toast("Please enter coupon code");
    } else {
      dispatch(applyCoupons(couponText)).then((res) => {
        console.log("sdfsdfsddfsdfds", res.payload.payload.discount);
        if (res.payload.success) {
          toast("Coupon Applied");
          dispatch(setFinalAmount(res.payload.payload.total));
          dispatch(setCouponApplied(res.payload.payload.discount));
      
        } else {
          toast("Invalid Coupon Code");
        }
      });
    }
  };

  return (
    <div>
      <div className="total-billing-details-content-alignment">
        <div className="cart-total">
          <span>Cart total</span>
        </div>
        <div className="sub-box">
          <div className="sub-total-alignment">
            <div className="text-alignment">
              <span>Total</span>
              <p>₹{subTotal}</p>
            </div>
            <div className="text-alignment">
              <span>Discount</span>
              <p>₹{finalTotal}</p>
            </div>
          </div>

          <div className="coupon-code">
            <input
              type="text"
              placeholder="Coupon Code"
              onChange={(e) => {
                setCouponText(e.target.value);
              }}
            />
            <button
              onClick={() => {
                submitCoupon();
              }}
            >
              APPLY
            </button>
          </div>
          <div className="final-total-alignment">
            {isLoggedIn ? (
              <span>
                {apiCart?.products?.length}{" "}
                {apiCart?.products?.length < 2 ? "item" : "items"}
              </span>
            ) : (
              <span>
                {cart.length} {cart.length < 2 ? "item" : "items"}
              </span>
            )}

            <p>₹{isApplied ? couponAmount : finalTotal}</p>
          </div>
          {/* <div className="radio-text-alignment">
            <div>
              <input type="radio" />
            </div>
            <div>
              <span>DIRECT BANK TRANSFER</span>
            </div>
          </div> */}
          <div
            className="radio-text-alignment"
            onClick={() => {
              setPaymentMethod("cash_on_delivery");
            }}
          >
            <div>
              <input
                type="radio"
                checked={inputData.paymentMethod === "cash_on_delivery"}
                onClick={() => {
                  setInputData({
                    ...inputData,
                    paymentMethod: "cash_on_delivery",
                  });
                }}
              />
            </div>
            <div>
              <span>CASH ON DELIVERY</span>
            </div>
          </div>
          <div
            className="radio-text-alignment"
            onClick={() => {
              setPaymentMethod("online_payment");
            }}
          >
            <div>
              <input
                type="radio"
                checked={inputData.paymentMethod === "online_payment"}
                onClick={() => {
                  setInputData({
                    ...inputData,
                    paymentMethod: "online_payment",
                  });
                }}
              />
            </div>
            <div>
              <span>ONLINE PAYMENTS</span>
            </div>
          </div>
          <div className="checkbox-text">
            <div>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  setIsChecked(!isChecked);
                }}
              />
            </div>
            <div>
              <span>
                I would like to receive exclusive emails with discounts and
                product information (optional) Your personal data will be used
                to process your order, support your experience throughout this
                website, and for other purposes described in our privacy policy.
              </span>
            </div>
          </div>
          <div className="button-design">
            <button
              onClick={() => {
                if (isChecked) {
                  if (paymentMethod === "cash_on_delivery") {
                    orderPlace();
                  } else {
                    pay();
                  }
                } else {
                  toast("Please agree to terms and conditions");
                }
              }}
            >
              Proceed to checkout &nbsp;&nbsp;&nbsp;₹
              {isApplied ? couponAmount : finalTotal}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
