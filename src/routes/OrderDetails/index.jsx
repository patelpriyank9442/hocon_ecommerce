import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/breadcrumbs";
import Modal from "../../components/commonModal/Modal";
import "./OrderDetails.scss";
import OrderTable from "./OrderTable";
export default function OrderDetails() {
  const { singleOrder } = useSelector((state) => state.singleOrder);
  const [cancelModal, setCancelModal] = useState(false);
  return (
    <div>
      <div className="order-details-breadcumb-alignment">
        <Breadcrumbs />
      </div>
      <div className="order-details-all-content-alignment">
        <div className="container-lg">
          <div className="text-style">
            <h4>Order details</h4>
            <p>
              <span>Thank you.</span> Your order has been received.
            </p>
          </div>
          <div className="details-content-alignment">
            <div className="details">
              <p>ORDER NUMBER:</p>
              <span>{singleOrder.orderNumber}</span>
            </div>
            <div className="details">
              <p>ORDER STATUS:</p>
              <span>
                {singleOrder?.status[0]?.toUpperCase() +
                  singleOrder?.status?.slice(1)}{" "}
              </span>
            </div>
            <div className="details">
              <p>DATE:</p>
              <span>{moment(singleOrder?.createdAt).format("LL")}</span>
            </div>
            <div className="details">
              <p>TOTAL:</p>
              <span>₹{singleOrder?.total}</span>
            </div>
            <div className="details">
              <p>PAYMENT METHOD:</p>
              <span>
                {singleOrder?.paymentMethod === "cash_on_delivery" &&
                  "Cash on Delivery"}
                {singleOrder?.paymentMethod === "direct_bank_transfer" &&
                  "Bank Transfer"}
                {singleOrder?.paymentMethod === "online_payment" &&
                  "Online Payment"}{" "}
              </span>
            </div>
            {singleOrder?.couponUsed && (
              <div className="details">
                <p>APPLIED COUPON:</p>
                <span>{singleOrder?.couponUsed?.code}</span>
              </div>
            )}

            <div className="details">
              <p>CANCEL ORDER:</p>

              <button
                className={
                  singleOrder?.status === "placed"
                    ? "btn btn_cancel"
                    : "btn btn_disabled"
                }
                onClick={() => {
                  singleOrder?.status === "placed"
                    ? setCancelModal(true)
                    : toast("You can't cancel this order.");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <OrderTable />
      {cancelModal && <Modal setCancelModal={setCancelModal} />}
    </div>
  );
}
