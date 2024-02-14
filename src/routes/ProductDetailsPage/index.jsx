import React from "react";
import Breadcrumbs from "../../components/breadcrumbs";
import Information from "./Information";
import ProductDetails from "./ProductDetails";
import "./ProductDetailsPage.scss";
import ProductImage from "./productImage";
import RelatedProduct from "./RelatedProduct";
export default function ProductDetailsPage() {
  return (
    <div>
      <div className="product-details-breadcumbs-alignment">
        <Breadcrumbs />
      </div>

      <div className="product-details-all-information-alignment">
        <div className="container-lg">
          <div className="grid">
            <div className="grid-items">
              <ProductImage />
            </div>
            <div className="grid-items">
              <ProductDetails />
            </div>
          </div>
        </div>
      </div>

      <Information />
      <RelatedProduct />
    </div>
  );
}
