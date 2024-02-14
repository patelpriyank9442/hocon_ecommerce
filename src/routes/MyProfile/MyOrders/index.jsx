import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./MyOrders.scss";
import Order from "./orders";
export default function MyOrders() {
  const [orderType, setOrderType] = useState("placed");
  const types = [
    { type: "placed" },
    { type: "shipped" },
    { type: "delivered" },
    { type: "completed" },
    { type: "return" },
    { type: "cancelled" },
    { type: "rejected" },
  ];
  return (
    <div>
      <div className="my-orders-main-boxs">
        <div className="new-tab">
          {types.map((item, index) => {
            return (
              <span
                key={index}
                className={orderType === item.type ? "active" : ""}
                onClick={() => {
                  setOrderType(item.type);
                }}
              >
                {item.type[0].toUpperCase() + item.type?.slice(1)}
              </span>
            );
          })}
        </div>
        <Order type={orderType} />
      </div>
    </div>
  );
}
