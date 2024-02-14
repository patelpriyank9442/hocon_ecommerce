import React, { useEffect, useState } from "react";
import "./CartTable.scss";
import MiniIcon from "../../../assets/icons/mini.svg";
import PlusIcon from "../../../assets/icons/plus.svg";
import CloseIcon from "../../../assets/imges/close.svg";
import { useDispatch, useSelector } from "react-redux";
import { cartItems } from "../../../store/ApiSlice/cartSlice";
import { toast } from "react-hot-toast";
import { Product } from "../../../store/ApiSlice/singleProduct";
import { useNavigate } from "react-router-dom";
import {
  addProductToCartApi,
  deleteCartProduct,
  getCartApiProduct,
} from "../../../store/ApiSlice/cartApiSlice";

export default function CartTable() {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { apiCart } = useSelector((state) => state.apiCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = user.email ? true : false;

  useEffect(() => {
    dispatch(getCartApiProduct());
    document.title = "Hoconn : Cart";
  }, []);

  const removeFromCart = (product) => {
    if (isLoggedIn) {
      dispatch(deleteCartProduct(product?.productId?._id)).then((res) => {
        dispatch(getCartApiProduct());
      });
    } else {
      const removedItems = cart?.filter((row) => row._id !== product._id);
      dispatch(cartItems(removedItems));
      toast("Product removed from cart.");
    }
  };

  const increseQuantity = (row, i) => {
    if (isLoggedIn) {
      dispatch(
        addProductToCartApi({
          productId: row.productId._id,
          quantity: 1,
        })
      ).then((res) => {
        dispatch(getCartApiProduct());
      });
    } else {
      const data = cart?.map((data, index) => {
        if (index === i) {
          return { ...data, qty: row?.qty + 1 };
        }
        return data;
      });
      dispatch(cartItems(data));
    }
  };

  const descreseQuantity = (row, i) => {
    if (isLoggedIn) {
      dispatch(
        addProductToCartApi({
          productId: row.productId._id,
          quantity: -1,
        })
      ).then((res) => {
        dispatch(getCartApiProduct());
      });
    } else {
      if (row?.qty > 1) {
        const data = cart?.map((data, index) => {
          if (index === i) {
            return { ...data, qty: row?.qty - 1 };
          }
          return data;
        });
        dispatch(cartItems(data));
      }
    }
  };

  return (
    <div>
      <div className="cart-table-design-all-content-alignment">
        <table>
          <thead>
            <tr>
              <th align="left">Product</th>
              <th align="left">Price</th>
              <th align="left">Quantity</th>
              <th align="left">Subtotal</th>
            </tr>
          </thead>

          {isLoggedIn
            ? apiCart?.products?.length > 0 && (
                <tbody>
                  {apiCart?.products?.map((row, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <div className="all-content-alignment">
                            <div
                              className="image-box"
                              onClick={() => {
                                dispatch(Product(row.productId));
                                navigate("/product");
                              }}
                            >
                              <img src={row?.productId?.images[0]?.src} />
                            </div>
                            <div className="content">
                              <p>
                                <b>{row?.productId?.name}</b>
                              </p>
                              <p>{row?.productId?.description}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span>
                            ₹{row?.productId?.offerPrice}{" "}
                            <del>₹{row?.productId?.price}</del>
                          </span>
                        </td>
                        <td>
                          <div className="form-group">
                            <button>
                              <img
                                src={MiniIcon}
                                alt="MiniIcon"
                                onClick={() => {
                                  descreseQuantity(row, i);
                                }}
                              />
                              <span>{row?.quantity}</span>
                              <img
                                src={PlusIcon}
                                alt="PlusIcon"
                                onClick={() => {
                                  increseQuantity(row, i);
                                }}
                              />
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="icon-text-alignment">
                            <span>
                              ₹{row?.productId?.offerPrice * row?.quantity}
                            </span>
                            <img
                              src={CloseIcon}
                              alt="CloseIcon"
                              onClick={() => {
                                removeFromCart(row);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )
            : cart.length > 0 && (
                <tbody>
                  {cart.map((row, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <div className="all-content-alignment">
                            <div
                              className="image-box"
                              onClick={() => {
                                dispatch(Product(row));
                                navigate("/product");
                              }}
                            >
                              <img src={row?.images[0]?.src} />
                            </div>
                            <div className="content">
                              <p>
                                <b>{row?.name}</b>
                              </p>
                              <p>{row?.description}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span>
                            ₹{row?.offerPrice} <del>₹{row?.price}</del>
                          </span>
                        </td>
                        <td>
                          <div className="form-group">
                            <button>
                              <img
                                src={MiniIcon}
                                alt="MiniIcon"
                                onClick={() => {
                                  descreseQuantity(row, i);
                                }}
                              />
                              <span>{row?.qty}</span>
                              <img
                                src={PlusIcon}
                                alt="PlusIcon"
                                onClick={() => {
                                  increseQuantity(row, i);
                                }}
                              />
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="icon-text-alignment">
                            <span>₹{row?.offerPrice * row?.qty}</span>
                            <img
                              src={CloseIcon}
                              alt="CloseIcon"
                              onClick={() => {
                                removeFromCart(row);
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
        </table>
        {isLoggedIn
          ? apiCart?.products?.length === 0 && (
              <div className="no_prods">No products in cart.</div>
            )
          : cart?.length === 0 && (
              <div className="no_prods">No products in cart.</div>
            )}
      </div>
    </div>
  );
}
