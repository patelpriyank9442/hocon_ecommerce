import React, { useEffect, useState } from "react";
import "./ProductDetails.scss";
import MiniIcon from "../../../assets/icons/mini.svg";
import PlusIcon from "../../../assets/icons/plus.svg";
import HeartIcon from "../../../assets/icons/black-heart.svg";
import HeartFilled from "../../../assets/icons/heartFilled.svg";
import { useDispatch, useSelector } from "react-redux";
import { cartItems } from "../../../store/ApiSlice/cartSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  addProductToCartApi,
  getCartApiProduct,
} from "../../../store/ApiSlice/cartApiSlice";
import {
  getFavourite,
  toggleFavourite,
} from "../../../store/ApiSlice/favouritesSlice";

export default function ProductDetails() {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { apiCart } = useSelector((state) => state.apiCart);
  const { singleProduct } = useSelector((state) => state.singleProduct);
  const { favourites } = useSelector((state) => state.favourites);
  let isFav;
  if (favourites?.length > 0) {
    isFav = favourites?.find((row) => {
      return row?.productId._id === singleProduct?._id ? true : false;
    });
  }

  useEffect(() => {
    document.title = "Hoconn : " + singleProduct?.name;
  }, []);

  const isLoggedIn = user?.email ? true : false;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQuantity] = useState(1);

  const increseQuantity = () => {
    setQuantity(qty + 1);
  };

  const descreseQuantity = () => {
    if (qty > 1) {
      setQuantity(qty - 1);
    }
  };

  const addToCart = () => {
    if (isLoggedIn) {
      let product = {
        productId: singleProduct._id,
        quantity: qty,
      };
      dispatch(addProductToCartApi(product)).then((data) => {
        dispatch(getCartApiProduct());
        toast.success("Product Added to Cart");
      });
    } else {
      let isInCart;
      if (cart?.length > 0) {
        isInCart = cart?.find((row) => {
          return row?._id === singleProduct?._id ? true : false;
        });
      }
      if (isInCart) {
        toast("Product Already Added to Cart");
        navigate("/cart");
      } else {
        const item = { ...singleProduct, qty: qty };
        const aditem = cart?.filter((row) => row._id !== item._id);
        const cartitm = [...aditem, item];
        dispatch(cartItems(cartitm));
        toast.success("Product Added to Cart");
      }
    }
  };

  return (
    <div>
      <div className="product-infomation-single">
        <div className="in-stock">
          <span>In Stock</span>
        </div>
        <h1>{singleProduct?.name}</h1>
        <div className="prize">
          <p>
            ₹{singleProduct?.offerPrice} <del> ₹{singleProduct?.price}</del>
          </p>
        </div>
        <div className="all-details-text">
          <span>Saree : Organza</span>
          <span>Blouse : Organza</span>
          <span>Work : Digital Print</span>
        </div>
        <div className="action-all-button-alignment">
          <div className="form-group">
            <button>
              <img
                src={MiniIcon}
                alt="MiniIcon"
                onClick={() => {
                  descreseQuantity();
                }}
              />
              <input
                type="number"
                value={qty}
                onChange={(e) =>
                  e.target.value.length < 3 && setQuantity(e.target.value)
                }
              />

              <img
                src={PlusIcon}
                alt="PlusIcon"
                onClick={() => {
                  increseQuantity();
                }}
              />
            </button>
          </div>
          <div className="add-to-cart">
            <button
              onClick={() => {
                addToCart();
              }}
            >
              ADD TO CART
            </button>
          </div>
          <div
            className="like-button"
            onClick={() => {
              if (isLoggedIn) {
                dispatch(toggleFavourite(singleProduct?._id)).then((res) => {
                  dispatch(getFavourite());
                  if (res.payload.payload.action === "remove") {
                    toast.success("Product Removed from wishlist.");
                  } else {
                    toast.success("Product Added to wishlist.");
                  }
                });
              } else {
                toast.error("Please Login to add to wishlist.");
              }
            }}
          >
            <img src={isFav ? HeartFilled : HeartIcon} alt="HeartIcon" />
          </div>
        </div>
        <div className="categories-text">
          <span>SKU: HSO0003</span>
          <span>Categories: Sarees</span>
        </div>
      </div>
    </div>
  );
}
