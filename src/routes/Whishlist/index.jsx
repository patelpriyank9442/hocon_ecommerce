import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/breadcrumbs";
import ProductCard from "../../components/ProductCard";
import "./Whishlist.scss";
export default function Whishlist() {
  const { favourites } = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Hoconn : Wishlist";
  }, []);
  return (
    <div>
      <div className="whishlist-breadcrumbs-alignment">
        <Breadcrumbs />
      </div>
      <div className="whishlist-card-all-content-alignment">
        <div className="container-lg">
          <div className="flex">
            {favourites.length > 0 ? (
              favourites?.map((data, i) => {
                return (
                  <div className="flex-items" key={i}>
                    <ProductCard product={data.productId} />
                  </div>
                );
              })
            ) : (
              <div className="no_cats"> No products added to wishlist.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
