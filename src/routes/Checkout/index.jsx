import confetti from "canvas-confetti";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/breadcrumbs";
import { ResetCart } from "../../store/ApiSlice/cartSlice";
import { ResetCouponData } from "../../store/ApiSlice/couponSlice";
import { placeOrder } from "../../store/ApiSlice/ordersSlice";
import BillingDetails from "./BillingDetails";
import "./Checkout.scss";
import TotalBilling from "./TotalBilling";
export default function Checkout() {
  const userLocation = JSON.parse(localStorage.getItem("userLocation"));
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { apiCart } = useSelector((state) => state.apiCart);
  const { couponData, couponAmount, isApplied, discount } = useSelector(
    (state) => state.couponData
  );

  const isLoggedIn = user?.email ? true : false;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    ...user,
    city: userLocation?.split(", ")[0],
    state: userLocation?.split(", ")[1],
    country: userLocation?.split(", ")[2],
  });

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  let finalTotal = 0;
  let subTotal = 0;

  if (isLoggedIn) {
    var cartTotal = apiCart?.products?.forEach((element) => {
      finalTotal =
        finalTotal +
        Number(element?.productId.offerPrice) * Number(element.quantity);
      subTotal =
        subTotal + Number(element?.productId.price) * Number(element.quantity);
    });
  } else {
    var cartTotal = cart?.forEach((element) => {
      finalTotal =
        finalTotal + Number(element?.offerPrice) * Number(element.qty);
      subTotal = subTotal + Number(element?.price) * Number(element.qty);
    });
  }

  const validation = () => {
    let formIsValid = true;
    if (!isLoggedIn) {
      toast("Please login to continue.");
    } else if (
      !inputData?.firstName?.trim() &&
      !inputData?.lastName?.trim() &&
      !inputData?.email?.trim() &&
      !inputData?.addressOne?.trim() &&
      !inputData?.addressTwo?.trim() &&
      !inputData?.city?.trim() &&
      !inputData?.state?.trim() &&
      !inputData?.country?.trim() &&
      !inputData?.pincode?.trim() &&
      !inputData?.mobile?.trim() &&
      !inputData?.paymentMethod?.trim()
    ) {
      formIsValid = false;
      toast("Please fill the billing details.");
    } else if (!inputData?.firstName?.trim()) {
      formIsValid = false;
      toast("Please enter your first name.");
    } else if (!inputData?.lastName?.trim()) {
      formIsValid = false;
      toast("Please enter your last name.");
    } else if (!inputData?.email?.trim()) {
      formIsValid = false;
      toast("Please enter your email.");
    } else if (!inputData?.addressOne?.trim()) {
      formIsValid = false;
      toast("Please enter your address line 1.");
    } else if (!inputData?.addressTwo?.trim()) {
      formIsValid = false;
      toast("Please enter your address line 2.");
    } else if (!inputData?.city?.trim()) {
      formIsValid = false;
      toast("Please enter your city.");
    } else if (!inputData?.state?.trim()) {
      formIsValid = false;
      toast("Please enter your state.");
    } else if (!inputData?.country?.trim()) {
      formIsValid = false;
      toast("Please enter your country.");
    } else if (!inputData?.pincode?.trim()) {
      formIsValid = false;
      toast("Please enter your pincode.");
    } else if (!inputData?.mobile?.trim()) {
      formIsValid = false;
      toast("Please enter your contact number.");
    } else if (!inputData?.paymentMethod?.trim()) {
      formIsValid = false;
      toast("Please select a payment method.");
    } else {
      return formIsValid;
    }
  };

  const orderPlace = () => {
    if (validation()) {
      dispatch(
        placeOrder({
          id: apiCart._id,
          cart: {
            billingDetails: {
              firstName: inputData?.firstName,
              lastName: inputData?.lastName,
              country: inputData?.country,
              streetAddress:
                inputData?.addressOne + "," + inputData?.addressTwo,
              city: inputData?.city,
              pincode: inputData?.pincode,
              state: inputData?.state,
              phone: inputData?.mobile,
              email: inputData?.email,
              orderNotes: inputData?.notes,
            },
            paymentMethod: inputData.paymentMethod,
          },
        })
      ).then((res) => {
        confetti({
          particleCount: 300,
          startVelocity: 60,
          spread: 360,
        });
        toast.success("Order Places Successfully");
        navigate("/");
        // dispatch(ResetCart());
        dispatch(ResetCouponData());
      });
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const pay = async () => {
    if (validation()) {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const options = {
        key: "rzp_test_AWrlyaXOO9ncih", // This is Api key. you will get it from razorpay dashboard > account and settings > API keys
        amount: parseInt(isApplied ? couponAmount * 100 : finalTotal * 100),
        currency: "INR", // your 3 letter currency code
        name: "Hoconn", // project or transaction name
        description: "Transaction",
        image: "https://hoconn.netlify.app/assets/logo-7b411e08.svg", // your project logo
        handler: function (response) {
          // console.log("response", response);
          orderPlace(); //  after payment completes on stripe this function will be called and you can do your stuff
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: inputData?.mobile,
        },
        notes: {
          address: inputData.country,
        },
        theme: {
          color: "#158993",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  };
  return (
    <div>
      <div className="checkout-breadcrumbs-all-content-alignment">
        <Breadcrumbs />
      </div>
      <div className="checkout-page-all-content-alignment-details">
        <div className="container-lg">
          <div className="grid">
            <div className="grid-items">
              <BillingDetails
                handleChange={handleChange}
                setInputData={setInputData}
                inputData={inputData}
              />
            </div>
            <div className="grid-items">
              <TotalBilling
                pay={pay}
                orderPlace={orderPlace}
                setInputData={setInputData}
                inputData={inputData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
