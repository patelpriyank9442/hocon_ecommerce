import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../store/ApiSlice/singleProduct";
import "./OrderTable.scss";
export default function OrderTable() {
  const { singleOrder } = useSelector((state) => state.singleOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <div className="order-table-all-content-alignment">
        <div className="container-lg">
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th align="left">Product</th>
                  <th align="right">Price</th>
                </tr>
              </thead>
              <tbody>
                {singleOrder.products.map((row, i) => {
                  return (
                    <tr key={i}>
                      <td
                        onClick={() => {
                          dispatch(Product(row.productId));
                          navigate("/product");
                        }}
                      >
                        <div className="card-grid">
                          <div className="card-grid-items">
                            <img src={row?.productId?.images[0]?.src} />
                          </div>
                          <div className="card-grid-items">
                            <span>Name : {row?.productId?.name}</span>
                            <span>
                              Description : {row?.productId?.description}
                            </span>
                            <span>
                              Category : {row?.productId?.categoryId?.name}
                            </span>
                            <span>Color : {row?.productId?.color}</span>
                            <span>Qty:{row?.quantity}</span>
                          </div>
                        </div>
                      </td>
                      <td align="right">
                        <h6>₹{row?.price}</h6>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="final-total-content-right-alignment">
            <div className="final-box">
              <div className="text-grid">
                <p>Subtotal:</p>
                <span>₹{singleOrder?.total}</span>
              </div>
              <div className="text-grid">
                <p>Shipping:</p>
                <span>₹0</span>
              </div>
              <div className="text-grid">
                <p>COD Charges:</p>
                <span>₹0</span>
              </div>
              <div className="text-grid">
                <p>Coupon Discount:</p>
                <span>₹{singleOrder?.discount}</span>
              </div>
              <div className="text-grid">
                <p>Total:</p>
                <span>₹{singleOrder?.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
