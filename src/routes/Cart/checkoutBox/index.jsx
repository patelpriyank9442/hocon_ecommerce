import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./checkoutBox.scss";
export default function CheckoutBox() {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { apiCart } = useSelector((state) => state.apiCart);
  let finalTotal = 0;
  let subTotal = 0;
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = user?.email ? true : false;

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

  return (
    <div>
      <div className="checkout-box-all-content-details-alignment">
        <div className="card-total-header">
          <span>cart total</span>
        </div>
        <div className="child-main-box">
          <div className="two-content-alignment">
            <div className="text-style">
              <p>Total</p>
              <span>₹{subTotal}</span>
            </div>
            <div className="text-style">
              <p>Discount</p>
              <span>₹{subTotal - finalTotal}</span>
            </div>
            <div className="text-style">
              <p>
                {isLoggedIn ? apiCart?.products?.length : cart?.length} Items
              </p>
              <span>₹{finalTotal}</span>
            </div>
          </div>
          <div className="final-total">
            <p>Total</p>
            <span>₹{finalTotal}</span>
          </div>
          <div className="procceed-button">
            <button
              onClick={() => {
                if (
                  isLoggedIn
                    ? apiCart?.products?.length === 0
                    : cart?.length === 0
                ) {
                  toast("Please add some items to cart");
                } else {
                  navigate("/checkout");
                }
              }}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
