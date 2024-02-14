import moment from "moment/moment";
import React, { useState } from "react";
import ProductImage from "../../../assets/imges/product.jpg";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "./MyOrders.scss";
import { SingleOrder } from "../../../store/ApiSlice/singleOrderSlice";
import { useNavigate } from "react-router-dom";
export default function Order(props) {
  const { type } = props;
  const { orders } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      {orders?.filter((item) => item.status === type)?.length > 0 ? (
        orders
          ?.filter((item) => item.status === type)
          ?.map((row, i) => {
            return (
              <div
                key={i}
                className="body-content-alignment"
                onClick={() => {
                  dispatch(SingleOrder(row));
                  navigate("/order-details");
                }}
              >
                <div className="all-content-alignment">
                  <div className="left-content">
                    <div className="image-box">
                      <div className="image-style">
                        <Slider {...settings}>
                          {row.products.map((prod, i) => (
                            <img key={i} src={prod.productId.images[0].src} />
                          ))}
                        </Slider>{" "}
                      </div>
                      {/* <img src="https://hoconnfabric.com/wp-content/uploads/2022/09/HSC0001-2-450x450.jpg" /> */}
                    </div>
                    <div className="content">
                      <h6>{row?.orderNumber}</h6> <p>₹{row.total}</p>
                      {row?.couponUsed && (
                        <div className="coupon_used">
                          <div className="coupon_code">
                            {row?.couponUsed?.code}{" "}
                          </div>
                          Coupon used for{" "}
                          <div className="coupon_per">
                            {row?.couponUsed?.discountInPercentage + "% "}
                          </div>
                          discount.
                        </div>
                      )}
                      <h5>Products: {row?.products?.length}</h5>
                      <h5>
                        Payment Method:{" "}
                        {row?.paymentMethod === "cash_on_delivery" &&
                          "Cash on Delivery"}
                        {row?.paymentMethod === "direct_bank_transfer" &&
                          "Bank Transfer"}{" "}
                        {row?.paymentMethod === "online_payment" &&
                          "Online Payment"}{" "}
                      </h5>
                    </div>
                  </div>
                  <div className="right-content">
                    <p>Order Date: {moment(row?.createdAt).format("L")}</p>

                    <div className="status_item">
                      <div
                        className={
                          row.status === "placed"
                            ? "statBox box_primary"
                            : row.status === "shipped"
                            ? "statBox box_warning"
                            : row.status === "delivered"
                            ? "statBox box_success"
                            : row.status === "cancelled"
                            ? "statBox box_danger"
                            : row.status === "rejected"
                            ? "statBox box_danger"
                            : row.status === "return"
                            ? "statBox box_info"
                            : "statBox box_dark"
                        }
                      >
                        {row.status[0].toUpperCase() + row?.status?.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <div className="no_cats">
          No {type[0].toUpperCase() + type.slice(1)} Orders.
        </div>
      )}
    </div>
  );
}
